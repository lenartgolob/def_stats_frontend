import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const filteredData = data.filter((d) => d.pdef !== 0 && d.rdef !== 0);

    const padding = 0.2;

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(filteredData, (d) => d.pdef) - padding,
        d3.max(data, (d) => d.pdef) + padding,
      ])
      .range([height, 0]);
    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(filteredData, (d) => d.rdef) - padding,
        d3.max(data, (d) => d.rdef) + padding,
      ])
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale));

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', margin.left - 43)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('PDEF');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale));

    svg
      .append('text')
      .attr('x', width / 2 + margin.left)
      .attr('y', height + margin.top + margin.bottom)
      .style('text-anchor', 'middle')
      .text('RDEF');

    const loadImage = (imageUrl) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });
    };

    const loadImagesBatch = async (batch) => {
      await Promise.all(
        batch.map(async (d) => {
          await loadImage(`../player-images/${d.NbaPlayerId}_cropped.png`);
        })
      );
    };

    const batchSize = 10; // Adjust the batch size as needed

    const loadImages = async () => {
      for (let i = 0; i < filteredData.length; i += batchSize) {
        const batch = filteredData.slice(i, i + batchSize);
        await loadImagesBatch(batch);
      }
    };

    loadImages();


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