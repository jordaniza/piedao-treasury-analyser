import {
  FormControl,
  FormLabel,
} from "@chakra-ui/form-control";
import { Flex, Button, Center } from "@chakra-ui/react"
import {
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from "@chakra-ui/number-input";
import React from "react";
import { FaSearchPlus } from "react-icons/fa";

type APRInputProps = {
  targetAPR: number;
  setTargetAPR: (apr: number) => void;
};

const APRInput = ({ targetAPR, setTargetAPR }: APRInputProps): JSX.Element => {
  const format = (val: number) => `${val} %` 
  const parse = (val: string) => Number(val.replace(/^\%/, ""))
  
  return (
    <NumberInput
      step={5}
      precision={2}
      onChange={(valueString) => setTargetAPR(parse(valueString))}
      value={format(targetAPR)}
      min={0}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
};

type DaysInputProps = {
  days: number;
  setDays: (days: number) => void;
};

const DaysInput = ({ days, setDays }: DaysInputProps): JSX.Element => (
    <NumberInput
      step={1}
      onChange={(d) => setDays(Number(d))}
      value={days}
      min={0}
    >
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

const TrackerControls = ({
  days,
  setDays,
  targetAPR,
  setTargetAPR,
  refreshData,
}: {
  days: number,
  targetAPR: number,
  setDays: (n: number) => void,
  setTargetAPR: (n: number) => void,
  refreshData: () => void,
}): JSX.Element => (
  <FormControl id="controls">
    <Flex
      flexWrap="wrap"
      justifyContent="space-evenly"
      alignItems="center"
      >
      <FormLabel>
        Number of Days:
        <DaysInput days={days} setDays={setDays} />
      </FormLabel>
      <FormLabel>
        Target APR:
        <APRInput targetAPR={targetAPR} setTargetAPR={setTargetAPR} />
      </FormLabel>
      <Center>
      <Button
        mt={3}
        leftIcon={<FaSearchPlus />}
        variant="solid"
        onClick={() => refreshData()}
      >
        Get Data
      </Button>
      </Center>
    </Flex>
  </FormControl>
);

export default TrackerControls;