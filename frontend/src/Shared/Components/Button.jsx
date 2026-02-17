function Button({ children, onClick, variant = "primary" }) {
  return (
    <button onClick={onClick} className={`btn ${variant}`}>
      {children}
    </button>
  );
}

export default Button;
