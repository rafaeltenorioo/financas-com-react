import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "../Input";
import { Selected } from "../Selected";
import { Calendar } from "../Calendar";
import { MultilineTextFields } from "../Nota";
import { UseModal } from "../Contexts/ModalContext";

export default function FormDialog() {
  const { open, handleClose, handleSubmit, gastoEmEdicao } = UseModal();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiDialog-paper": { borderRadius: "16px" } }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: "600",
          padding: "24px 24px 8px 24px",
          color: "var(--color-texto-chumbo)",
        }}
      >
        {gastoEmEdicao ? "Editar Gasto" : "Adicione as informações"}
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "16px 24px",
          overflowY: "auto", // permite scroll si el contenido es largo
        }}
      >
        <form
          onSubmit={handleSubmit}
          id="subscription-form"
          className="flex flex-col gap-4"
        >
          <Selected />
          <MultilineTextFields />
          <Input />
          <Calendar />
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "16px 24px",
          justifyContent: "flex-end", // Botones a la derecha.
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "var(--color-alerta-vermelho-escuro)",
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="subscription-form"
          sx={{
            backgroundColor: "var(--color-primaria-verde-escuro)",
          }}
        >
          Salvar Gasto
        </Button>
      </DialogActions>
    </Dialog>
  );
}
