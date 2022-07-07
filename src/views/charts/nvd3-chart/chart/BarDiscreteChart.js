import React from 'react';
import NVD3Chart from 'react-nvd3';

const datum = [
    {
        key: 'Cumulative Return',
        values: [
            {
                label: 'jan',
                value: 29.765957771107,
                color: '#3ebfea'
            },
            {
                label: 'feb',
                value: 10,
                color: '#04a9f5'
            },
            {
                label: 'mar',
                value: 32.807804682612,
                color: '#ff8a65'
            },
            {
                label: 'apr',
                value: 196.45946739256,
                color: '#1de9b6'
            },
            {
                label: 'may',
                value: 0.25434030906893,
                color: '#4C5667'
            },
            {
                label: 'jun',
                value: 8.079782601442,
                color: '#69CEC6'
            },
            {
                label: 'july',
                value: 13.925743130903,
                color: '#a389d4'
            },
            {
                label: 'aug',
                value: 5.1387322875705,
                color: '#FE8A7D'
            }
        ]
    },
    {
        key: 'Cumulative',
        values: [
            {
                label: 'jan',
                value: 219.765957771107,
                color: '#3ebfea'
            },
            {
                label: 'feb',
                value: 110,
                color: '#04a9f5'
            },
            {
                label: 'mar',
                value: 132.807804682612,
                color: '#ff8a65'
            },
            {
                label: 'apr',
                value: 96.45946739256,
                color: '#1de9b6'
            },
            {
                label: 'may',
                value: 10.25434030906893,
                color: '#2C5667'
            },
            {
                label: 'jun',
                value: 18.079782601442,
                color: '#59CEC6'
            },
            {
                label: 'july',
                value: 113.925743130903,
                color: '#b389d4'
            },
            {
                label: 'aug',
                value: 2.1387322875705,
                color: '#FE8A5D'
            }
        ]
    },
];

const BarDiscreteChart = () => {
    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.2} showValues />;
};

export default BarDiscreteChart;
