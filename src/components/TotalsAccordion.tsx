import React from "react"
import {
  Box,
  Table,
  Th,
  Thead,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  IconButton,
  Heading,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react"
import { ApiContext } from "../context/api"
import { camelToSpaced, numberWithCommas } from "../utils"
import { Total } from "../types/API"
import { FaSearchPlus } from "react-icons/fa"

const TotalsAccordion = (): JSX.Element => {
  const { totals, summary, onClick } = React.useContext(ApiContext);
  return (
  <Accordion 
    width="90%"
    allowToggle>
    <AccordionItem
    >
      <h1>
        <AccordionButton>
          <Heading size="md" flex="1" textAlign="left">
            Show Monthly Performance
          </Heading>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
      { summary.length > 0 ? <MonthlyTable summary={summary} /> : null }
      </AccordionPanel>
    </AccordionItem>      
    <AccordionItem
    >
      <h1>
        <AccordionButton>
          <Heading size="md" flex="1" textAlign="left">
            Show Granular Breakdown
          </Heading>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
      { totals.length > 0 ? <TotalsTable totals={totals} onClick={onClick}/> : null }
      </AccordionPanel>
    </AccordionItem>

  </Accordion>
  )
};

const MonthlyTable = ({ summary }: any): JSX.Element => (
  <Box>
  <Table>
    <Thead>
      <Tr>
      {
        Object.keys(summary[0])
          .filter(key => key !== "month" && key !== "startValue" && key !== "endValue")
          .map(k => (<Th key={k} textAlign="center">{camelToSpaced(k)}</Th>))
      }
      </Tr>
    </Thead>
    <Tbody>
      {
        summary.map(s => (
          <Tr textAlign="center" key={s.month}>
            <Td textAlign="center">{ s.days }</Td>
            <Td textAlign="center">{ s.monthLabel }</Td>
            <Td textAlign="center">{ Math.round(s.performance * 100) / 100 }%</Td>
            <Td textAlign="center">{ Math.round(s.versusTarget * 100) / 100 }%</Td>
          </Tr>
          )
        )
      }
    </Tbody>
  </Table>
  </Box>
);

const TotalsTable = ({ totals, onClick }: {
  totals: Total[],
  onClick: (id: string) => void
}): JSX.Element => (
  <Box>
    <Table>
      <Thead>
        <Tr>
        {
          Object.keys(totals[0])
            .concat("Get Underlying Assets")
            .filter(k => k !== "timestamp" && k !== "_id")
            .map(k => (<Th key={k} textAlign="center">{camelToSpaced(k)}</Th>))
        }
        </Tr>
      </Thead>
      <Tbody>
        {
          totals.map(
            ({ treasury, createdAt, percentageChange, _id }) => (
            <Tr textAlign="center" key={_id}>
              <Td textAlign="center">$ { numberWithCommas(Math.round(treasury)) }</Td>
              <Td textAlign="center">{ createdAt.slice(0, 16).replace("T", " ")}</Td>
              <Td textAlign="center" textColor={percentageChange > 0 ? "green" : "red"}>{ Math.round(percentageChange * 100_000) / 100_000 }%</Td>
              <Td textAlign="center">
                <IconButton
                  aria-label="Search database"
                  onClick={() => onClick(_id)}
                  icon={<FaSearchPlus/>}
                />
            </Td>
            </Tr>
            )
          )
        }
      </Tbody>
    </Table>
    </Box>
);

export default TotalsAccordion