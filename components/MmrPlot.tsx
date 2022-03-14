import { extent, scaleLinear, timeParse } from 'd3';
import styles from '../styles/MmrPlot.module.css';

const MmrPlot = ({ data }: any) => {
    const width = 800;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 60, left: 220 };
    const innerWidth: number = width - margin.right - margin.left;
    const innerHeight: number = height - margin.top - margin.bottom;

    console.log(data);

    const xValue: any = (d: any) => d.date_raw;
    const yValue: any = (d: any) => d.elo;

    const xValExtent: any = extent(data, xValue);
    const yValExtent: any = extent(data, yValue);

    const xScale: any = scaleLinear()
        .domain(xValExtent) //
        .range([0, innerWidth]);

    const yScale: any = scaleLinear()
        .domain(yValExtent)
        .range([innerHeight, 0]);

    const marks: any = data.map((d: any, i: number) => (
        <circle
            key={i}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={5}
        ></circle>
    ));

    const xScaleMarks = xScale.ticks().map((tickValue: number) => (
        <g
            className={styles.tick}
            key={tickValue + 'group'}
            transform={`translate(${xScale(tickValue)}, 0)`}
        >
            <line y2={innerHeight} key={tickValue + 'line'} />
            <text
                key={tickValue + 'text'}
                style={{ textAnchor: 'middle' }}
                dy={'0.71em'}
                y={innerHeight + 3}
            >
                {/* TODO: Format x axis labels better */}
                {/* {timeParse('%s')(tickValue.toString()).toString()} */}
                {tickValue}
            </text>
        </g>
    ));

    const yScaleMarks = yScale.ticks().map((tickValue: number) => (
        <g
            className={styles.tick}
            key={tickValue + 'group'}
            transform={`translate(0, ${yScale(tickValue)})`}
        >
            <line x2={innerWidth} key={tickValue + 'line'} />
            <text
                key={tickValue}
                style={{ textAnchor: 'end' }}
                dy={'0.32em'}
                x={'-9'}
            >
                {tickValue}
            </text>
        </g>
    ));

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {xScaleMarks}
                {yScaleMarks}
                {marks}
            </g>
        </svg>
    );
};

export default MmrPlot;
