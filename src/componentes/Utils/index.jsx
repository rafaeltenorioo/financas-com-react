import { UseCurrency } from "../Contexts/CurrencyContext";

export const MESES_ABREVIADOS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const MESES_COMPLETOS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const getMesAtualCompleto = () => {
  // A data atual (new Date()) retorna o mês de 0 (Janeiro) a 11 (Dezembro).
  const indiceMesAtual = new Date().getMonth();

  return MESES_COMPLETOS[indiceMesAtual];
};

export const getMesNumero = (mesNome) => {
  // Encontra o índice e soma 1 para obter o n° do mes (1-12)
  const indice = MESES_COMPLETOS.indexOf(mesNome);
  return indice !== -1 ? indice + 1 : -1;
}; // associa cada mes com seu respectivo n°

export const filtrarGastosPorMes = (gastos, mesSelecionadoNome) => {
  if (!gastos || !mesSelecionadoNome) {
    return [];
  }

  const mesNumero = getMesNumero(mesSelecionadoNome);
  if (mesNumero === -1) {
    return [];
  }

  return gastos.filter((gasto) => {
    // Extração do mês (MM) do formato 'DD/MM/AAAA'
    const mesString = gasto.data.split("/")[1];
    const mesNumeroGasto = parseInt(mesString, 10);

    return mesNumeroGasto === mesNumero;
  });
};

export const calcularTotalGastos = (gastosFiltrados) => {
  if (!gastosFiltrados || gastosFiltrados.length === 0) {
    return 0;
  }

  const total = gastosFiltrados.reduce((acc, gastoAtual) => {
    const valorNumerico = parseFloat(gastoAtual.valor) || 0;

    const newAcc = acc + valorNumerico;
    return Number(newAcc.toFixed(12));
  }, 0);

  return total;
};

const agregarGastosPorMes = (gastosAdicionados) => {
  // const { formatValue } = UseCurrency();
  if (!gastosAdicionados || gastosAdicionados.length === 0) {
    return {};
  }

  const agregacao = gastosAdicionados.reduce((acc, gasto) => {
    // A. EXTRAÇÃO DO MÊS --> 'DD/MM/AAAA' pegamos apenas o mes
    const mesNumero = parseInt(gasto.data.split("/")[1], 10); // resulta em 1 a 12

    // B. CONVERSÃO E SOMA
    const valorNumerico = parseFloat(gasto.valor) || 0;
    // const valorNumericoFormatado = formatValue(valorNumerico);

    // C. ACUMULAÇÃO
    acc[mesNumero - 1] = (acc[mesNumero - 1] || 0) + valorNumerico;

    return acc;
  }, {});

  return agregacao;
};

export const gerarDadosDoGrafico = (gastosAdicionados) => {
  const gastosPorMesNumero = agregarGastosPorMes(gastosAdicionados);

  // O array final que o LineChart espera (pData)
  const dadosGrafico = [];

  for (let i = 0; i < 12; i++) {
    const totalMes = gastosPorMesNumero[i] || 0;
    dadosGrafico.push(totalMes);
  }

  return dadosGrafico;
};
