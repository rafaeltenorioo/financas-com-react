import { Link } from "react-router";
import { IconCurrency, IconHome, IconSettings, IconSummary } from "../icons";

import { Landmark, X } from "lucide-react";

import { UseDialogCurrency } from "../Contexts/DialogCurrency";

const NAV_LINKS = [
  {
    nome: "Visão Geral",
    icone: <IconHome />,
    link: "/visaoGeral",
  },
  {
    nome: "Transações",
    icone: <IconSummary />,
    link: "/",
  },
];

export const Aside = ({ isOpen, onClose }) => {
  const { handleClickOpen } = UseDialogCurrency();
  return (
    <aside
      className={`bg-neutra-papel/95 w-full max-w-[250px] py-5 px-3 flex flex-col justify-between gap-14
    
    fixed top-0 left-0 h-full z-50
    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    lg:static lg:h-auto lg:min-h-screen lg:translate-x-0 lg:z-auto lg:rounded-l-[8px]
    `}
    >
      <div className="flex flex-col gap-12">
        <div className="flex gap-3 items-center justify-between">
          <div className="flex gap-3 items-center">
            <Landmark size={32} color="#065f46" strokeWidth={2.5} />
            <h3 className="font-bold text-3xl text-primaria-verde-escuro">
              Finanças
            </h3>
          </div>
          <button onClick={onClose} className="lg:hidden p-1">
            <X size={24} color="#065f46" />
          </button>
        </div>

        <ul className="flex flex-col gap-4 font-medium text-[16px] text-primaria-verde-escuro">
          {NAV_LINKS.map((item, index) => (
            <li
              key={index}
              className={`gap-1 items-center ${
                item.nome === "Dashboard" ? "hidden lg:flex" : "flex"
              }`}
            >
              {item.icone}
              <Link to={item.link} onClick={onClose}>
                {item.nome}
              </Link>
            </li>
          ))}
          <li className="flex gap-1 items-center">
            <button
              onClick={(e) => {
                e.currentTarget.blur();
                handleClickOpen();
                onClose();
              }}
              className="cursor-pointer flex gap-1 items-center"
            >
              <IconCurrency size="size-5" />
              Converter Moeda
            </button>
          </li>
          {/* <li className="flex gap-1 items-center">
            <button
              onClick={() =>
                alert("Essa funcionalidade ainda está em desenvolvimento!")
              }
              className="cursor-pointer flex gap-1 items-center"
            >
              <IconSettings />
              Configurações
            </button>
          </li> */}
        </ul>
      </div>
      <div></div>
    </aside>
  );
};
