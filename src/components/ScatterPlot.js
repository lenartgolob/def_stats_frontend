import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
    const svgRef = useRef();
  
    useEffect(() => {
      // Access the SVG element using the ref
      const svg = d3.select(svgRef.current);
  
      // Define margins and dimensions for the plot
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      // Filter out data points with 0 values for pdef and rdef
      const filteredData = data.filter(d => d.pdef !== 0 && d.rdef !== 0);

      // Add some padding to the scales
      const padding = 0.1;
    
      // Create scales for x and y axes using the smallest non-zero values to the largest values with padding
      const xScale = d3.scaleLinear().domain([d3.min(filteredData, d => d.pdef) - padding, d3.max(data, d => d.pdef) + padding]).range([0, width]);
      const yScale = d3.scaleLinear().domain([d3.min(filteredData, d => d.rdef) - padding, d3.max(data, d => d.rdef) + padding]).range([height, 0]);

      // Add x-axis
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
        .call(d3.axisBottom(xScale));
  
      // Add y-axis
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale));
  
      // Add circles for each data point
      svg
        .selectAll('circle')
        .data(filteredData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.pdef) + margin.left)
        .attr('cy', d => yScale(d.rdef) + margin.top)
        .attr('r', 5)
        .style('fill', 'blue'); // Change the color as needed
  
    }, [data]);
  
    return (
      <svg ref={svgRef} width={600} height={400}>
        {/* SVG content will be rendered here */}
      </svg>
    );
  };
  
  export default ScatterPlot;
  