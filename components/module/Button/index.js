export default function Button({
  name,
  top,
  bottom,
  width,
  handleClick,
  ...rest
}) {
  return (
    <button
      className="button__component"
      {...rest}
      onClick={handleClick}
      style={{ marginTop: top, marginBottom: bottom, width: width }}
    >
      {name}
    </button>
  );
}
