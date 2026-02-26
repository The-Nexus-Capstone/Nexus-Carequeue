function Select({ label, children }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <select>
        {children}
      </select>
    </div>
  );
}

export default Select;
