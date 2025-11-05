import { SimpleLineChart } from "../../componentes/Grafico";
import { MiniListaGastos } from "../../componentes/MiniListaGastos";
// import FormDialog from "../../componentes/Modal";
import { AddGastoButton } from "../../componentes/BtAdd";
import { SectionDefaultDesktop } from "../../componentes/SectionDefaultDesktop";

function Home() {
  return (
    <SectionDefaultDesktop>
      <div className="flex flex-col">
        <div className="flex shadow-md rounded-[8px]">
          <SimpleLineChart />
        </div>
        <div className="grid grid-cols-20 gap-2">
          <div className="flex flex-col mt-2  col-span-11 ">
            <MiniListaGastos />
          </div>
          <div className="col-span-9  ml-3 mt-5 flex flex-col items-center">
            <div>
              <AddGastoButton />
            </div>
            <div>{/* Gráfico de pizza */}</div>
          </div>
        </div>
      </div>
    </SectionDefaultDesktop>
  );
}

export default Home;
