import { useState } from "react";
import TextEditor from "./TextEditor";

export default function GearEditor({ gear, onChange }) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [draftItemsText, setDraftItemsText] = useState({});

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const updateCategory = (categoryName, items) => {
    const updated = { ...gear };
    updated[categoryName] = items;
    onChange(updated);
  };

  const addCategory = () => {
    if (newCategoryName.trim() && !gear[newCategoryName.trim()]) {
      updateCategory(newCategoryName.trim(), []);
      setNewCategoryName('');
    }
  };

  const removeCategory = (categoryName) => {
    const updated = { ...gear };
    delete updated[categoryName];
    onChange(updated);
  };

  const itemsToString = (items) => (items || []).join(', ');

  const stringToItems = (value) =>
    (value || '')
      .split(/,|\n/g)
      .map(s => s.trim())
      .filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Gear Categories
        </label>
        <div className="space-y-2 mb-3">
          {Object.entries(gear || {}).map(([catName, items]) => (
            <div key={catName} className="border border-gray-200 rounded">
              {/* Category Header */}
              <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
                <button
                  onClick={() => toggleCategory(catName)}
                  className="flex-1 text-left font-medium text-sm text-gray-700 hover:text-gray-900"
                >
                  {expandedCategories[catName] ? '▼' : '▶'} {catName}
                </button>
                <button
                  onClick={() => removeCategory(catName)}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  ×
                </button>
              </div>

              {/* Items List */}
              {expandedCategories[catName] && (
                <div className="p-3 space-y-2">
                  {(() => {
                    const draft = draftItemsText[catName] ?? itemsToString(items);
                    return (
                      <TextEditor
                        label="Items (comma-separated)"
                        multiline
                        rows={4}
                        value={draft}
                        onChange={(value) =>
                          setDraftItemsText((prev) => ({ ...prev, [catName]: value }))
                        }
                        onBlur={(value) => {
                          updateCategory(catName, stringToItems(value));
                          setDraftItemsText((prev) => ({ ...prev, [catName]: itemsToString(stringToItems(value)) }));
                        }}
                      />
                    );
                  })()}
                  <div className="text-xs text-gray-500">
                    Separate items with commas. Order is preserved.
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Category */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            placeholder="New category name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

