import React from 'react';
import NVD3Chart from 'react-nvd3';

    const data= [
        {
            values: [{
                "x": 1998,
                "y": 10.45
            }, {
                "x": 1999,
                "y": 10.48
            }, {
                "x": 2000,
                "y": 11.5
            }, {
                "x": 2001,
                "y": 11.52
            }, {
                "x": 2002,
                "y": 10.55
            }, {
                "x": 2003,
                "y": 11.58
            }, {
                "x": 2004,
                "y": 10.6
            }],
            key: 'Store3 Profit',
            color: '#A389D4'
        },
        {
            values: [{
                "x": 1998,
                "y": 13.45
            }, {
                "x": 1999,
                "y": 13.48
            }, {
                "x": 2000,
                "y": 13.5
            }, {
                "x": 2001,
                "y": 12.52
            }, {
                "x": 2002,
                "y": 12.55
            }, {
                "x": 2003,
                "y": 13.58
            }, {
                "x": 2004,
                "y": 14.6
            }],
            key: 'Store1 Profit',
            color: '#04a9f5'
        },
        {
            values:  [{
                "x": 1998,
                "y": 15
            }, {
                "x": 1999,
                "y": 15.2
            }, {
                "x": 2000,
                "y": 15
            }, {
                "x": 2001,
                "y": 15.9
            }, {
                "x": 2002,
                "y": 15
            }, {
                "x": 2003,
                "y": 16
            }, {
                "x": 2004,
                "y": 15.7
            }
],
            key: 'Store2 Profit',
            color: '#1de9b6',
            area: true
        }
    ]

const LineChart = () => {
    return (
        <React.Fragment>
            {React.createElement(NVD3Chart, {
                xAxis: {
                    tickFormat: function (d) {
                        return d;
                    },
                    axisLabel: 'Time (ms)'
                },
                yAxis: {
                    axisLabel: 'Profit (v)',
                    tickFormat: function (d) {
                        return parseFloat(d).toFixed(2);
                    }
                },
                type: 'lineChart',
                datum: data,
                x: 'x',
                y: 'y',
                height: 300,
                renderEnd: function () {
                }
            })}
        </React.Fragment>
    );
};

export default LineChart;
