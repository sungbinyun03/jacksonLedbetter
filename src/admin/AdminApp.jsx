import { useState, useEffect } from "react";
import EditorPanel from "./components/EditorPanel";
import PreviewPane from "./components/PreviewPane";

const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
console.log('[AdminApp] Initializing with SITE_URL:', SITE_URL);

export default function AdminApp() {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assetMap, setAssetMap] = useState({});

  // Load initial config
  useEffect(() => {
    const loadConfig = async () => {
      try {
        console.log('[AdminApp] Loading initial config from /content/config.json');
        const response = await fetch('/content/config.json', {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('[AdminApp] Config loaded successfully', {
          hasStylePreset: !!data.stylePreset,
          hasHome: !!data.home,
          hasStudio: !!data.studio,
          hasAbout: !!data.about,
          hasGear: !!data.gear,
          configKeys: Object.keys(data)
        });
        
        setConfig(data);
        setIsLoading(false);
        console.log('[AdminApp] Config state updated, loading complete');
      } catch (err) {
        console.error('[AdminApp] Error loading config:', err);
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Handle config changes from editor
  const handleConfigChange = (newConfig) => {
    console.log('[AdminApp] Config changed from editor', {
      stylePreset: newConfig?.stylePreset,
      hasHome: !!newConfig?.home,
      hasStudio: !!newConfig?.studio,
      hasAbout: !!newConfig?.about,
      hasGear: !!newConfig?.gear
    });
    setConfig(newConfig);
  };

  // Handle asset map changes (for new uploaded images)
  const handleAssetMapChange = (newAssetMap) => {
    const assetCount = Object.keys(newAssetMap).length;
    console.log(`[AdminApp] Asset map changed (${assetCount} assets)`, {
      assetNames: Object.keys(newAssetMap)
    });
    setAssetMap(newAssetMap);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading admin...</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Error loading configuration</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Left: Editor Panel */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h1 className="text-xl font-bold">CMS Admin</h1>
          <p className="text-sm text-gray-600 mt-1">Edit site content</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <EditorPanel
            config={config}
            onConfigChange={handleConfigChange}
            onAssetMapChange={handleAssetMapChange}
          />
        </div>
      </div>

      {/* Right: Preview Pane */}
      <div className="flex-1 overflow-hidden h-full">
        <PreviewPane
          siteUrl={SITE_URL}
          config={config}
          assetMap={assetMap}
        />
      </div>
    </div>
  );
}

