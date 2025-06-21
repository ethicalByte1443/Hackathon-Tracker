export function Button({ className = '', children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
