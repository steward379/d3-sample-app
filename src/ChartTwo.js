import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartTwo = ({ aapl }) => {
    const svgRef = useRef();

    useEffect(() => {
      const totalAmount = aapl.reduce((acc, curr) => acc + curr.Transactions, 0);

      const today = new Date();
      const processedData = aapl
        .filter(d => new Date(d.Date) <= today)
        .sort((a, b) => new Date(b.Date) - new Date(a.Date))
        .slice(0, 7)
        .map(d => ({
          ...d,
          Date: new Date(d.Date),
          Day: new Date(d.Date).toLocaleDateString('en-US', { weekday: 'long' })
        }));

      const sortedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        .filter(day => processedData.some(d => d.Day === day));

      const svg = d3.select(svgRef.current);
      const width = 300;
      const height = 200;
      const margin = { top: 20, right: 20, bottom: 60, left: 40}; 
      const barPadding = 0.05; 
      const barWidth = 10; 

      // const xScale = d3.scalePoint()
      //   .domain(sortedDays)
      //   .range([margin.left, width - margin.right])
      //   .padding(barPadding);

      const xScale = d3.scaleBand()
        .domain(sortedDays)
        .range([margin.left, width - margin.right])
        .paddingInner(0.1) 
        .paddingOuter(0.1); 

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(processedData, d => d.Transactions)])
        .range([height - margin.bottom, margin.top]);

      svg.selectAll("*").remove();

      svg.append("g")
        .selectAll("rect.bg")
        .data(sortedDays)
        .join("rect")
        .attr("class", "bg")
        .attr("x", d => xScale(d))
        .attr("y", margin.top)
        .attr("height", height - margin.bottom - margin.top)
        .attr("width", 10) 
        .attr("fill", "#ccc")
        .attr("rx", 5) 
        .attr("ry", 5); 

      svg.append("g")
        .selectAll("rect.fg")
        .data(processedData)
        .join("rect")
        .attr("class", "fg")
        .attr("x", d => xScale(d.Day))
        .attr("y", d => yScale(d.Transactions))
        .attr("height", d => height - margin.bottom - yScale(d.Transactions))
        .attr("width", 10) 
        .attr("rx", 5) 
        .attr("ry", 5) 
        .attr("fill", "#3b6ab3");

      svg.append("text")
        .attr("x", 7)
        .attr("y", 180)
        .text("Last 7 days")
        .style("font-size", "14px")
        .attr("fill", "black");

      svg.append("text")
        .attr("x", 5)
        .attr("y", 200)
        .text(`$${totalAmount.toLocaleString()}`)
        .style("font-size", "14px")
        .attr("fill", "black")
        .attr("font-weight", "bold");

      svg.append("circle")
        .attr("cx", 92)
        .attr("cy", 176)
        .attr("r", 8)
        .style("fill", "lightgrey");

      svg.append("text")
        .attr("x", 90)
        .attr("y", 180)
        .text("i")
        .style("font-size", "12px")
        .attr("fill", "black");

      svg.append("g")
        .attr("transform", `translate(5 ,${height - margin.bottom + 15})`)
        .selectAll("text")
        .data(sortedDays)
        .join("text")
        .attr("x", d => xScale(d))
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text(d => d[0]);

    }, [aapl]); 

    return <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>;
};

export default ChartTwo;
