import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SelectedCurrency from "../SelectedCurrency";

import { UseCurrency } from "../Contexts/CurrencyContext";
import { Box, Typography } from "@mui/material";

import { UseDialogCurrency } from "../Contexts/DialogCurrency";

export const DialogCurrencyComponent = () => {
  const { handleClose, handleSubmit, selectedCurrency, open } =
    UseDialogCurrency();
  const { exchangeRates, currentCurrency } = UseCurrency();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={{ "& .MuiDialog-paper": { borderRadius: "16px" } }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Escolha sua moeda
        </DialogTitle>
        <DialogContent sx={{ minHeight: "200px" }}>
          <form onSubmit={handleSubmit} id="currency-form" className="mt-2">
            <SelectedCurrency />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Typography sx={{ marginTop: "8px", textAlign: "center" }}>
                Taxas de Câmbio
              </Typography>
              {Object.keys(exchangeRates).map((code) => (
                <Box
                  key={code}
                  display="flex"
                  justifyContent="space-between"
                  sx={{ typography: "body2" }}
                >
                  <span>{code}:</span>
                  <span style={{ fontWeight: 600 }}>
                    {exchangeRates[code].toFixed(2)}
                  </span>
                </Box>
              ))}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ color: "var(--color-alerta-vermelho-escuro)" }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="currency-form"
            variant="contained"
            disabled={selectedCurrency === currentCurrency}
            sx={{ backgroundColor: "var(--color-primaria-verde-escuro)" }}
          >
            Confirmar Conversão
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
