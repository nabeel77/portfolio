import useInput from './useInput';

export const Input = (props) => {
  const { changeHandler } = useInput(props.id, props.onInput);
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={props.value}
        className={props.classNames}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={props.value}
        className={props.classNames}
        placeholder={props.placeholder}
      />
    );
  return <>{element}</>;
};
