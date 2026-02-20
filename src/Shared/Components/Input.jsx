function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  id,
  name
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || ""}   // connects to React state
        onChange={onChange}   // tells React when user types
      />
    </div>
  );
}

export default Input;