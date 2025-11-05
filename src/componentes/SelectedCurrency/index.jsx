import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SUPPORTED_CURRENCIES } from "../Contexts/CurrencyContextDef";
import { UseDialogCurrency } from "../Contexts/DialogCurrency";

export default function SelectedCurrency() {
  const { handleChange, selectedCurrency } = UseDialogCurrency();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        sx={{
          borderColor: "var(--color-neutra-borda-clara)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--color-texto-chumbo-suave)", // Cor da Label no foco
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "var(--color-neutra-borda-clara)", // Cor da Borda no foco
              borderWidth: "1px",
            },
        }}
      >
        <InputLabel id="currency-select-label">Moeda</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={selectedCurrency}
          label="Moeda"
          onChange={(e) => handleChange(e)}
        >
          {SUPPORTED_CURRENCIES.map((moeda) => (
            <MenuItem key={moeda.code} value={moeda.code}>
              {moeda.name} ({moeda.code}) - {moeda.symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
