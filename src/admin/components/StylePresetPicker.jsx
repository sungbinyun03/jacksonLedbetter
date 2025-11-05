import { PRESETS } from "../../styles/presets";

export default function StylePresetPicker({ value, onChange }) {
  return (
    <div className="space-y-2">
      {Object.entries(PRESETS).map(([key, preset]) => (
        <label
          key={key}
          className="flex items-start p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
          <input
            type="radio"
            name="preset"
            value={key}
            checked={value === key}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 mr-3"
          />
          <div className="flex-1">
            <div className="font-medium text-sm capitalize">{key}</div>
            <div className="text-xs text-gray-500">{preset.description}</div>
          </div>
        </label>
      ))}
    </div>
  );
}

