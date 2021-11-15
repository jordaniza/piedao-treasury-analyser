import React, { useState } from "react"
import {
  ChakraProvider,
  VStack,
  Heading,
  theme,
  Divider,
} from "@chakra-ui/react"
import ApiContextProvider from "./context/api"
import AssetContainer from "./components/AssetContainer"
import TotalsAccordion from "./components/TotalsAccordion"
import LineContainer from "./components/LineContainer"
import SummaryStats from "./components/SummaryStats"
import TrackerControls from "./components/TrackerControls"

export const App = () => {
  const [days, setDays] = useState<number>(7);
  const [targetAPR, setTargetAPR] = useState(10);
  const [refresh, setRefresh] = useState(0);

  const refreshData = () => {
    setRefresh(refresh + 1);
  };
  return (
    <ChakraProvider theme={theme}>
      <ApiContextProvider
        days={days}
        targetAPR={targetAPR}
        refresh={refresh}
      >
        <VStack spacing={10}>
        <Heading
          textAlign="center"
          my={10}
          display="flex"
          alignItems="center"
          px={4}
        >
          PieDAO Treasury Tracker
        </Heading>
        <SummaryStats />
        <TrackerControls
          days={days}
          setDays={setDays}
          targetAPR={targetAPR}
          setTargetAPR={setTargetAPR}
          refreshData={refreshData}
        />
        <LineContainer />
        <TotalsAccordion />
        <AssetContainer />
        </VStack>
      </ApiContextProvider>
    </ChakraProvider>
  )
};