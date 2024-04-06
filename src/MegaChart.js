import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MegaChart = ({ data }) => {
  const svgRef = useRef(null);
  let lastValidData = {};
  
  useEffect(() => {
    if (data && data.length) {

    const width = 400;
    const height = 300;
    const margin = { top: 0, right: 0, bottom: 0, left: 100 };
    const tooltipWidth = 160; 
    const tooltipHeight = 80;

    const svg = d3.select(svgRef.current)
                  .attr("width", width)
                  .attr("height", height);

    const parseDate = d3.timeParse("%Y-%m-%d");

    data.forEach(d => {
        d.date = parseDate(d.Date);
        d.incoming = +d.Incoming;
        // d.outgoing = -Math.abs(+d.Outgoing);
        d.outgoing = +d.Outgoing; 
        d.balance = +d.Balance;
    });
                  
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date)) 
        .range([margin.left, width - margin.right])

    const yLeftScale = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.outgoing),
        d3.max(data, d => d.incoming)
      ])
      .range([height - margin.bottom, margin.top]);

    const yRightScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.balance))
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b %d")))
      .selectAll("text")
      .style("fill", "white");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yLeftScale))
      .selectAll("text")
      .style("fill", "white");

    svg.append("g")
      .attr("transform", `translate(${width - margin.right},0)`)
      .call(d3.axisRight(yRightScale))
      .selectAll("text")
      .style("fill", "white");

    const focusLineGroup = svg.append('g')
    .attr('class', 'focus-line-group')
    .style('display', 'none');

    focusLineGroup.append('line')
      .attr('class', 'focus-line')
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    const focusCircleGroup = svg.append('g')
      .attr('class', 'focus-circle-group')
      .style('display', 'none');

    focusCircleGroup.append('circle')
      .attr('r', 4.5)
      .attr('class', 'circle incoming')
      .style('fill', '#7a88f2')
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    focusCircleGroup.append('circle')
      .attr('r', 4.5)
      .attr('class', 'circle outgoing')
      .style('fill', '#89d0ca')
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    focusCircleGroup.append('circle')
      .attr('r', 4.5)
      .attr('class', 'circle balance')
      .style('fill', '#c8a837')
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    const timeRange = d3.extent(data, d => d.date);
    const timeDiff = timeRange[1] - timeRange[0];
    const averageTimeDiff = timeDiff / (data.length - 1);
    const barWidth = Math.max(1, (width - margin.left - margin.right) / data.length - 1);

    svg.selectAll(".bar.incoming")
    .data(data)
    .enter()
    .append("rect")
  .attr("class", "bar incoming")
  .attr("x", d => xScale(d.date) - barWidth / 2)
  .attr("y", d => Math.min(yLeftScale(0), yLeftScale(d.incoming)))
  .attr("width", barWidth)
  .attr("padding", 0)
  .attr("height", d => Math.abs(yLeftScale(d.incoming) - yLeftScale(0)))
  .attr("fill", "#7a88f2");
      
    svg.selectAll(".bar.outgoing")
      .data(data)
      .enter()
      .append("rect")
        .attr("class", "bar outgoing")
        .attr("x", d => xScale(d.date) - barWidth / 2)
        .attr("y", yLeftScale(0))
        .attr("width", barWidth)
        .attr("height", d => Math.abs(yLeftScale(d.outgoing) - yLeftScale(0))) 
        .attr("fill", "#8acfcb");
      
      const lineGenerator = d3.line()
        .x(d => xScale(d.date))
        .y(d => yRightScale(d.balance))
        .curve(d3.curveMonotoneX);
      
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 2);

      const legends = ["Incoming", "Outgoing", "Balance"];
      const colors = ["#7a88f2", "#89d0ca", "#c8a837"];
      const legend = svg.selectAll(".legend")
          .data(legends)
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", (d, i) => `translate(${i * 100 + 20},${height + 40})`);

      legend.append("rect")
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", (d, i) => colors[i]);

      legend.append("text")
          .attr("x", 15)
          .attr("y", 10)
          .text(d => d)
          .style("fill", "white")
          .attr("text-anchor", "start")
          .style("alignment-baseline", "middle");

        const tooltip = svg.append("g")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("pointer-events", "none")
          .style("position", "absolute")
          .style("background", "white")
          .style("border", "1px solid #ccc")
          .style("border-radius", "5px")
          .style("padding", "5px");

        function onMouseMove(event) {
          const [x, y] = d3.pointer(event);
          // const [x] = d3.pointer(event, svg.node());
          const hoverDate = xScale.invert(x);

          const index = d3.bisector(d => d.date).left(data, hoverDate, 1);
          const a = data[index - 1];
          const b = data[index];
          const closestData = b && (hoverDate - a.date > b.date - hoverDate) ? b : a;
      
          if (closestData && !isNaN(closestData.incoming) && !isNaN(closestData.outgoing)  && !isNaN(closestData.balance) && closestData.date) {
            if (Object.keys(lastValidData).length !== 0) {
              updateTooltipContent(lastValidData, x, y);
            }
          } 
          
          else {
            tooltip.style("opacity", 0);
            focusLineGroup.style('display', 'none');
            focusCircleGroup.style('display', 'none');
            // lastValidData = closestData; 
            // updateTooltipContent(closestData, x, y);
          }
  

          const tooltipX = Math.min(width - 140, x); 
          const tooltipY = Math.min(height - 100, yLeftScale(Math.max(closestData.incoming, closestData.outgoing, 0))) - 10;
      
          focusLineGroup.style('display', null).attr('transform', `translate(${xScale(closestData.date)},0)`);
          focusCircleGroup.selectAll('circle')
            .data(['incoming', 'outgoing', 'balance'])
            .attr('cy', d => {
              if (d === 'incoming') return yLeftScale(closestData.incoming);
              if (d === 'outgoing') return yLeftScale(closestData.outgoing);
              if (d === 'balance') return yRightScale(closestData.balance);
            });
      
          updateTooltipContent(closestData, xScale(closestData.date), yLeftScale(Math.max(closestData.incoming, closestData.outgoing)));
      }

      function updateTooltipContent(data, xPosition, yPosition) {

        const tooltipX = xPosition - tooltipWidth - 10; 
        const tooltipY = yPosition;
  
        const adjustedX = Math.max(margin.left, Math.min(tooltipX, width - margin.right - tooltipWidth));
        const adjustedY = Math.max(margin.top, Math.min(tooltipY, height - margin.bottom));

          tooltip.style("opacity", 1)
                 .attr("transform", `translate(${xPosition}, 200)`);
      
          tooltip.select('.date').text(`${d3.timeFormat("%b %d, %Y")(data.date)}`);
          tooltip.select('.incoming').text(`Incoming: ${data.incoming}`);
          tooltip.select('.outgoing').text(`Outgoing: ${data.outgoing}`);
          tooltip.select('.balance').text(`Balance: ${data.balance}`);
      }

        function onMouseOver(event, d) {
          const [x, y] = d3.pointer(event, svg.node()); 
          focusLineGroup.style('display', null).attr('transform', `translate(${xScale(d.date)},0)`);
          focusCircleGroup.style('display', null).attr('transform', `translate(${xScale(d.date)},0)`);


          focusLineGroup.attr('transform', `translate(${x},0)`);
          focusCircleGroup.attr('transform', `translate(${x},0)`);
          focusCircleGroup.select('.circle.incoming').attr('cy', yLeftScale(d.incoming));
          focusCircleGroup.select('.circle.outgoing').attr('cy', yLeftScale(d.outgoing));
          focusCircleGroup.select('.circle.balance').attr('cy', yRightScale(d.balance));

          tooltip
            .style("opacity", 1)
            .attr("transform", `translate(${x + 10},${y - 10})`); 

          tooltip.selectAll("text").remove(); 
          tooltip.selectAll("rect").remove(); 
        
          tooltip.append("rect")
            .attr("x", 0)
            .attr("y", -40)
            .attr("width", 120)
            .attr("height", 60)
            .attr("fill", "white")
            .style("opacity", 0.7);
        
          tooltip.append("text")
            .attr("x", 5)
            .attr("y", -20)
            .text(`${d3.timeFormat("%d %B, %Y")(d.date)}`)
            .attr("font-size", "12px");
        
          tooltip.append("text")
            .attr("x", 5)
            .attr("y", -5)
            .text(`Incoming: ${d.incoming}B`)
            .attr("font-size", "12px");
        
          tooltip.append("text")
            .attr("x", 5)
            .attr("y", 10)
            .text(`Outgoing: ${d.outgoing}B`)
            .attr("font-size", "12px");
        
          tooltip.append("text")
            .attr("x", 5)
            .attr("y", 25)
            .text(`Balance: ${d.balance}B`)
            .attr("font-size", "12px");

            tooltip.attr('transform', `translate(${x - 60},${yLeftScale(Math.max(d.incoming, d.outgoing)) - 80})`);
        }
      
        function onMouseOut(event, d) {
          focusLineGroup.style('display', 'none');
          focusCircleGroup.style('display', 'none');

          tooltip.style("opacity", 0); 
        }

        svg.on("mousemove", onMouseMove)
          .on("mouseleave", function() {
              tooltip.style("opacity", 0);
              focusLineGroup.style('display', 'none');
              focusCircleGroup.style('display', 'none');
          });
    
        svg.selectAll(".bar")
          .on("mouseover", onMouseOver)
          .on("mouseout", onMouseOut);
        
        svg.selectAll(".line")
          .on("mouseover", onMouseOver)
          .on("mouseout", onMouseOut);
    }

  }, [data]); 

  return (
    <>
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>
    </>
    );
}

export default MegaChart;