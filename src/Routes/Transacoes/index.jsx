import { SelectMonth } from "../../componentes/SelectedMonth";
import { useState } from "react";
import { getMesAtualCompleto } from "../../componentes/Utils";
import { ListaCompleta } from "../../componentes/ListaGastosFiltrados";
import { AddGastoButton } from "../../componentes/BtAdd";
import { BasicPie } from "../../componentes/PieChart";

import { filtrarGastosPorMes } from "../../componentes/Utils";
import { UseGastos } from "../../componentes/Contexts/GastosContext";

import { TotalValueCard } from "../../componentes/TotalValueCard";
import { SectionDefaultDesktop } from "../../componentes/SectionDefaultDesktop";
import { BtChangeCurrency } from "../../componentes/BtChangeCurrency";

function Transacoes() {
  const [mesSelecionado, setMesSelecionado] = useState(getMesAtualCompleto());
  //considerar o uso de useMemo para otimizar os cálculos.
  const { gastosAdicionados } = UseGastos();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const gastosFiltrados = filtrarGastosPorMes(
    gastosAdicionados,
    mesSelecionado
  );

  return (
    <SectionDefaultDesktop
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 h-full m  lg:gap-3 w-full pr-3">
        <div className="col-span-7 lg:pr-6 flex flex-col h-full">
          <div className="flex justify-between lg:hidden mb-5">
            <SelectMonth mes={mesSelecionado} setMes={setMesSelecionado} />
            <div className="flex justify-center items-center gap-6 ml-6">
              <BtChangeCurrency />
              <AddGastoButton />
            </div>
          </div>
          <div className="text-xl font-semibold mb-3 flex justify-center lg:justify-start">
            <h2 className="text-xl font-semibold text-gray-800  ">
              Transações de {mesSelecionado}
            </h2>
          </div>

          <div className="flex flex-col gap-6 justify-between flex-grow">
            <div className="max-h-[45vh] overflow-y-auto rounded-lg p-2  ">
              <ListaCompleta
                mesSelecionado={mesSelecionado}
                gastosFiltrados={gastosFiltrados}
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-center lg:hidden">
                <TotalValueCard
                  mes={mesSelecionado}
                  gastosFiltrados={gastosFiltrados}
                />
              </div>
              <BasicPie gastosFiltrados={gastosFiltrados} />
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col h-full ">
          <div className="hidden lg:flex lg:flex-col lg:justify-between lg:flex-grow lg:w-full">
            <div className="hidden lg:flex lg:flex-col lg:gap-8 lg:items-center ml-2">
              <SelectMonth mes={mesSelecionado} setMes={setMesSelecionado} />
              <AddGastoButton />
            </div>

            <TotalValueCard
              mes={mesSelecionado}
              gastosFiltrados={gastosFiltrados}
            />
          </div>
        </div>
      </div>
    </SectionDefaultDesktop>
  );
}

export default Transacoes;
