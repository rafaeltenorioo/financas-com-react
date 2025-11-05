import TextField from "@mui/material/TextField";
import { UseModal } from "../Contexts/ModalContext";

export const MultilineTextFields = () => {
  const { nota, handleNota } = UseModal();

  const customColor = "var(--color-neutra-borda-clara)";
  return (
    <TextField
      id="outlined-textarea"
      label="Descrição (opcional)"
      placeholder="Adicione uma descrição..."
      multiline
      onChange={handleNota}
      value={nota}
      sx={{
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",

        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--color-texto-chumbo-suave),", // Cor da Label no foco
          fontWeight: "600",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: customColor, // Cor da Borda no foco
            borderWidth: "1px",
          },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: customColor, // Exemplo: Cor da borda em estado normal
        },
      }}
    />
  );
};
