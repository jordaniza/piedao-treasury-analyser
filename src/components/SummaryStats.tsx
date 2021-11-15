import { Box } from "@chakra-ui/layout";
import { StatGroup, Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import React, { useContext } from "react";
import { ApiContext } from "../context/api";
import { camelToSpaced } from "../utils";

const SummaryStats = (): JSX.Element => {
  const { stats } = useContext(ApiContext);
  return (
    <Box
      >
        {
        Object.entries(stats).length > 0
        ? <StatGroup
          >
            {
              Object.entries(stats).map((value: any[], index) => (
                <Stat
                  my={5}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  key={index}
                >
                  <StatLabel
                    textAlign="center"
                  >{camelToSpaced(value[0])}</StatLabel>
                  <StatNumber
                    textAlign="center"
                    width="180px"
                    color={
                      value[0] === "versusBenchmark"
                      ? (
                          Number(value[1].replace('%', '')) > 0 
                          ? "green"
                          : "red"
                        )
                      : "white"
                    }
                  >{value[1]}</StatNumber>
                </Stat>
              ))
            }
          </StatGroup>
        : null
      }
    </Box>
  );
};

export default SummaryStats;