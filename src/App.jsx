import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Routes/Home/index.jsx";
import Transacoes from "./Routes/Transacoes/index.jsx";
import { GastosProvider } from "./componentes/Contexts/GastosContext.jsx";
import { ModalProvider } from "./componentes/Contexts/ModalContext.jsx";
import FormDialog from "./componentes/Modal/index.jsx";
import { CurrencyProvider } from "./componentes/Contexts/CurrencyContext.jsx";

import { DialogCurrencyProvider } from "./componentes/Contexts/DialogCurrency.jsx";
import { DialogCurrencyComponent } from "./componentes/DialogCurrency/index.jsx";

export const Root = () => (
  <GastosProvider>
    <ModalProvider>
      <CurrencyProvider>
        <DialogCurrencyProvider>
          <FormDialog />
          <DialogCurrencyComponent />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Transacoes />} />
              <Route path="/visaoGeral" element={<Home />} />
            </Routes>

            {/* Modal é renderizado aqui, ele ñ está em nenhuma rota, assim ficará escutando qualquer mudança de estado */}
          </BrowserRouter>
        </DialogCurrencyProvider>
      </CurrencyProvider>
    </ModalProvider>
  </GastosProvider>
);
