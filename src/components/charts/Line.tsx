import { ResponsiveLine, Serie } from '@nivo/line';
import React from 'react';

const MyResponsiveLine = ({ data }: { data: Serie[]}): JSX.Element => { 
  // const data = [
  //     {
  //       "id": "germany",
  //       "color": "hsl(292, 70%, 50%)",
  //       "data": [
  //         {
  //           "x": "plane",
  //           "y": 182
  //         },
  //       ]
  //     },
  // ];
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        yFormat="$"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -42,
            legendOffset: 45,
            legendPosition: 'middle',
        }}
        theme={{
          textColor: '#fff',
          tooltip: {
            container: {
              color: '#000',
            }
          }
        }}
        axisLeft={{
            tickSize: 1,
            tickPadding: 5,
            tickRotation: -42,
            format: '>-.2f',
            legend: 'Treasury Value (MM USD)',
            legendOffset: -55,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
};

export default MyResponsiveLine;
