export default function Button({ name, top, bottom, handleClick }) {
  return (
    <button
      className="button__component"
      onClick={handleClick}
      style={{ marginTop: top, marginBottom: bottom }}
    >
      {name}
    </button>
  );
}
