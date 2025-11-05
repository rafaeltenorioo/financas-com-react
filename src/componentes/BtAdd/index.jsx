import { Box, Button } from "@mui/material";
import { UseModal } from "../Contexts/ModalContext";
import { IconPlus } from "../icons";

export const AddGastoButton = () => {
  const { handleClickOpen } = UseModal();
  return (
    <button
      className="bg-primaria-verde-escuro text-neutra-papel hover:bg-primaria-verde-hover h-10 rounded-[50%] min-w-10 w-10 md:w-40 md:min-w-40 md:rounded-full cursor-pointer flex justify-center items-center"
      onClick={(e) => {
        e.currentTarget.blur();
        handleClickOpen();
      }}
    >
      <div className=" md:hidden  ">
        <IconPlus />
      </div>
      <span className="hidden md:block text-[16px] font-light">
        Adicionar Gasto
      </span>
    </button>
  );
};
