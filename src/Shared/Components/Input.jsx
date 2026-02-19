function Input({ label, type = "text", placeholder }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input type={type} placeholder={placeholder} />
    </div>
  );
}

export default Input;
