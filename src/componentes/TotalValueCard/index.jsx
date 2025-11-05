import { calcularTotalGastos } from "../../componentes/Utils";
import { UseCurrency } from "../Contexts/CurrencyContext";

export const TotalValueCard = ({ gastosFiltrados, mes }) => {
  const { formatValue } = UseCurrency();
  const totalGastosDoMes = calcularTotalGastos(gastosFiltrados);

  return (
    <div
      className="
        w-[80%] md:w-full p-6 bg-white rounded-lg shadow-lg 
        border-l-4 border-secundaria-roxo-profundo 
         hover:shadow-xl flex flex-col items-center 
      "
      aria-labelledby="total-mes-titulo" // Acessibilidade: rótulo para o valor
    >
      <h3
        id="total-mes-titulo"
        className="text-sm font-medium text-texto-cinza-medio uppercase"
      >
        Total de Gastos ({mes})
      </h3>
      <p className="mt-1 text-3xl font-semibold lg:text-2xl text-secundaria-roxo-escuro">
        {formatValue(totalGastosDoMes)}
      </p>
    </div>
  );
};
