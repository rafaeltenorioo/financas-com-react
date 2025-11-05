import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  CurrencyContext,
  DEFAULT_CURRENCY,
  SUPPORTED_CURRENCIES,
} from "./CurrencyContextDef";

const transformRates = (dadosBrutosDaAPI) => {
  if (
    !dadosBrutosDaAPI ||
    !dadosBrutosDaAPI.USDBRL ||
    !dadosBrutosDaAPI.ARSBRL
  ) {
    console.error(
      "Falha ao encontrar chaves USDBRL ou ARSBRL na API.",
      dadosBrutosDaAPI
    );
    return {
      BRL: 1.0,
      ARS: 1.0,
      USD: 1.0,
    };
  }
  const realEmDolar = parseFloat(dadosBrutosDaAPI.USDBRL.ask);
  const realEmPeso = parseFloat(dadosBrutosDaAPI.ARSBRL.ask);

  return {
    BRL: 1.0,
    ARS: Number((1 / realEmPeso).toFixed(12)),
    USD: Number((1 / realEmDolar).toFixed(12)),
  };
};
const getInitialRates = () => {
  // Inicializa as taxas com valores padrão (1.0) que o fetch rapidamente sobrescreverá
  return SUPPORTED_CURRENCIES.reduce((acc, curr) => {
    acc[curr.code] = 1.0;
    return acc;
  }, {});
};

export const CurrencyProvider = ({ children }) => {
  const moedaSalva = localStorage.getItem("moedaSalva");
  const [currentCurrency, setCurrentCurrency] = useState(
    moedaSalva ? JSON.parse(moedaSalva) : DEFAULT_CURRENCY
  );
  useEffect(() => {
    localStorage.setItem("moedaSalva", JSON.stringify(currentCurrency));
  }, [currentCurrency]);

  const [exchangeRates, setExchangeRates] = useState(getInitialRates());
  // Chamada a API de conversões
  useEffect(() => {
    const buscandoCotacoes = async () => {
      try {
        const response = await fetch(
          "https://economia.awesomeapi.com.br/json/last/USD-BRL,ARS-BRL"
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dados = await response.json();
        // Transoformando/limpando os dados obtidos com transformRates
        setExchangeRates(transformRates(dados));
      } catch (error) {
        console.error("Falha ao buscar cotações", error);
      }
    };

    buscandoCotacoes();
    // setInterval para chamar a função a um intervalo de tempo
    const idDoIntervalo = setInterval(buscandoCotacoes, 600000);

    return () => {
      clearInterval(idDoIntervalo);
    };
  }, []);

  const convertValueToTarget = useCallback(
    (valueInBaseCurrency) => {
      if (valueInBaseCurrency === null || valueInBaseCurrency === undefined)
        return 0;

      const rate = exchangeRates[currentCurrency] || 1.0;

      const result = valueInBaseCurrency * rate;
      return Number(result.toFixed(12));
    },
    [exchangeRates, currentCurrency]
  );

  // Converte da moeda atual de volta para BRL (para salvar) (Retorna um NÚMERO)
  const convertValueToBase = useCallback(
    (valueInTargetCurrency) => {
      if (currentCurrency === DEFAULT_CURRENCY) return valueInTargetCurrency;

      const rate = exchangeRates[currentCurrency];
      if (!rate || rate === 0) return valueInTargetCurrency;

      // Conversão inversa: Valor em BRL = Valor inserido / taxa
      const result = valueInTargetCurrency / rate;
      return Number(result.toFixed(12));
    },
    [exchangeRates, currentCurrency]
  );

  // Recebe BRL, retorna string formatada
  const formatValue = useCallback(
    (valueInBaseCurrency) => {
      const valorNaNovaMoeda = convertValueToTarget(valueInBaseCurrency);

      const formattedString = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: currentCurrency,
        minimumFractionDigits: 2,
        currencyDisplay: "symbol",
      }).format(valorNaNovaMoeda);

      const simbolo = currentCurrency === "ARS" ? "$" : currentCurrency;

      return formattedString.replace(currentCurrency, simbolo).trim();
    },
    [convertValueToTarget, currentCurrency]
  );

  const value = useMemo(
    () => ({
      currentCurrency,
      setCurrentCurrency,
      exchangeRates,
      convertValueToTarget,
      convertValueToBase,
      DEFAULT_CURRENCY,
      formatValue,
    }),
    [
      currentCurrency,
      exchangeRates,
      formatValue,
      convertValueToTarget,
      convertValueToBase,
    ]
  );
  /* Se você memoizar as funções (useCallback) e ainda assim não memoizar o objeto value, a memoização das funções será inútil, pois o objeto que as contém mudará de referência em todo caso, forçando os re-renders de qualquer maneira!
  O CurrencyContext.Provider tem uma regra fundamental: "Se a prop value mudar, force o re-render de todos os componentes filhos que consomem esse Contexto." */

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const UseCurrency = () => {
  const context = useContext(CurrencyContext);
  // if (context === undefined) {
  //   throw new Error("useCurrency deve ser usado dentro de um CurrencyProvider");
  // }
  return context;
};
