import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useMemo } from "react";
import { AddGastoButton } from "../BtAdd";
import { IconChartPie } from "../icons";

export const BasicPie = ({ gastosFiltrados }) => {
  const transformGastosToPieData = (gastos) => {
    //transforma o array em um objeto de totais por tipo
    const acumulador = gastos.reduce((acc, gasto) => {
      const tipo = gasto.tipo;
      const valorNumerico = parseFloat(String(gasto.valor).replace(",", "."));

      acc[tipo] = acc[tipo] || { label: tipo, value: 0 };
      acc[tipo].value += valorNumerico;

      return acc;
    }, {});

    return Object.values(acumulador).map((item, index) => ({
      id: index,
      value: item.value,
      label: item.label,
    }));
  };

  //usando useMemo, para garantir que o cálculo só ocorra se gastosFiltrados mudar
  const pieData = useMemo(() => {
    if (!gastosFiltrados || gastosFiltrados.length === 0) {
      return [];
    }

    return transformGastosToPieData(gastosFiltrados);
  }, [gastosFiltrados]);

  if (pieData.length === 0) {
    return (
      <div
        className="
        flex flex-col items-center justify-center 
        h-[200px] p-4
       shadow-2xl
        rounded-xl bg-gray-50 
        text-center 
       border-l-4 border-primaria-verde-escuro-alto-contraste
      "
      >
        {/* 1. Ícone/Emoji Profissional (Melhor do que uma imagem externa para simplicidade) */}
        <IconChartPie />
        <h3 className="text-xl font-bold text-gray-700 mt-2 mb-2">
          Gráfico de Transações Vazio
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Parece que você ainda não adicionou transações.
        </p>

        {/* 4. Link/Botão de Chamado à Ação */}
        {/* Fundamental para guiar o usuário: um botão que o leva para onde ele deve ir. */}
        <AddGastoButton />
      </div>
    );
  }

  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
          fontSize: "100px",
        },
      }}
      width={175}
      height={175}
      aria-label="Gráfico de distribuição de gastos por tipo"
    />
  );
};
