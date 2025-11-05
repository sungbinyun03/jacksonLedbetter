import { useState } from "react";

export default function ImageUploader({ 
  filename, 
  currentImage, 
  onImageSelect,
  onAssetMapUpdate 
}) {
  const [preview, setPreview] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to data URL for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setPreview(dataUrl);
      
      // Notify parent with the data URL for assetMap
      if (onAssetMapUpdate) {
        onAssetMapUpdate(filename, dataUrl);
      }
      
      // Also pass the file for upload
      if (onImageSelect) {
        onImageSelect(filename, file);
      }
    };
    reader.readAsDataURL(file);
  };

  const displayImage = preview || (currentImage ? `/assets/${currentImage}` : null);

  return (
    <div>
      {displayImage && (
        <div className="mb-3">
          <img
            src={displayImage}
            alt="Preview"
            className="w-full h-32 object-cover rounded border border-gray-300"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />
      {filename && (
        <p className="mt-1 text-xs text-gray-500">
          Will save as: {filename}
        </p>
      )}
    </div>
  );
}

