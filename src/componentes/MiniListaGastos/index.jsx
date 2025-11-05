import { Button } from "@mui/material";
import { IconArrowRigth, IconEdit, IconTrash } from "../icons";
import { Link } from "react-router";
import { UseGastos } from "../Contexts/GastosContext";
import { UseModal } from "../Contexts/ModalContext";
import { UseCurrency } from "../Contexts/CurrencyContext";

export const MiniListaGastos = () => {
  const { gastosAdicionados, handleExcluirGasto } = UseGastos();
  const { formatValue } = UseCurrency();

  const { handleEdit } = UseModal();

  if (gastosAdicionados.length === 0) {
    return (
      <div className="bg-neutra-branco p-6 rounded-lg shadow-lg hover:shadow-xl col-span-1 border-l-4 border-secundaria-roxo-profundo mt-5 mr-3 flex justify-center text-center">
        <p className="text-texto-chumbo-suave text-[18px]">
          Ainda não há transações registradas. <br />
          <strong>Adicione uma!</strong>
        </p>
      </div>
    );
  }

  const ultimos5Gastos = gastosAdicionados
    .slice() // copia o array
    .sort((a, b) => b.id - a.id) // ordena do id maior (mais novo) para o menor
    .slice(0, 5); // pega os 5 primeiros

  return (
    <div className="p-2">
      <h2 className="text-xl font-medium mb-2 text-texto-chumbo pb-2">
        Últimos Gastos Adicionados
      </h2>

      <ul className="max-h-56 overflow-y-auto flex flex-col gap-2 w-[100%]">
        {ultimos5Gastos.map((gasto) => (
          <li
            key={gasto.id}
            className="flex justify-between items-center py-3 pl-2 bg-gray-300 rounded-lg border-l-4 border-secundaria-roxo-profundo hover:bg-gray-200 flex-grow"
          >
            <div className="flex flex-col flex-grow">
              <span className="font-semibold text-lg text-secundaria-roxo-escuro">
                {gasto.tipo}
              </span>
              {gasto.notas && (
                <p className="text-sm text-gray-700 mt-1 mb-1 italic break-words">
                  {gasto.notas}
                </p>
              )}
              <span className="text-sm text-gray-600">
                {formatValue(gasto.valor)} ({gasto.data})
              </span>
            </div>
            <Button
              variant="text"
              size="small"
              onClick={() => handleEdit(gasto)}
              sx={{
                minWidth: 0,
                padding: "2px",
                marginRight: "4px",
                marginLeft: "2px",
              }}
            >
              <IconEdit />
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => handleExcluirGasto(gasto.id)}
              sx={{
                minWidth: 0,
                padding: "2px",
                marginRight: "6px",
              }}
            >
              <IconTrash />
            </Button>
          </li>
        ))}
      </ul>

      {/* Navegação para lista completa com React Router */}
      <div className="mt-2 pt-2 flex justify-end">
        <Link
          to="/"
          className="text-sm text-secundaria-roxo-profundo hover:text-secundaria-roxo-escuro font-medium flex gap-1"
        >
          <p> Ver todas as transações</p>
          <IconArrowRigth />
        </Link>
      </div>
    </div>
  );
};
