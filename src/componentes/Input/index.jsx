import { useMemo } from "react";
import { UseCurrency } from "../Contexts/CurrencyContext";
import { UseModal } from "../Contexts/ModalContext";
import { ContainerInput } from "../ContainerInput";
import { Label } from "../Label";
import { UseDialogCurrency } from "../Contexts/DialogCurrency";
import { IconArrowRigth } from "../icons";

export const Input = () => {
  const { valor, handleValueInput } = UseModal();
  const { handleClickOpen } = UseDialogCurrency();

  const { currentCurrency, convertValueToTarget, convertValueToBase } =
    UseCurrency();

  const displayedValue = useMemo(() => {
    if (valor === null || valor === undefined || valor === 0) {
      return "";
    }
    const numValue = convertValueToTarget(valor);

    const formatted = new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 2, // Limita o máximo de casas decimais para exibição
      minimumFractionDigits: 0, // Não força '.00' para números inteiros
      useGrouping: false, // Impede separador de milhares enquanto digita
    }).format(numValue);

    return formatted;
  }, [valor, convertValueToTarget]);

  const handleInput = (event) => {
    const rawInputValue = event.target.value;

    if (rawInputValue === "") {
      handleValueInput(null);
      return;
    }
    // Remove caracteres não permitidos e padroniza a entrada.
    let sanitizedValue = rawInputValue.replace(/[^0-9,.]/g, "");

    // Garante que só o primeiro separador decimal seja considerado.
    const parts = sanitizedValue.split(/[,.]/);
    if (parts.length > 2) {
      // Se houver mais de um separador, tratamos os demais como parte inteira (ignora input)
      sanitizedValue = parts.slice(0, 2).join(".");
    } else {
      // Padroniza o último separador (vírgula ou ponto) para ponto (padrão JS)
      sanitizedValue = sanitizedValue.replace(",", ".");
    }

    const numericValue = parseFloat(sanitizedValue);

    if (isNaN(numericValue)) {
      return;
    }

    const valueToStoreInBase = convertValueToBase(numericValue);

    //
    const cleanValue = Number(valueToStoreInBase.toFixed(12));

    handleValueInput(cleanValue);
  };
  return (
    <ContainerInput>
      <div className="flex justify-between">
        <Label htmlFor="value" nome={`Valor (${currentCurrency})`} />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.blur();
            handleClickOpen();
          }}
          className="cursor-pointer flex gap-1 items-center"
        >
          Mudar moeda
          <IconArrowRigth />
        </button>
      </div>

      <input
        type="text"
        name="value"
        id="value"
        placeholder={`Digite o valor em ${currentCurrency}`}
        className="border border-neutra-borda-clara py-2 px-2.5 my-0 rounded-[4px] shadow-md"
        value={displayedValue}
        onInput={handleInput}
        required
      />
    </ContainerInput>
  );
};
