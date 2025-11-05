import { UseDialogCurrency } from "../Contexts/DialogCurrency";
import { IconCurrency } from "../icons";

export const BtChangeCurrency = ({ onClose }) => {
  const { handleClickOpen } = UseDialogCurrency();

  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        handleClickOpen();
        onClose();
      }}
      className="cursor-pointer bg-primaria-verde-escuro text-neutra-papel hover:bg-primaria-verde-hover h-10 rounded-[50%] min-w-10 w-10 md:w-40 md:min-w-40 md:rounded-full flex justify-center items-center "
    >
      <div className="md:hidden  ">
        <IconCurrency size="size-8" />
      </div>
      <span className="hidden md:block text-[16px] font-light">
        Mudar Moeda
      </span>
    </button>
  );
};
