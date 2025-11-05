import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MESES_COMPLETOS } from "../Utils";

const mesesDoAno = MESES_COMPLETOS;

export const SelectMonth = ({ mes, setMes }) => {
  const handleMonthChange = (event) => {
    setMes(event.target.value);
  };

  return (
    <div className="w-[250px] md:w-[400px] lg:w-[210px]">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mês</InputLabel>
        <Select
          labelId="month-select-label"
          id="demo-simple-select"
          value={mes}
          label={"Mês"}
          onChange={handleMonthChange}
        >
          {mesesDoAno.map((mesCompleto) => (
            <MenuItem key={mesCompleto} value={mesCompleto}>
              {mesCompleto}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
