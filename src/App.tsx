import React, { useState } from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Flex,
  Heading,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Api from "./context/api"
import Pie from './components/charts/Pie'
import Line from './components/charts/Line'
import TimeSelector from "./components/TimeSelector"
import { Serie } from "@nivo/line"

export const App = () => {
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState<number>(new Date().getTime());
  const [targetAPR, setTargetAPR] = useState(10);
  const [lineData, setLineData] = useState<Serie[]>([]);
  const [pieData, setPieData] = useState([]);


  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
          <ColorModeSwitcher
            position="fixed"
            top="0.2rem"
            right="0.2rem"
            justifySelf="flex-end" />
        <Grid minH="100vh" p={3}>
          <Heading>PieDAO Treasury Tracker</Heading>
          <TimeSelector
            timeFrom={timeFrom}
            timeTo={timeTo}
            setTimeFrom={setTimeFrom}
            setTimeTo={setTimeTo}
            targetAPR={targetAPR}
            setTargetAPR={setTargetAPR}
            />
          <Flex height="500px" flexWrap="wrap">
            <Box height="100%" minWidth="500px" width="50%">
              <Pie data={pieData}/>
            </Box>
            <Box height="100%" minWidth="500px" width="50%" py="5">
              <Line data={lineData} />
            </Box>
          </Flex>          
          <VStack spacing={8}>
            <Api
              timeFrom={timeFrom}
              timeTo={timeTo}
              setLineData={setLineData}
              setPieData={setPieData}
              targetAPR={targetAPR}
            ></Api>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
