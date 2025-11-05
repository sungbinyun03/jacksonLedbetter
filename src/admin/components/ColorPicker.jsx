export default function ColorPicker({ colors, onChange }) {
  const updateColor = (key, value) => {
    onChange({
      ...colors,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Primary Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={colors.primary}
            onChange={(e) => updateColor('primary', e.target.value)}
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.primary}
            onChange={(e) => updateColor('primary', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={colors.background}
            onChange={(e) => updateColor('background', e.target.value)}
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.background}
            onChange={(e) => updateColor('background', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Accent Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={colors.accent}
            onChange={(e) => updateColor('accent', e.target.value)}
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.accent}
            onChange={(e) => updateColor('accent', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="#666666"
          />
        </div>
      </div>
    </div>
  );
}

