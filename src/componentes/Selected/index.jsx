import { UseModal } from "../Contexts/ModalContext";
import { ContainerInput } from "../ContainerInput";
import { Label } from "../Label";

export const Selected = () => {
  const ARRAY_GASTOS = [
    {
      id: 0,
      gasto: "Moradia",
      descricao: "Inclui aluguel, condomínio...",
    },
    {
      id: 1,
      gasto: "Despesas domésticas",
      descricao: "Contas essenciais como Água, Luz, Gás, Telefone e Internet.",
    },
    {
      id: 2,
      gasto: "Alimentação",
      descricao: "Despesas com supermercado, feira, restaurantes e lanches.",
    },
    {
      id: 3,
      gasto: "Transporte",
      descricao:
        "Gastos com combustível, aplicativos de transporte e passagens.",
    },
    {
      id: 4,
      gasto: "Saúde",
      descricao:
        "Plano de saúde, farmácia, consultas médicas, academia e cuidados pessoais.",
    },
    {
      id: 5,
      gasto: "Lazer",
      descricao:
        "Cinema, eventos, hobbies, assinaturas de streaming e viagens.",
    },
    {
      id: 6,
      gasto: "Educação",
      descricao: "Cursos, mensalidades, livros e materiais de estudo.",
    },
    {
      id: 7,
      gasto: "Investimentos",
      descricao:
        "Aplicações financeiras, poupança e contribuições para aposentadoria.",
    },
    {
      id: 8,
      gasto: "Outros / Diversos",
      descricao: "Gastos não classificados ou esporádicos.",
    },
  ];
  const { gastoSelecionado, handleGastoChange } = UseModal();
  return (
    <ContainerInput>
      <Label nome="Categoria" />

      <select
        name="gastos"
        id="gastos"
        value={gastoSelecionado}
        onChange={handleGastoChange}
        className="border border-neutra-borda-clara shadow-md py-[9.2px] px-2.5 my-0 rounded-[4px]"
        required
      >
        <option disabled value="">
          Selecione o tipo do gasto
        </option>
        {ARRAY_GASTOS.map((element) => (
          <option key={element.id} value={element.gasto}>
            {element.gasto}
          </option>
        ))}
      </select>
    </ContainerInput>
  );
};
