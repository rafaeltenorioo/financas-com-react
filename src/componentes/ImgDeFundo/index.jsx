import ImgFundo from "../../assets/img2-plantas-fundo-branco.jpg";

export const ImgDeFundo = () => {
  return (
    <img
      src={ImgFundo}
      alt="Imagem de fundo de plantas em fundo branco"
      className="
                  absolute inset-0
                  w-full h-full 
                  object-cover
                  z-0  
                "
      loading="lazy" /* Boa prática de performance */
    />
  );
};
