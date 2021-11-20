import React from 'react';

import { useSelector } from 'react-redux';

import { ResponsiveLine } from '@nivo/line';

import '../index.css';

const Graph = () => {
    const overview = useSelector(state => state.overview);

    return (
        <div className='overview-graph'>
            <ResponsiveLine
                data={overview.graph}
                margin={{ top: 25, right: 100, bottom: 25, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
                colors={{ scheme: 'nivo' }}
                curve='linear'
                animate={false}
                lineWidth={5}
                pointSize={10}
                pointColor='white'
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableArea={true}
                areaOpacity={0.1}
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
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)'
                    }
                ]}
            />
        </div>
	);
}

export default Graph;
