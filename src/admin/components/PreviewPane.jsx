import { useEffect, useRef, useState } from "react";

export default function PreviewPane({ siteUrl, config, assetMap }) {
  const iframeRef = useRef(null);
  const [isIframeReady, setIsIframeReady] = useState(false);

  // Debounce timer for updates (keeps latest config via effect deps)
  const updateTimerRef = useRef(null);

  // Send preview update to iframe
  const sendPreviewUpdate = (isInitial = false) => {
    if (!iframeRef.current) {
      console.log('[PreviewPane] Cannot send update: iframe ref not available');
      return;
    }

    if (!isIframeReady && !isInitial) {
      console.log('[PreviewPane] Skipping update: iframe not ready yet');
      return;
    }

    const message = {
      type: 'CONTENT_PREVIEW_UPDATE',
      payload: {
        config,
        assetMap
      }
    };

    try {
      // In development, allow all origins. In production, use siteUrl
      const targetOrigin = siteUrl === 'http://localhost:5173' ? '*' : siteUrl;
      
      const payloadSize = JSON.stringify(message).length;
      console.log(`[PreviewPane] ${isInitial ? 'Sending initial' : 'Sending'} preview update (${payloadSize} bytes)`, {
        hasConfig: !!config,
        hasAssetMap: !!assetMap && Object.keys(assetMap).length > 0,
        targetOrigin
      });
      
      iframeRef.current.contentWindow.postMessage(message, targetOrigin);
      
      if (isInitial) {
        console.log('[PreviewPane] Initial config sent successfully');
      }
    } catch (err) {
      console.error('[PreviewPane] Error sending preview update:', err);
    }
  };

  // Listen for PREVIEW_READY handshake from iframe
  useEffect(() => {
    const handlePreviewReady = (event) => {
      if (!iframeRef.current) return;
      const fromIframe = event.source === iframeRef.current.contentWindow;
      if (fromIframe && event.data?.type === 'PREVIEW_READY') {
        console.log('[PreviewPane] Received PREVIEW_READY from iframe');
        setIsIframeReady(true);
        // Send initial config right away
        setTimeout(() => {
          console.log('[PreviewPane] Sending initial config to iframe after PREVIEW_READY');
          sendPreviewUpdate(true);
        }, 200);
      }
    };

    window.addEventListener('message', handlePreviewReady);
    return () => window.removeEventListener('message', handlePreviewReady);
  }, []);

  // Debounced update via effect to always use latest config/assetMap
  useEffect(() => {
    if (!isIframeReady) return;
    if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
    updateTimerRef.current = setTimeout(() => {
      sendPreviewUpdate(false);
    }, 250);
    return () => {
      if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
    };
  }, [config, assetMap, isIframeReady]);

  // Handle iframe load
  const handleIframeLoad = () => {
    console.log('[PreviewPane] Iframe loaded successfully');
    setIsIframeReady(true);
    
    // Send initial config immediately after iframe loads
    // Use a small delay to ensure React has mounted inside iframe
    setTimeout(() => {
      console.log('[PreviewPane] Sending initial config to iframe');
      sendPreviewUpdate(true);
    }, 500);
  };

  // Handle iframe error
  const handleIframeError = () => {
    console.error('[PreviewPane] Error loading iframe');
    setIsIframeReady(false);
  };

  // Log when config/assetMap change while not ready
  useEffect(() => {
    if (!isIframeReady) {
      console.log('[PreviewPane] Config/assetMap changed but iframe not ready, update will be sent when ready');
    }
  }, [config, assetMap, isIframeReady]);

  const previewUrl = `${siteUrl}?preview=1`;
  console.log('[PreviewPane] Preview URL:', previewUrl);

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <p className="text-sm text-gray-600">
          {isIframeReady ? 'Connected' : 'Loading...'}
        </p>
      </div>
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={previewUrl}
          className="w-full h-full border-0"
          title="Site Preview"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
}

