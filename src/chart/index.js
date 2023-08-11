import React from "react";
import PropTypes from "prop-types";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Chart = ({ data = [] }) => {
    return (
        <ResponsiveContainer minWidth={1000} minHeight={400}>
            <LineChart
                width={500}
                height={300}
                data={data.map(item => ({...item, seconds: item.seconds + "s" }))}
                margin={{
                    top: 30,
                    right: 30,
                    left: 10,
                    bottom: 30
                }}
            >
                <CartesianGrid strokeDasharray={"3 3"}/>
                <XAxis dataKey={"seconds"} domain={[0, data.lendth]} />
                <YAxis yAxisId={"left"} domain={[0, 100]} />
                <YAxis yAxisId={"right"} orientation={"right"} domain={[0, 100]} />
                <Tooltip label={'sec'} />
                <Line
                    yAxisId={"right"}
                    type={"monotone"}
                    dataKey={"mistakes"}
                    unit={"%"}
                    stroke={"red"}
                    dot={{ r: 0 }}
                    activeDot={{ r: 5 }}
                />
                <Line
                    yAxisId={"left"}
                    type={"monotone"}
                    dataKey={"speed"}
                    unit={" signs/minute"}
                    stroke={"dodgerblue"}
                    dot={{ r: 0 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

Chart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            seconds: PropTypes.number.isRequired,
            speed: PropTypes.number.isRequired,
            mistakes: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
};

export default Chart;
