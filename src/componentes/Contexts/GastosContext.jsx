import { useContext, useEffect, useState } from "react";
import { GastosContext } from "./GastosContextDef";

export const GastosProvider = ({ children }) => {
  const gastosSalvos = localStorage.getItem("listaDeGastos");
  const [gastosAdicionados, setGastosAdicionados] = useState(
    gastosSalvos ? JSON.parse(gastosSalvos) : []
  );

  useEffect(() => {
    localStorage.setItem("listaDeGastos", JSON.stringify(gastosAdicionados));
  }, [gastosAdicionados]);

  const handleExcluirGasto = (gastoId) => {
    setGastosAdicionados(
      gastosAdicionados.filter((gasto) => gasto.id !== gastoId)
    );
  };
  const handleExcluirTodosOsGastos = (gastos) => {
    const listaVazia = [];
    if (gastos && gastos.length > 0) {
      gastos = listaVazia;
    }
    return gastos;
  };

  // Definindo o que será exportado...
  const value = {
    gastosAdicionados,
    setGastosAdicionados,
    handleExcluirGasto,
    handleExcluirTodosOsGastos,
  };
  return (
    <GastosContext.Provider value={value}>{children}</GastosContext.Provider>
  );

  // Criei um 'contexto', depois 'providenciei' os 'values' para os filhos. Ou seja, todos os componentes da aplicação!
};

export const UseGastos = () => {
  const context = useContext(GastosContext);

  if (context === undefined) {
    throw new Error("useGastos debe ser usado dentro de un GastosProvider");
  }
  return context;
};
