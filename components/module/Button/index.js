export default function Button({
  name,
  top,
  bottom,
  width,
  handleClick,
  color,
  ...rest
}) {
  return (
    <button
      className="button__component"
      {...rest}
      onClick={handleClick}
      style={{
        marginTop: top,
        marginBottom: bottom,
        width: width,
        background: color,
      }}
    >
      {name}
    </button>
  );
}
