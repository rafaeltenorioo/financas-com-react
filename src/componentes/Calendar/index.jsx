// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// 1. Importar o locale do dayjs para o formato da data
import "dayjs/locale/pt-br";
// 2. Importar o objeto de tradução dos textos da interface do MUI
import { ptBR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import { UseModal } from "../Contexts/ModalContext";
import { Label } from "../Label";
import { ContainerInput } from "../ContainerInput";

export const Calendar = () => {
  const minDate = dayjs().startOf("year");
  const maxDate = dayjs().endOf("year");

  const { dataDayjs, handleDateChange } = UseModal();

  const customColor = "var(--color-primaria-verde-escuro)";
  return (
    <ContainerInput>
      <Label nome="Data" />

      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br" /* Define o idioma */
        localeText={
          ptBR.components.MuiLocalizationProvider.defaultProps.localeText
        } /* Traduz os textos */
      >
        <DatePicker
          value={dataDayjs}
          onChange={handleDateChange}
          className="w-full"
          closeOnSelect={true}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              fullWidth: true,
              className: "shadow-md",
              size: "medium",
              required: true,
              sx: {
                // 3. Cor do ÍCONE (Calendário) no foco
                "& .MuiSvgIcon-root": {
                  color: customColor,
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </ContainerInput>
  );
};
