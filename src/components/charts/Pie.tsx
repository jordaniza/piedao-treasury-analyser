import React from 'react';
import { ComputedDatum, ResponsivePie } from '@nivo/pie'
import { PieData } from '../../types/Chart';
import { useBreakpointValue } from '@chakra-ui/media-query';

const format = ({label, value}: ComputedDatum<PieData>) => `${label} - $ ${Math.round( value/ 10_000) / 100} MM`;
const MyResponsivePie = ({ data }: { data: PieData[]}): JSX.Element => {
  const isMobile = useBreakpointValue({ sm: false, md: true, });
  return (
    <ResponsivePie
        theme={
          {
            tooltip: {

              container: {
                color: '#000',
              },

            }
          }
        }
        data={data}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
        innerRadius={0.5}
        tooltip={(data) => (
          <div
            style={{ background: '#000', color: '#fff', padding: '10px' }}>
              {format(data.datum)}
          </div>
        )}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLabel={data => format(data)}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#000"
        enableArcLinkLabels={false}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        legends={isMobile ? [
            {
                anchor: 'left',
                direction: 'column',
                justify: false,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 50,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000', 
                        },
                    }
                ]
            }
        ] : undefined }
    />
  )}

export default MyResponsivePie