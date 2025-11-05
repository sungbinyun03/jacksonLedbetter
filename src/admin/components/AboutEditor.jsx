import { useState } from "react";
import TextEditor from "./TextEditor";
import ImageUploader from "./ImageUploader";

export default function AboutEditor({ about, onChange, onAssetMapUpdate }) {
  const [newParagraph, setNewParagraph] = useState('');

  const updateField = (field, value) => {
    onChange({
      ...about,
      [field]: value
    });
  };

  const addParagraph = () => {
    if (newParagraph.trim()) {
      updateField('paragraphs', [...(about.paragraphs || []), newParagraph.trim()]);
      setNewParagraph('');
    }
  };

  const removeParagraph = (index) => {
    const updated = about.paragraphs.filter((_, i) => i !== index);
    updateField('paragraphs', updated);
  };

  const updateParagraph = (index, value) => {
    const updated = [...about.paragraphs];
    updated[index] = value;
    updateField('paragraphs', updated);
  };

  const addImage = () => {
    const filename = `image-${Date.now()}.jpg`;
    updateField('images', [...(about.images || []), filename]);
  };

  const removeImage = (index) => {
    const updated = about.images.filter((_, i) => i !== index);
    updateField('images', updated);
  };

  const alignmentOptions = ['left', 'center', 'right'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Text Alignment
        </label>
        <select
          value={about.textAlign || 'left'}
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

      {/* Paragraphs */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Paragraphs
        </label>
        <div className="space-y-2 mb-3">
          {about.paragraphs?.map((para, idx) => (
            <div key={idx} className="space-y-2">
              <TextEditor
                value={para}
                onChange={(value) => updateParagraph(idx, value)}
                multiline
                rows={3}
              />
              <button
                onClick={() => removeParagraph(idx)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <TextEditor
            value={newParagraph}
            onChange={setNewParagraph}
            multiline
            rows={3}
            className="mb-2"
          />
          <button
            onClick={addParagraph}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Add Paragraph
          </button>
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Images
        </label>
        <div className="space-y-3 mb-3">
          {about.images?.map((img, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-2">
                <TextEditor
                  value={img}
                  onChange={(value) => {
                    const updated = [...about.images];
                    updated[idx] = value;
                    updateField('images', updated);
                  }}
                  className="flex-1"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  ×
                </button>
              </div>
              <ImageUploader
                filename={img}
                currentImage={img}
                onImageSelect={(filename, file) => {
                  const updated = [...about.images];
                  updated[idx] = filename;
                  updateField('images', updated);
                }}
                onAssetMapUpdate={onAssetMapUpdate}
              />
            </div>
          ))}
        </div>
        <button
          onClick={addImage}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600"
        >
          + Add Image
        </button>
      </div>
    </div>
  );
}

