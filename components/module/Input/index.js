/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export default function Input({
  name,
  type,
  placeholder,
  image,
  handleChange,
  isPassword,
  top,
  bottom,
}) {
  return (
    <div
      className="input__wrap"
      style={{ marginTop: top, marginBottom: bottom }}
    >
      <img src={image} alt="icon" className="input__icon" />
      <input
        className="input__item nunito-400"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {isPassword ? (
        <>
          <img
            src="../assets/images/auth/eye-crossed.png"
            className="input__icon--password"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
