export function Progress({ value = 0, className = '' }) {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-indigo-500 h-full rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}