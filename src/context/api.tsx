import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { TreasuryEntity } from '../types/Treasury';
import { Box } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { slice } from 'lodash';

const Api = (): JSX.Element => {
  const [treasury, setTreasury] = React.useState<TreasuryEntity[]>([]);
  const [totals, setTotals] = React.useState<Pick<TreasuryEntity, "treasury" | "createdAt">[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/treasury').then((res: AxiosResponse<TreasuryEntity[]>) => {
      setTreasury(res.data);
      const totals = res.data.map(({ treasury, createdAt }) => ({ treasury, createdAt }));
      setTotals(totals);
      console.debug({ totals })
    });
  }, []);
  
  return (
    totals[0] ?
    <Table>
      <Thead>
        <Tr>
        {
          Object.keys(totals[0]).map(k => (<Th>{k}</Th>))
        }
        </Tr>
      </Thead>
      <Tbody>
        {
          totals.map(
            ({ treasury, createdAt }) => (
            <Tr>
              <Td>$ { Math.round(treasury * 100) / 100 }</Td>
              <Td>{ createdAt.slice(0, 16)}</Td>
            </Tr>
            )
          )
        }
      </Tbody>
    </Table>
    : <></>
  )
}

export default Api
