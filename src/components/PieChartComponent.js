import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const PieChartComponent = ({ chartData, onPieClick }) => {
    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'];

    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
                {payload.map((entry, index) => (
                    <li key={`legend-${index}`} style={{ marginBottom: 5, fontSize: '0.875rem' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '10px',
                                backgroundColor: entry.color,
                                marginRight: '8px',
                            }}
                        ></span>
                        {`${entry.value} (${chartData[index].value}%)`}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    onClick={onPieClick}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Label
                        value="Call Types"
                        position="center"
                        style={{ fontSize: '1rem', fontWeight: '600', fill: '#333' }}
                    />
                </Pie>
                <Tooltip formatter={(value, name) => `${value}%`} />
                <Legend
                    layout="horizontal"
                    verticalAlign="top"
                    align="center"
                    wrapperStyle={{
                        paddingBottom: '10px',
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;
