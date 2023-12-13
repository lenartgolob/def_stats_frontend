import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Access the SVG element using the ref
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    // Define margins and dimensions for the plot
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 900 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Filter out data points with 0 values for pdef and rdef
    const filteredData = data.filter(d => d.pdef !== 0 && d.rdef !== 0);

    // Add some padding to the scales
    const padding = 0.2;

    // Create scales for y and x axes using the smallest non-zero values to the largest values with padding
    const yScale = d3.scaleLinear().domain([d3.min(filteredData, d => d.pdef) - padding, d3.max(data, d => d.pdef) + padding]).range([height, 0]);
    const xScale = d3.scaleLinear().domain([d3.min(filteredData, d => d.rdef) - padding, d3.max(data, d => d.rdef) + padding]).range([0, width]);

    // Add y-axis with label
    svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left)
    .attr('x', -height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('PDEF');

    // Add x-axis with label
    svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', margin.bottom - 10)
    .style('text-anchor', 'middle')
    .text('RDEF');

    // ...

    // Add circles with images for each non-zero data point
    svg
    .selectAll('image')
    .data(filteredData)
    .enter()
    .append('image')
    .attr('x', d => xScale(d.rdef) + margin.left - 12) // Adjust positioning as needed
    .attr('y', d => yScale(d.pdef) + margin.top - 12) // Adjust positioning as needed
    .attr('width', 55) // Adjust the width of the image
    .attr('height', 55) // Adjust the height of the image
    .attr('xlink:href', d => `../player-images/${d.NbaPlayerId}_cropped.png`)
    .on('mouseover', (event, d) => {
        // Show player name on hover with a background rectangle
        svg.append('rect')
        .attr('id', 'tooltip-bg')
        .attr('x', xScale(d.rdef) + margin.left + 5)
        .attr('y', yScale(d.pdef) + margin.top - 20)
        .attr('width', d.player.length * 7) // Adjust the width based on the text length
        .attr('height', 20)
        .attr('fill', 'rgba(255, 255, 255, 0.8)'); // Semi-transparent white background

        svg.append('text')
        .attr('id', 'tooltip')
        .attr('x', xScale(d.rdef) + margin.left + 10)
        .attr('y', yScale(d.pdef) + margin.top - 5)
        .text(d.player)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold') // Make the text bold
        .attr('fill', 'black');
    })
    .on('mouseout', () => {
        // Remove the tooltip and background on mouseout
        svg.select('#tooltip').remove();
        svg.select('#tooltip-bg').remove();
    });

  }, [data]);

  return (
    <svg ref={svgRef} width={1000} height={600}></svg>
  );
};

export default ScatterPlot;