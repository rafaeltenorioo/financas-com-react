import Box from "@mui/material/Box";

import { UseGastos } from "../../componentes/Contexts/GastosContext";

import { Button } from "@mui/material";
import { IconEdit, IconTrash } from "../icons";
import { UseModal } from "../Contexts/ModalContext";
import { UseCurrency } from "../Contexts/CurrencyContext";

export const ListaCompleta = ({ gastosFiltrados }) => {
  const { handleExcluirGasto } = UseGastos();
  const { formatValue } = UseCurrency();

  const { handleEdit } = UseModal();

  if (gastosFiltrados.length === 0) {
    return (
      <div className="shadow-md  bg-neutra-branco p-6 rounded-lg  col-span-1 border-l-4 border-secundaria-roxo-profundo mt-3 mr-3 flex justify-center text-center">
        <p className="text-texto-chumbo-suave text-[18px]">
          Ainda não há transações registradas. <br />
          <strong>Adicione uma!</strong>
        </p>
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <ul className="columns-1 md:columns-2 gap-4 list-none p-0 bg-neutra-papel">
        {gastosFiltrados.map((gasto) => (
          <li
            key={gasto.id}
            className="flex items-center py-3 px-2 bg-gray-100 rounded-lg border-l-4 border-secundaria-roxo-profundo hover:bg-gray-200 flex-grow mb-4 break-inside-avoid"
          >
            <div className="flex flex-col flex-grow">
              {/* 1. Categoria: Destaque principal */}
              <span className="font-bold text-lg text-secundaria-roxo-escuro">
                {gasto.tipo}
              </span>

              {/* 2. Notas/Descrição: Adicionamos aqui! */}
              {gasto.notas && (
                <p className="text-sm text-gray-700 mt-1 italic break-words">
                  {gasto.notas}
                </p>
              )}

              {/* 3. Valor e Data: Informação secundária, mais discreta */}
              <span className="text-xs text-gray-500 mt-2">
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
                marginRight: "5px",
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
              }}
            >
              <IconTrash />
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
};
