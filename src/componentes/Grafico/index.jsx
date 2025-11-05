import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import { gerarDadosDoGrafico, MESES_ABREVIADOS } from "../Utils";
import { UseGastos } from "../Contexts/GastosContext";
import { UseCurrency } from "../Contexts/CurrencyContext";

export const SimpleLineChart = () => {
  const { gastosAdicionados } = UseGastos();
  const xLabels = MESES_ABREVIADOS;
  const pData = gerarDadosDoGrafico(gastosAdicionados);
  const { formatValue } = UseCurrency();

  return (
    <Box
      sx={{
        width: "100%",
        height: 280,
        padding: "8px 16px 8px 0px",
      }}
    >
      <LineChart
        series={[
          {
            data: pData,
            label: "Total de Gastos",
            color: "#065f46",
            showMark: true,
            valueFormatter: (value) => formatValue(value),
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: xLabels,
            tickLabelStyle: {
              fontSize: 12,
              fontWeight: 600,
              fill: "#4B5563",
            },
          },
        ]}
        yAxis={[
          {
            width: 100,
            tickLabelStyle: {
              fontSize: 12,
              fontWeight: 600,
              fill: "#1F2937",
            },
            valueFormatter: (value) => formatValue(value),
          },
        ]}
        slotProps={{
          legend: {
            position: { vertical: "top", horizontal: "middle" },
            sx: {
              fontSize: 16,
            },
          },
        }}
      />
    </Box>
  );
};
