import React from "react"
import {
  Heading, Flex
} from "@chakra-ui/react"
import { ApiContext } from "../context/api"
import Line from './charts/Line'
import ComponentCard from "./ComponentCard"

const LineContainer = (): JSX.Element => {
  const { lineData } = React.useContext(ApiContext);
  return (
    <ComponentCard
      flexDirection="column"
      overflowX="auto"
    >
      <Heading
        size="lg"
        mt={2}
      >Performance Tracker vs Target</Heading>
      <Flex
        minWidth="700px"
        height="95%"
      >
        <Line data={lineData} />
      </Flex>
    </ComponentCard>
  )
};

export default LineContainer;

