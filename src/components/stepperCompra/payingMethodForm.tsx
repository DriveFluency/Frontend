import { localidades } from "@/lib/localidadesCapital";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import PayingMethodFormText from "./payingMethodText";
import AliasCBUInfo from "./aliasCBUInfo";
import { Pack } from "@/services/api";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useCompra } from "./compraContext";

interface IAddressFormProps {
  handleBack: () => void;
  handleNext: () => void;
  selectedPack: Pack | null;
}

const PayingMethodForm = ({
  handleBack,
  handleNext,
  selectedPack,
}: IAddressFormProps) => {
  const { updateCompra } = useCompra();
  const [method, setMethod] = useState<"efectivo" | "transferencia">(
    "efectivo"
  );
  const [receipt, setReceipt] = useState("");

  const handleChange = (e: any) => {
    setMethod(e.target.value);
    e.target.value === "efectivo" && setReceipt("");
  };

  const onSubmit = () => {
    updateCompra({
      method: method,
      amount: selectedPack?.cost,
      receipt: receipt,
    });
    handleNext();
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"80%"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Image src={"/icons/car.png"} width={40} height={40} alt="car icon" />
          <Typography variant="h5" fontWeight={"bold"}>
            {selectedPack?.name} <br /> {selectedPack?.description}
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight={"bold"}>
          Precio: ${selectedPack?.cost}
        </Typography>
      </Box>

      <PayingMethodFormText />

      <form>
        <FormControl>
          {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            defaultValue="efectivo"
            name="radio-buttons-group"
            value={method}
            onChange={handleChange}
          >
            <FormControlLabel
              value="efectivo"
              control={<Radio />}
              label="Efectivo en el punto de encuentro"
            />
            <FormControlLabel
              value="transferencia"
              control={<Radio />}
              label="Transferencia Bancaria"
            />
          </RadioGroup>
        </FormControl>

        {method === "transferencia" && <AliasCBUInfo />}

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={2}
          alignItems={"center"}
        >
          <Button onClick={handleBack}>Atrás</Button>
          <Button onClick={onSubmit}>Siguiente</Button>
        </Box>
      </form>
    </Box>
  );
};

export default PayingMethodForm;
