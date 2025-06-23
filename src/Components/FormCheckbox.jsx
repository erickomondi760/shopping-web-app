const FormCheckbox = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control flex flex-col items-center">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        defaultChecked={defaultValue}
        id="name"
        name={name}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
};
export default FormCheckbox;
