import { createContext } from "react";

export const DEFAULT_CURRENCY = "BRL";

export const SUPPORTED_CURRENCIES = [
  {
    code: "BRL",
    name: "Real Brasileiro",
    symbol: "R$",
    initialRate: 1.0,
  },
  {
    code: "ARS",
    name: "Peso Argentino",
    symbol: "AR$",
    initialRate: 1.0,
  },
  {
    code: "USD",
    name: "Dólar Americano",
    symbol: "$",
    initialRate: 1.0,
  },
];

const DEFAULT_CONTEXT_VALUE = {
  currentCurrency: DEFAULT_CURRENCY,
  setCurrentCurrency: () => {}, // mock
  exchangeRates: { BRL: 1.0, ARS: 1.0, USD: 1.0 },
  convertValueToTarget: (value) => value,
  convertValueToBase: (value) => value,
  DEFAULT_CURRENCY: DEFAULT_CURRENCY,
  formatValue: (value) => String(value),
};
export const CurrencyContext = createContext(DEFAULT_CONTEXT_VALUE);
