function Button({ children, onClick, variant = "primary", className = "" }) {
  return (
    <button 
      onClick={onClick} 
      className={`btn ${variant} ${className}`} // Added className here
    >
      {children}
    </button>
  );
}

export default Button;