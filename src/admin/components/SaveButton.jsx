import { useState, useEffect } from "react";

const DRAFT_STORAGE_KEY = 'cms-draft-config';

export default function SaveButton({ config, assetMap }) {
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);

  // Check for draft on mount
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
    setHasDraft(!!draft);
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ config, assetMap }));
    setHasDraft(true);
    setResult({
      success: true,
      message: 'Draft saved successfully!'
    });
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setHasDraft(false);
    setResult(null);
  };

  const handlePublish = async () => {
    setIsSaving(true);
    setResult(null);

    try {
      // Prepare images array for upload
      const images = [];
      for (const [filename, dataUrl] of Object.entries(assetMap)) {
        // Skip if it's already a file path (not a data URL)
        if (dataUrl.startsWith('data:')) {
          images.push({
            name: filename,
            base64data: dataUrl.split(',')[1] // Remove data:mime;base64, prefix
          });
        }
      }

      // Determine API base for local dev vs production
      const apiBase = import.meta.env.DEV
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:7071')
        : (import.meta.env.VITE_API_BASE || '');
      const endpoint = `${apiBase}/api/saveConfig`;
      console.log('[SaveButton] Publishing to endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          config,
          images
        })
      });

      if (!response.ok) {
        let message = `Failed to save (HTTP ${response.status})`;
        try {
          const errorJson = await response.json();
          message = errorJson.message || message;
        } catch (_) {
          const text = await response.text();
          if (text) message = `${message}: ${text}`;
        }
        throw new Error(message);
      }

      const data = await response.json();
      
      // Clear draft on successful publish
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setHasDraft(false);
      
      setResult({
        success: true,
        prUrl: data.prUrl,
        message: 'Success! Your changes have been published.'
      });
    } catch (error) {
      console.error('Save error:', error);
      setResult({
        success: false,
        message: error.message || 'An error occurred while saving'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      {hasDraft && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <div className="font-medium mb-1">⚠ Draft Saved</div>
          <div>You have unsaved changes. Publish to make them live.</div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSaveDraft}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save Draft
        </button>
        {hasDraft && (
          <button
            onClick={handleDiscardDraft}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Discard
          </button>
        )}
      </div>

      <button
        onClick={handlePublish}
        disabled={isSaving}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {isSaving ? 'Publishing...' : 'Publish Changes'}
      </button>

      {result && (
        <div className={`p-4 rounded-lg ${
          result.success 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="font-medium mb-1">
            {result.success ? '✓ Success' : '✗ Error'}
          </div>
          <div className="text-sm">{result.message}</div>
          {result.prUrl && (
            <a
              href={result.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline font-medium mt-2 inline-block"
            >
              View Pull Request
            </a>
          )}
        </div>
      )}
    </div>
  );
}

