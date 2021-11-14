import React, { useState } from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import ApiContextProvider, { ApiContext } from "./context/api"
import AssetContainer from "./components/AssetContainer"
import TotalsAccordion from "./components/TotalsAccordion"
import LineContainer from "./components/LineContainer"
import SummaryStats from "./components/SummaryStats"
import TimeSelector from "./components/TimeSelector"

export const App = () => {
  const [timeFrom, setTimeFrom] = useState<number>(0);
  const [timeTo, setTimeTo] = useState<number>(new Date().getTime());
  const [targetAPR, setTargetAPR] = useState(10);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher
        position="fixed"
        top="0.2rem"
        right="0.2rem"
        justifySelf="flex-end"
      />
      <ApiContextProvider
        timeFrom={timeFrom}
        timeTo={timeTo}
        targetAPR={targetAPR}
      >
        <VStack spacing={10}>
        <Heading
          textAlign="center"
          my={10}
        >
          PieDAO Treasury Tracker
        </Heading>
        <SummaryStats />
        <TimeSelector
          timeFrom={timeFrom}
          timeTo={timeTo}
          setTimeFrom={setTimeFrom}
          setTimeTo={setTimeTo}
          targetAPR={targetAPR}
          setTargetAPR={setTargetAPR}
        />
        <LineContainer />
        <TotalsAccordion />
        <AssetContainer />
        </VStack>
      </ApiContextProvider>
    </ChakraProvider>
  )
};