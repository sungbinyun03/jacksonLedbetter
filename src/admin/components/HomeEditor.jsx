import { useState } from "react";
import TextEditor from "./TextEditor";
import ImageUploader from "./ImageUploader";

export default function HomeEditor({ home, onChange, onAssetMapUpdate }) {
  const updateField = (field, value) => {
    onChange({
      ...home,
      [field]: value
    });
  };

  const alignmentOptions = ['left', 'center', 'right'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Text Alignment
        </label>
        <select
          value={home.textAlign || 'center'}
          onChange={(e) => updateField('textAlign', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          {alignmentOptions.map(align => (
            <option key={align} value={align}>
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <TextEditor
        label="Hero Image"
        value={home.heroImage || ''}
        onChange={(value) => updateField('heroImage', value)}
      />

      <div className="pt-2">
        <ImageUploader
          filename={home.heroImage}
          currentImage={home.heroImage}
          onImageSelect={(filename, file) => {
            updateField('heroImage', filename);
          }}
          onAssetMapUpdate={onAssetMapUpdate}
        />
      </div>

      <TextEditor
        label="Title"
        value={home.title || ''}
        onChange={(value) => updateField('title', value)}
      />

      <TextEditor
        label="Subtitle"
        value={home.subtitle || ''}
        onChange={(value) => updateField('subtitle', value)}
        multiline
        rows={4}
      />
    </div>
  );
}

