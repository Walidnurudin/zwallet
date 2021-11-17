export default function Button({ name, top, bottom, width, handleClick }) {
  return (
    <button
      className="button__component"
      onClick={handleClick}
      style={{ marginTop: top, marginBottom: bottom, width: width }}
    >
      {name}
    </button>
  );
}
