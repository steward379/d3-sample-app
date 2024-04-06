import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartOne = ({ aapl }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!aapl.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const width = 400; 
    const height = 200; 
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const x = d3.scaleUtc()
      .domain(d3.extent(aapl, d => new Date(d.Date)))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(aapl, d => d.Transactions)])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(new Date(d.Date)))
      .y(d => y(d.Transactions))
      .curve(d3.curveMonotoneX); 

    svg.attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible");
  
    svg.append("path")
      .datum(aapl)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x)
          .ticks(3) 
          .tickFormat(d3.timeFormat("%b %d")))
      .call(g => g.selectAll(".domain").remove()) 
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(3))
      .call(g => g.select(".domain").remove()) 
      .call(g => g.selectAll(".tick:not(:first-of-type) line").remove()) 
      .call(g => g.selectAll(".tick text").attr("x", -10).attr("dy", -4));
  
      const tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");
      
      tooltip.append("rect")
        .attr("width", 160) 
        .attr("height", 60) 
        .attr("fill", "white")
        .style("opacity", 0.8);
      
      const tooltipText = tooltip.append("text")
        .attr("x", 10)
        .attr("dy", "1.2em")
        .style("text-anchor", "start")
        .attr("font-size", "12px");

      const tooltipCircle = svg.append("circle")
        .attr("r", 20)
        .attr("fill", "grey")
        .style("opacity", 0.5);
      
      function updateTooltip(d) {
        tooltipCircle.style("display", null).attr("cx", x(new Date(d.Date))).attr("cy", y(d.Transactions));

        tooltip.attr("transform", `translate(${x(new Date(d.Date))},${y(d.Transactions)})`);
        tooltip.style("display", null);

        tooltipText.html(""); 

        tooltipText.append("tspan")
          .attr("x", 10)
          .style("font-weight", "bold")
          .text(d3.timeFormat("%A, %B %d, %Y")(new Date(d.Date)));

        tooltipText.append("tspan")
          .attr("x", 10)
          .attr("dy", "1.2em")
          .text(`Transactions: ${d3.format(",")(d.Transactions)}`);

        tooltipText.append("tspan")
          .attr("x", 10)
          .attr("dy", "1.2em")
          .text(`Price: $${d3.format(",.2f")(d.Price)}`);
      }

        svg.on("mousemove", function(event) {
          const [mx, my] = d3.pointer(event);
          const pointerDate = x.invert(mx);
          const bisector = d3.bisector(d => new Date(d.Date)).left;
          const index = bisector(aapl, pointerDate, 1);
          const a = aapl[index - 1];
          const b = aapl[index];
          const d = b && (pointerDate - a.Date > b.Date - pointerDate) ? b : a;
          if (d) {
            updateTooltip(d);
          }
        })
        .on("mouseover", () => {
          tooltip.style("display", null);
          tooltipCircle.style("display", null);
        })
        .on("mouseout", () => {
          tooltip.style("display", "none");
          tooltipCircle.style("display", "none");
        });
            
    }, [aapl]); 
  
    return <svg ref={svgRef} style={{ width: "100%", height: "auto" }}></svg>;
  };
  

export default ChartOne;
