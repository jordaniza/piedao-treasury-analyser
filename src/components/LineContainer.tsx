import React from "react"
import {
  Flex,
  Heading,
} from "@chakra-ui/react"
import { ApiContext } from "../context/api"
import Line from './charts/Line'

const LineContainer = (): JSX.Element => {
  const { lineData } = React.useContext(ApiContext);
  return (
    <Flex
      height="500px"
      width="90%"
      flexDirection="column"
      >
      <Heading size="md">Performance Tracker vs Target</Heading>
      <Line data={lineData} />
    </Flex>
  )
};

export default LineContainer;

