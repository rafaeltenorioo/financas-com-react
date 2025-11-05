import { useContext, useState } from "react";

import { ModalContext } from "./ModalContextDef";
import { UseGastos } from "./GastosContext";
import dayjs from "dayjs";

export const ModalProvider = ({ children }) => {
  const { setGastosAdicionados } = UseGastos();

  const [gastoEmEdicao, setGastoEmEdicao] = useState(null);

  const [gastoSelecionado, setGastoSelecionado] = useState("");
  const [nota, setNota] = useState("");
  const [valor, setValor] = useState(null);
  const [dataDayjs, setDataDayjs] = useState(null);
  const [dataString, setDataString] = useState(null);
  const [open, setOpen] = useState(false);

  // Função que atualiza um gasto
  const onAtualizarGasto = (gastoAtualizado) => {
    setGastosAdicionados((prevGastos) =>
      prevGastos.map((gasto) =>
        gasto.id === gastoAtualizado.id ? gastoAtualizado : gasto
      )
    );
  };

  const onAdicionarGasto = (novoGasto) => {
    const gastoComId = {
      id: Date.now(),
      ...novoGasto,
    };
    setGastosAdicionados((gastosAnteriores) => [
      ...gastosAnteriores,
      gastoComId,
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const gastoBase = {
      tipo: gastoSelecionado,
      valor: valor,
      data: dataString,
      notas: nota,
    };

    if (gastoEmEdicao) {
      const gastoAtualizado = {
        ...gastoBase,
        id: gastoEmEdicao.id,
      };
      onAtualizarGasto(gastoAtualizado);
    } else {
      onAdicionarGasto(gastoBase);
    }

    handleClose();
  };

  const resetForm = () => {
    setGastoSelecionado("");
    setNota("");
    setValor("");
    setDataDayjs(null);
    setDataString(null);
  };

  const handleGastoChange = (e) => {
    setGastoSelecionado(e.target.value);
  };

  const handleNota = (e) => {
    setNota(e.target.value);
  };
  const handleValueInput = (newValue) => {
    setValor(newValue);
  };
  const handleDateChange = (newDayjsObject) => {
    setDataDayjs(newDayjsObject);

    if (newDayjsObject && newDayjsObject.isValid()) {
      const dataFormatada = newDayjsObject.format("DD/MM/YYYY");
      setDataString(dataFormatada);
    } else {
      setDataString(null);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    resetForm();
    setGastoEmEdicao(null);
  };

  const handleEdit = (gasto) => {
    setGastoEmEdicao(gasto);
    setOpen(true);
    setGastoSelecionado(gasto.tipo || "");
    setNota(gasto.notas || "");
    setValor(parseFloat(gasto.valor) || 0);

    if (gasto.data) {
      const [dia, mes, ano] = gasto.data.split("/");
      const dataObjeto = dayjs(`${ano}-${mes}-${dia}`);
      setDataDayjs(dataObjeto.isValid() ? dataObjeto : null);
      setDataString(gasto.data);
    } else {
      setDataDayjs(null);
      setDataString(null);
    }
  };
  // Definindo o que será exportado...
  const value = {
    open,
    handleClickOpen,
    handleClose,
    handleSubmit,
    handleGastoChange,
    handleNota,
    handleValueInput,
    handleDateChange,
    handleEdit,
    gastoSelecionado,
    nota,
    valor,
    dataDayjs,
    dataString,
    gastoEmEdicao,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );

  // Criei um 'contexto', depois 'providenciei' os 'values' para os filhos. Ou seja, todos os componentes da aplicação!
};

export const UseModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useGastos debe ser usado dentro de un ModalProvider");
  }
  return context;
};
