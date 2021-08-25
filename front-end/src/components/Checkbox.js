import React from "react";

export default function Checkbox(props) {
  const { label } = props;
  return (
    <div>
      <input {...props} type="checkbox" name="checkbox" />
      <label for="checkbox">{label}</label>
    </div>
  );
}
