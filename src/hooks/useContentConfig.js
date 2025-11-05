import { useState, useEffect, useCallback } from 'react';

// Shared singleton state so all hook instances stay in sync (iframe preview needs this)
const __globalContentState = {
  config: null,
  assetMap: {},
  isPreview: false,
  isLoaded: false
};
const __contentSubscribers = new Set();

function broadcastContentState() {
  for (const notify of __contentSubscribers) {
    try {
      notify({
        config: __globalContentState.config,
        assetMap: __globalContentState.assetMap,
        isPreview: __globalContentState.isPreview
      });
    } catch (e) {
      // no-op
    }
  }
}

/**
 * Hook for loading and managing content configuration
 * Supports preview mode via postMessage for live editing
 */
export function useContentConfig() {
  const [config, setConfig] = useState(null);
  const [assetMap, setAssetMap] = useState({});
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subscribe this hook instance to shared updates
  useEffect(() => {
    const unsubscribe = __subscribeContentConfig({ setConfig, setAssetMap, setIsPreview });
    return unsubscribe;
  }, []);

  // Load initial config from JSON file
  useEffect(() => {
    const loadConfig = async () => {
      try {
        console.log('[useContentConfig] Loading config from /content/config.json');
        const response = await fetch('/content/config.json', {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });

        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.status}`);
        }

        const data = await response.json();
        console.log('[useContentConfig] Config loaded successfully', {
          hasStylePreset: !!data.stylePreset,
          hasHome: !!data.home,
          hasStudio: !!data.studio,
          hasAbout: !!data.about,
          hasGear: !!data.gear
        });
        setConfig(data);
        __globalContentState.config = data;
        
        // Check if in preview mode (query param)
        const urlParams = new URLSearchParams(window.location.search);
        const previewQuery = urlParams.get('preview') === '1';
        const previewMode = previewQuery || window.__PREVIEW_MODE === true;
        setIsPreview(previewMode);
        __globalContentState.isPreview = previewMode;
        if (previewMode) window.__PREVIEW_MODE = true; // persist across SPA navigations
        
        if (previewMode) {
          console.log('[useContentConfig] Preview mode detected (query param preview=1)');
        } else {
          console.log('[useContentConfig] Normal mode (no preview param)');
        }
        
        setIsLoading(false);
        __globalContentState.isLoaded = true;
        broadcastContentState();
      } catch (err) {
        console.error('[useContentConfig] Error loading config:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Listen for preview updates from admin iframe
  useEffect(() => {
    if (!isPreview) {
      console.log('[useContentConfig] Preview mode not active, skipping message listener setup');
      return;
    }

    console.log('[useContentConfig] Setting up message listener for preview updates');
    
    const handleMessage = (event) => {
      console.log('[useContentConfig] Message received', {
        origin: event.origin,
        type: event.data?.type,
        hasPayload: !!event.data?.payload
      });

      // In production, validate origin here
      // For now, allow all origins in development
      // if (event.origin !== process.env.REACT_APP_ADMIN_ORIGIN) return;

      if (event.data.type === 'CONTENT_PREVIEW_UPDATE') {
        console.log('[useContentConfig] Preview update message received');
        const { config: previewConfig, assetMap: previewAssetMap } = event.data.payload;
        
        if (previewConfig) {
          console.log('[useContentConfig] Updating config from preview', {
            stylePreset: previewConfig.stylePreset,
            hasHome: !!previewConfig.home,
            hasStudio: !!previewConfig.studio,
            hasAbout: !!previewConfig.about,
            hasGear: !!previewConfig.gear
          });
          __globalContentState.config = previewConfig;
          setConfig(previewConfig);
        }
        
        if (previewAssetMap) {
          const assetCount = Object.keys(previewAssetMap).length;
          console.log(`[useContentConfig] Updating assetMap from preview (${assetCount} assets)`);
          __globalContentState.assetMap = previewAssetMap;
          setAssetMap(previewAssetMap);
        }

        console.log('[useContentConfig] Preview update processed successfully');
        broadcastContentState();
      } else {
        console.log('[useContentConfig] Ignoring message (not a preview update)', event.data.type);
      }
    };

    window.addEventListener('message', handleMessage);
    console.log('[useContentConfig] Message listener registered');
    
    return () => {
      console.log('[useContentConfig] Cleaning up message listener');
      window.removeEventListener('message', handleMessage);
    };
  }, [isPreview]);

  // Handshake: notify parent window that preview is ready (when running inside iframe)
  useEffect(() => {
    if (isPreview) {
      try {
        if (window.parent && window.parent !== window) {
          console.log('[useContentConfig] Notifying parent: PREVIEW_READY');
          window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
        } else {
          console.log('[useContentConfig] Not in iframe; skipping PREVIEW_READY message');
        }
      } catch (e) {
        console.error('[useContentConfig] Error posting PREVIEW_READY to parent:', e);
      }
    }
  }, [isPreview]);

  // Resolve asset path - returns data URL if in preview, otherwise file path
  const resolveAsset = useCallback((filename) => {
    if (!filename) return '';
    
    // Check if we have a preview data URL for this asset
    if (assetMap[filename]) {
      return assetMap[filename];
    }
    
    // Otherwise return the normal path
    return `/assets/${filename}`;
  }, [assetMap]);

  return {
    config,
    resolveAsset,
    isPreview,
    isLoading,
    error
  };
}

// Ensure new hook instances subscribe to global updates and initialize from global
export function __subscribeContentConfig(setters) {
  const notify = (state) => {
    if (state.config !== undefined) setters.setConfig(state.config);
    if (state.assetMap !== undefined) setters.setAssetMap(state.assetMap);
    if (state.isPreview !== undefined) setters.setIsPreview(state.isPreview);
  };
  __contentSubscribers.add(notify);
  // Initialize immediately if already loaded
  if (__globalContentState.isLoaded) {
    notify(__globalContentState);
  }
  return () => __contentSubscribers.delete(notify);
}

