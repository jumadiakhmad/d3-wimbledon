/* global d3 */

// Our canvas
// var width = 800, height = 500;

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

function draw(words) {
  // Draw your data here...
  d3.select("#top-score").append("svg")
    .attr('width', 800)
    .attr('height', 500)
    .append("g")
    .attr("transform", "translate(" + 750/2 + "," + 500/2  + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", (d) =>  { return d.size + "px"; })
    .style("font-family", "Monospace")
    .style("fill", (d, i) => { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", (d) => {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text((d) => { return d.text; });
}

const load = () => {
  // Load your data here...
  d3.tsv('afcw-results.tsv', (rows) => {
    console.log('ini data rows', rows);
    // draw(layout.words)
    d3.layout.cloud()
      .size([750, 500])
      .words(rows.map(function(d) {
        return {text: d.Opponent, size: 10 + Math.random() * 90};
      }))
      .padding(5)
      .rotate(function() { return (Math.random() * 20) * 150; })
      .font("Monospace")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
  })
}

load()
