import { useState } from "react";
import TextEditor from "./TextEditor";
import ImageUploader from "./ImageUploader";

export default function StudioEditor({ studio, onChange, onAssetMapUpdate }) {
  const [newService, setNewService] = useState('');

  const updateField = (field, value) => {
    onChange({
      ...studio,
      [field]: value
    });
  };

  const addService = () => {
    if (newService.trim()) {
      updateField('services', [...(studio.services || []), newService.trim()]);
      setNewService('');
    }
  };

  const removeService = (index) => {
    const updated = studio.services.filter((_, i) => i !== index);
    updateField('services', updated);
  };

  const addGalleryImage = () => {
    const filename = `image-${Date.now()}.jpg`;
    updateField('galleryImages', [...(studio.galleryImages || []), filename]);
  };

  const removeGalleryImage = (index) => {
    const updated = studio.galleryImages.filter((_, i) => i !== index);
    updateField('galleryImages', updated);
  };

  const alignmentOptions = ['left', 'center', 'right'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Text Alignment
        </label>
        <select
          value={studio.textAlign || 'left'}
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

      {/* Services List */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Services
        </label>
        <div className="space-y-2 mb-3">
          {studio.services?.map((service, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm">
                {service}
              </span>
              <button
                onClick={() => removeService(idx)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addService()}
            placeholder="Add new service"
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={addService}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Gallery Images */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Gallery Images
        </label>
        <div className="space-y-3 mb-3">
          {studio.galleryImages?.map((img, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-2">
                <TextEditor
                  value={img}
                  onChange={(value) => {
                    const updated = [...studio.galleryImages];
                    updated[idx] = value;
                    updateField('galleryImages', updated);
                  }}
                  className="flex-1"
                />
                <button
                  onClick={() => removeGalleryImage(idx)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  ×
                </button>
              </div>
              <ImageUploader
                filename={img}
                currentImage={img}
                onImageSelect={(filename, file) => {
                  const updated = [...studio.galleryImages];
                  updated[idx] = filename;
                  updateField('galleryImages', updated);
                }}
                onAssetMapUpdate={onAssetMapUpdate}
              />
            </div>
          ))}
        </div>
        <button
          onClick={addGalleryImage}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600"
        >
          + Add Image
        </button>
      </div>
    </div>
  );
}

