// components/Shared/CustomSelect.js
import { lazy, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ErrorMessagePath } from "./formik/errorMessage";

const CustomSelect = ({
  options = [],
  defaultLabel = "Select",
  defaultValue = "",
  disabled, // <-- NEW
  value = "",
  onChange,
  name = "",
  formik = null,
  className = "",
  defaultDisabled = true,
}) => {
  const isUsingFormik = formik && name;

  // Track internal state if not using Formik
  const [internalValue, setInternalValue] = useState(
    value || defaultValue || ""
  );

  useEffect(() => {
    // Update internal value if defaultValue changes
    if (!isUsingFormik && defaultValue) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  const selectedValue = isUsingFormik ? formik.values[name] : internalValue;

  const handleChange = (e) => {
    const selected = e.target.value;
    if (isUsingFormik) {
      formik.setFieldValue(name, selected);
    } else {
      setInternalValue(selected);
      if (onChange) {
        onChange(selected);
      }
    }
  };

  return (
    <>
      <Form.Select
        name={name}
        value={selectedValue}
        disabled={disabled} // <-- Use the disabled prop
        onChange={handleChange}
        className={`${selectedValue ? "selected" : ""} ${className}`}
        isInvalid={isUsingFormik && formik.touched[name] && formik.errors[name]}
      >
        {defaultLabel && (
          <option disabled={defaultDisabled} value="">
            {defaultLabel}
          </option>
        )}

        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default CustomSelect;
