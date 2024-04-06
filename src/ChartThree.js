import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartThree = ({ crypto }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!crypto.length) return;

    d3.select(ref.current).select("svg").remove(); 

    const width = 360;
    const height = 200; 
    const radius = Math.min(width, height) / 4;
    const donutWidth = 20; 
    const legendSpacing = 10; 

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`); 

    const arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    svg.selectAll('path')
      .data(pie(crypto))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color);

    const totalValue = crypto.reduce((acc, cur) => acc + cur.value, 0);
    const infoSvg = d3.select(ref.current).select('svg');
    infoSvg.append('text')
      .attr('x', 20)
      .attr('y', 20)
      .text('Asset')
      .style('font-size', '16px');

    infoSvg.append('text')
      .attr('x', 20)
      .attr('y', 40)
      .text(`$${totalValue.toLocaleString()}`)
      .style('font-size', '16px')
      .style('font-weight', 'bold');

    let legendX = 0; 
    crypto.forEach((d, i) => {
      infoSvg.append('rect')
        .attr('x', legendX)
        .attr('y', height - 30)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', d.color);

      legendX += 18; 

      infoSvg.append('text')
        .attr('x', legendX + 5)
        .attr('y', height - 15)
        .text(d.name)
        .style('font-size', '14px')
        .each(function() {
          legendX += this.getBBox().width + legendSpacing;
        });
    });
  }, [crypto]);

  return <div ref={ref}></div>;
};

export default ChartThree;
