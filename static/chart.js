// Setup svg using Bostock's margin convention

var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [
  { date: "2019-01-05", redDelicious: "10", mcintosh: "15", oranges: "9", pears: "6" },
  { date: "2019-01-06", redDelicious: "12", mcintosh: "18", oranges: "9", pears: "4" },
  { date: "2019-01-07", redDelicious: "05", mcintosh: "20", oranges: "8", pears: "2" },
  { date: "2019-01-08", redDelicious: "01", mcintosh: "15", oranges: "5", pears: "4" },
  { date: "2019-01-09", redDelicious: "02", mcintosh: "10", oranges: "4", pears: "2" },
  { date: "2019-01-10", redDelicious: "03", mcintosh: "12", oranges: "6", pears: "3" },
  { date: "2019-01-11", redDelicious: "04", mcintosh: "15", oranges: "8", pears: "1" },
  { date: "2019-01-12", redDelicious: "06", mcintosh: "11", oranges: "9", pears: "4" },
  { date: "2019-01-13", redDelicious: "10", mcintosh: "13", oranges: "9", pears: "5" },
  { date: "2019-01-14", redDelicious: "16", mcintosh: "19", oranges: "6", pears: "9" },
  { date: "2019-01-15", redDelicious: "19", mcintosh: "17", oranges: "5", pears: "7" },
];

var format = d3.time.format("%Y-%m-%d");


// Transpose the data into layers
var dataset = d3.layout.stack()(["redDelicious", "mcintosh", "oranges", "pears"].map(function(fruit) {
  return data.map(function(d) {
    return {x: format.parse(d.date), y: +d[fruit]};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%Y"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);


// Create groups for each series, rects for each segment
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
  });




// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");

tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
