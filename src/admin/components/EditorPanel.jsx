import { useState, useEffect } from "react";
import StylePresetPicker from "./StylePresetPicker";
import ColorPicker from "./ColorPicker";
import HomeEditor from "./HomeEditor";
import StudioEditor from "./StudioEditor";
import AboutEditor from "./AboutEditor";
import GearEditor from "./GearEditor";
import SaveButton from "./SaveButton";

const DRAFT_STORAGE_KEY = 'cms-draft-config';

export default function EditorPanel({ config, onConfigChange, onAssetMapChange }) {
  const [assetMap, setAssetMap] = useState({});

  // Load draft on mount if exists
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        if (parsedDraft.config) {
          onConfigChange(parsedDraft.config);
        }
        if (parsedDraft.assetMap) {
          setAssetMap(parsedDraft.assetMap);
          onAssetMapChange(parsedDraft.assetMap);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to update config
  const updateConfig = (path, value) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onConfigChange(newConfig);
  };

  // Helper to handle asset map updates
  const handleAssetMapUpdate = (filename, dataUrl) => {
    const newMap = { ...assetMap };
    if (dataUrl) {
      newMap[filename] = dataUrl;
    } else {
      delete newMap[filename];
    }
    setAssetMap(newMap);
    onAssetMapChange(newMap);
  };

  return (
    <div className="divide-y divide-gray-200">
      {/* Style Preset */}
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Style Preset</h2>
        <StylePresetPicker
          value={config.stylePreset}
          onChange={(value) => updateConfig('stylePreset', value)}
        />
      </div>

      {/* Colors */}
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Colors</h2>
        <ColorPicker
          colors={config.colors}
          onChange={(colors) => updateConfig('colors', colors)}
        />
      </div>

      {/* Home Section */}
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Home Page</h2>
        <HomeEditor
          home={config.home}
          onChange={(home) => updateConfig('home', home)}
          onAssetMapUpdate={handleAssetMapUpdate}
        />
      </div>

      {/* Studio Section */}
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Studio Page</h2>
        <StudioEditor
          studio={config.studio}
          onChange={(studio) => updateConfig('studio', studio)}
          onAssetMapUpdate={handleAssetMapUpdate}
        />
      </div>

      {/* About Section */}
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">About Page</h2>
        <AboutEditor
          about={config.about}
          onChange={(about) => updateConfig('about', about)}
          onAssetMapUpdate={handleAssetMapUpdate}
        />
      </div>

      {/* Gear Section */}
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Studio 34 Gear</h2>
        <GearEditor
          gear={config.gear}
          onChange={(gear) => updateConfig('gear', gear)}
        />
      </div>

      {/* Save Button */}
      <div className="p-6">
        <SaveButton config={config} assetMap={assetMap} />
      </div>
    </div>
  );
}

