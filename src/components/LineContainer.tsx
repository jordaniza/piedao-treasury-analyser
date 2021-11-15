import React from "react"
import {
  Heading,
} from "@chakra-ui/react"
import { ApiContext } from "../context/api"
import Line from './charts/Line'
import ComponentCard from "./ComponentCard"

const LineContainer = (): JSX.Element => {
  const { lineData } = React.useContext(ApiContext);
  return (
    <ComponentCard
      flexDirection="column"
    >
      <Heading
        size="lg"
      >Performance Tracker vs Target</Heading>
      <Line data={lineData} />
    </ComponentCard>
  )
};

export default LineContainer;

