import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useContext } from "react";
import { ApiContext } from "../context/api";
import { generateAssetData } from "../services/API";

const TimeSelector = ({
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  targetAPR,
  setTargetAPR
}: {
  timeFrom: number | null,
  timeTo: number,
  targetAPR: number,
  setTimeFrom: (n: number) => void,
  setTimeTo: (n: number) => void,
  setTargetAPR: (n: number) => void, 
}): JSX.Element => {


  const handleSetTimeFrom = (e: React.FormEvent<HTMLInputElement>): void => {
    setTimeFrom(Number(e.currentTarget.value));
  };

  const handleSetTimeTo = (e: React.FormEvent<HTMLInputElement>): void => {
    setTimeTo(Number(e.currentTarget.value));
  };

  const handleSetTargetAPR = (e: React.FormEvent<HTMLInputElement>): void => {
    setTargetAPR(Number(e.currentTarget.value));
  };
  return (
    <FormControl id="time">
      <FormLabel>
        From:
        <Input type="number" value={timeFrom ?? 0} onChange={handleSetTimeFrom} />
      </FormLabel>
      <FormLabel>
        To:
        <Input type="number" value={timeTo} onChange={handleSetTimeTo}/>
      </FormLabel>
      <FormLabel>
        Target APR:
        <Input type="number" value={targetAPR} onChange={handleSetTargetAPR}/>
      </FormLabel>
    </FormControl>
  );
}

export default TimeSelector;