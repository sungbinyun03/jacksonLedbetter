export default function TextEditor({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  className = ""
}) {
  const Component = multiline ? 'textarea' : 'input';
  
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Component
        type={multiline ? undefined : "text"}
        rows={multiline ? rows : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

