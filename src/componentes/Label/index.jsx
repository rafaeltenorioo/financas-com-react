export const Label = ({ htmlFor, nome }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="font-semibold text-base text-texto-chumbo"
    >
      {nome}:
    </label>
  );
};
