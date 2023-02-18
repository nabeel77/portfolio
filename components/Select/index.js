const Select = ({ themeOptions, onChange, defaultValue }) => {
  return (
    <select
      className="select select-primary mx-auto text-sm md:w-full md:max-w-xs"
      onChange={onChange}
      value={defaultValue}
    >
      <option value="default" disabled={defaultValue ? true : false}>
        Choose theme
      </option>
      {themeOptions.map((option, index) => {
        return (
          <option key={index} value={`${option.split(' ')[1].toLowerCase()}`}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
