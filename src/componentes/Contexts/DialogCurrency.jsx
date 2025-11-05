import { useContext, useState } from "react";
import { DialogCurrencyContext } from "./DialogCurrencyDef";
import { UseCurrency } from "./CurrencyContext";

export const DialogCurrencyProvider = ({ children }) => {
  const { currentCurrency, setCurrentCurrency } = UseCurrency();

  const [open, setOpen] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrency);

  const handleChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleClickOpen = () => {
    // Ao abrir, garante que o select local reflita a moeda global atual
    setSelectedCurrency(currentCurrency);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Atualiza o estado global com a moeda selecionada
    setCurrentCurrency(selectedCurrency);
    handleClose();
  };

  const value = {
    open,
    handleChange,
    handleClickOpen,
    handleSubmit,
    handleClose,
    selectedCurrency,
  };
  return (
    <DialogCurrencyContext.Provider value={value}>
      {children}
    </DialogCurrencyContext.Provider>
  );
};

export const UseDialogCurrency = () => {
  const context = useContext(DialogCurrencyContext);

  if (context === undefined) {
    throw new Error(
      "UseDialogCurrency deve ser usado dentro de um DialogCurrencyProvider"
    );
  }
  return context;
};
