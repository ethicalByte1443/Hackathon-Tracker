export function Badge({ className = '', children }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full text-white ${className}`}
    >
      {children}
    </span>
  );
}