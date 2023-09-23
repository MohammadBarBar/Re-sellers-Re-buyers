import React from "react";

function MyInput({
  name,
  placeholder,
  type,
  label,
  value,
  onChange,
  disabledFlag,
}) {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label-name">
        {label}
      </label>
      <input
        type={type}
        className="form-label-input"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(evt) => onChange(evt)}
        disabled={disabledFlag === true ? true : false}
      />
    </div>
  );
}

export default MyInput;
