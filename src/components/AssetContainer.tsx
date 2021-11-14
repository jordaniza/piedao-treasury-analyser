import {
  Box,
  Flex,
  Heading,
  Table,
  Th,
  Center,
  Thead,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ApiContext } from "../context/api"
import Pie from './charts/Pie'
import { camelToSpaced, numberWithCommas } from "../utils"
import { DisplayAsset } from "../types/API"

const AssetTable = ({ assetData }: { assetData: DisplayAsset[] }) => (
  <Box>
    <Table>
        <Thead>
        <Tr>
          {
            Object.keys(assetData[0])
              .filter(k => k !== "assets" && k !== "debt")
              .map(k => (
                <Th
                  key={k}
                  textAlign="center"
                >{camelToSpaced(k)}
                </Th>
              )
            )
          }
        </Tr>
      </Thead>
      <Tbody>
        {
          assetData.map(
            ({ network, protocol, total, percentage, initialValue, performance }, idx) => (
            <Tr textAlign="center" key={idx}>
              <Td textAlign="center">{ network }</Td>
              <Td textAlign="center">{ protocol }</Td>
              <Td textAlign="center">$ { numberWithCommas(Math.round(total)) }</Td>
              <Td textAlign="center">{ Math.round(percentage * 10_000) / 100 }%</Td>
              <Td textAlign="center">$ { numberWithCommas(Math.round(initialValue)) }</Td>
              <Td textAlign="center">{ Math.round(performance * 10_000) / 100 }%</Td>
            </Tr>
            )
          )
        }
      </Tbody>
    </Table>
  </Box>
);

const AssetContainer = (): JSX.Element => {
  const { pieData, assetData } = useContext(ApiContext);
  return (
    <Flex
      height="500px"
      width="90%"
      flexDirection="column"
    >
      <Heading size="md">Asset Allocation</Heading>
      <Flex
        flexWrap="wrap"
        height="500px"
        flexDirection="row"
        >
        <Center width="40%" >
          { pieData.length > 0 ? <Pie data={pieData} /> : null }
        </Center>
        <Center width="60%" >
          { assetData.length > 0 ? <AssetTable assetData={assetData} /> : null }
        </Center>
      </Flex>
    </Flex>
  )
};

export default AssetContainer;