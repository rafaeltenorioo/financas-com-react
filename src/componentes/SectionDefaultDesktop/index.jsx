import { Aside } from "../Aside";
import { ImgDeFundo } from "../ImgDeFundo";
import { Main } from "../Main";

export const SectionDefaultDesktop = ({ children }) => {
  return (
    <section className="relative min-h-screen w-full">
      <ImgDeFundo />
      {/* <button
        onClick={() => setIsMenuOpen(true)}
        className={`fixed top-4 left-4 z-30 p-2 bg-neutra-papel/70 rounded-md lg:hidden ${
          isMenuOpen ? "hidden" : "block"
        }`}
        aria-label="Abrir menu"
      >
        <Menu size={24} color="#065f46" />
      </button> */}
      {/* 
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/15 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )} */}

      <div className="relative z-10 max-w-[1200px] mx-auto p-8 lg:p-16 flex flex-col lg:flex-row">
        <Aside />
        <Main>{children}</Main>
      </div>
    </section>
  );
};
