export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl shadow-lg p-4 bg-gray-800 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = '', children }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}