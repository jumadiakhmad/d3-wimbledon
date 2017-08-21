/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40
padding = 20

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width )
  .attr('height', height)
  .style('background', 'rgb(226, 220, 216)')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
      let hasil = rows.map(data => {
          console.log('ini hasil score' ,data.GoalsScored);
          return data.GoalsScored;
        })
        redraw(hasil)
    })
}
// redraw function
let redraw = (data) => {

  // Your data to graph here
  const  colorScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range(['blue', 'red'])

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, height ])


  const yAxis = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height , 0])

  const xAxis = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, width])

  const xScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0])



  let barWidth = width/data.length;

var myTransition =  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * barWidth + marginLeft
    })
    .attr('y', (d) => {
      return height -  yScale(d) - marginLeft
    })
    .attr('width', barWidth - 2 )
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('fill', colorScale)
    .on('mouseover', function(d,i){
      d3.select(this).style('fill', '#55da66')
    })
    .on('mouseout', function(d,i){
      d3.select(this).style('fill', colorScale(d))
    })


  svg.append('g')
    .attr('class', 'yAxis')
    .attr('transform', `translate(${marginLeft}, ${-40})`)
    .call(d3.axisLeft(yAxis).ticks(d3.max(data)))
  svg.append('g')
    .attr('class', 'yAxis')
    .attr('transform', `translate(${marginLeft }, ${height - 40})`)
    .call(d3.axisBottom(xAxis).ticks(data.length))

  // var myTransition.transition()
  //   .attr('height', (d) => {
  //     return yScale(d)
  //   })
  //   .attr('y', (d) +> {
  //     return height - yScale(d)
  //   })
}

reload()
