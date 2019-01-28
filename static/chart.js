//



$(document).ready(function() {
var url = 'http://localhost:5000/get_chart_data'

$.getJSON(url, function( response ) {

var data = response;


console.log(data);

var margin = {top: 20, right: 50, bottom: 35, left: 30};

var width = 1280 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

//var data = [{"DATE":"2019-01-05T09:00:00.000Z","label1":"6","OTHERS":"95","label2":"5","label3":"4","label4":"4","label5":"4","label6":"4","label7":"4","label8":"4","label9":"3","label10":"3"},{"DATE":"2019-01-05T10:00:00.000Z","label1":"8","OTHERS":"143","label2":"6","label3":"6","label4":"5","label5":"5","label6":"5","label7":"5","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-05T11:00:00.000Z","label1":"6","OTHERS":"168","label2":"6","label3":"5","label4":"5","label5":"5","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-05T12:00:00.000Z","label1":"7","OTHERS":"167","label2":"6","label3":"5","label4":"5","label5":"5","label6":"5","label7":"5","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-05T13:00:00.000Z","label1":"8","OTHERS":"143","label2":"6","label3":"6","label4":"6","label5":"5","label6":"5","label7":"5","label8":"5","label9":"5","label10":"4"},{"DATE":"2019-01-05T14:00:00.000Z","label1":"5","OTHERS":"160","label2":"5","label3":"5","label4":"5","label5":"5","label6":"5","label7":"5","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-05T15:00:00.000Z","label1":"6","OTHERS":"171","label2":"6","label3":"6","label4":"5","label5":"4","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-05T16:00:00.000Z","label1":"7","OTHERS":"149","label2":"5","label3":"5","label4":"4","label5":"4","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-05T17:00:00.000Z","label1":"6","OTHERS":"164","label2":"5","label3":"5","label4":"5","label5":"5","label6":"5","label7":"5","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-05T18:00:00.000Z","label1":"4","OTHERS":"57","label2":"3","label3":"3","label4":"3","label5":"3","label6":"2","label7":"2","label8":"2","label9":"2","label10":"2"},{"DATE":"2019-01-05T19:00:00.000Z","label1":"4","OTHERS":"6","label2":"4","label3":"3","label4":"3","label5":"3","label6":"3","label7":"2","label8":"2","label9":"2","label10":"2"},{"DATE":"2019-01-05T20:00:00.000Z","label1":"4","OTHERS":"6","label2":"4","label3":"3","label4":"3","label5":"3","label6":"2","label7":"2","label8":"2","label9":"2","label10":"2"},{"DATE":"2019-01-05T21:00:00.000Z","label1":"6","OTHERS":"9","label2":"4","label3":"3","label4":"3","label5":"3","label6":"3","label7":"3","label8":"3","label9":"3","label10":"2"},{"DATE":"2019-01-05T22:00:00.000Z","label1":"5","OTHERS":"8","label2":"4","label3":"4","label4":"3","label5":"3","label6":"3","label7":"3","label8":"3","label9":"3","label10":"2"},{"DATE":"2019-01-05T23:00:00.000Z","label1":"5","OTHERS":"5","label2":"5","label3":"4","label4":"4","label5":"4","label6":"2","label7":"2","label8":"2","label9":"2","label10":"1"},{"DATE":"2019-01-06T00:00:00.000Z","label1":"5","OTHERS":"1","label2":"4","label3":"4","label4":"4","label5":"4","label6":"3","label7":"2","label8":"2","label9":"2","label10":"1"},{"DATE":"2019-01-06T01:00:00.000Z","label1":"5","OTHERS":"2","label2":"4","label3":"3","label4":"3","label5":"2","label6":"2","label7":"2","label8":"2","label9":"2","label10":"2"},{"DATE":"2019-01-06T02:00:00.000Z","label1":"5","OTHERS":"1","label2":"5","label3":"4","label4":"3","label5":"3","label6":"3","label7":"3","label8":"2","label9":"2","label10":"1"},{"DATE":"2019-01-06T03:00:00.000Z","label1":"4","OTHERS":"2","label2":"3","label3":"3","label4":"3","label5":"3","label6":"2","label7":"1","label8":"1","label9":"1","label10":"1"},{"DATE":"2019-01-06T04:00:00.000Z","label1":"7","OTHERS":"2","label2":"4","label3":"4","label4":"3","label5":"3","label6":"3","label7":"2","label8":"2","label9":"2","label10":"1"},{"DATE":"2019-01-06T05:00:00.000Z","label1":"4","OTHERS":"1","label2":"3","label3":"3","label4":"3","label5":"3","label6":"3","label7":"3","label8":"2","label9":"2","label10":"1"},{"DATE":"2019-01-06T06:00:00.000Z","label1":"5","OTHERS":"2","label2":"4","label3":"4","label4":"4","label5":"3","label6":"3","label7":"2","label8":"2","label9":"1","label10":"1"},{"DATE":"2019-01-06T07:00:00.000Z","label1":"5","OTHERS":"2","label2":"5","label3":"4","label4":"4","label5":"3","label6":"3","label7":"3","label8":"2","label9":"1","label10":"1"},{"DATE":"2019-01-06T08:00:00.000Z","label1":"4","OTHERS":"70","label2":"4","label3":"3","label4":"3","label5":"3","label6":"2","label7":"2","label8":"2","label9":"2","label10":"2"},{"DATE":"2019-01-06T09:00:00.000Z","label1":"8","OTHERS":"156","label2":"6","label3":"6","label4":"6","label5":"5","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-06T10:00:00.000Z","label1":"5","OTHERS":"166","label2":"5","label3":"5","label4":"5","label5":"5","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-06T11:00:00.000Z","label1":"7","OTHERS":"153","label2":"6","label3":"6","label4":"6","label5":"6","label6":"5","label7":"5","label8":"5","label9":"5","label10":"4"},{"DATE":"2019-01-06T12:00:00.000Z","label1":"7","OTHERS":"170","label2":"7","label3":"6","label4":"6","label5":"5","label6":"5","label7":"5","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-06T13:00:00.000Z","label1":"7","OTHERS":"158","label2":"6","label3":"6","label4":"5","label5":"5","label6":"5","label7":"5","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-06T14:00:00.000Z","label1":"7","OTHERS":"156","label2":"7","label3":"6","label4":"5","label5":"5","label6":"5","label7":"5","label8":"5","label9":"4","label10":"4"},{"DATE":"2019-01-06T15:00:00.000Z","label1":"9","OTHERS":"153","label2":"8","label3":"7","label4":"6","label5":"6","label6":"6","label7":"5","label8":"5","label9":"4","label10":"4"},{"DATE":"2019-01-06T16:00:00.000Z","label1":"7","OTHERS":"155","label2":"6","label3":"6","label4":"5","label5":"5","label6":"5","label7":"5","label8":"5","label9":"4","label10":"4"},{"DATE":"2019-01-06T17:00:00.000Z","label1":"7","OTHERS":"145","label2":"6","label3":"5","label4":"5","label5":"5","label6":"5","label7":"5","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-06T18:00:00.000Z","label1":"5","OTHERS":"52","label2":"3","label3":"3","label4":"3","label5":"3","label6":"3","label7":"2","label8":"2","label9":"2","label10":"2"},{"DATE":"2019-01-06T19:00:00.000Z","label1":"5","OTHERS":"8","label2":"5","label3":"5","label4":"4","label5":"3","label6":"3","label7":"3","label8":"3","label9":"3","label10":"3"},{"DATE":"2019-01-06T20:00:00.000Z","label1":"5","OTHERS":"9","label2":"4","label3":"4","label4":"4","label5":"4","label6":"3","label7":"3","label8":"3","label9":"3","label10":"2"},{"DATE":"2019-01-06T21:00:00.000Z","label1":"4","OTHERS":"8","label2":"4","label3":"3","label4":"3","label5":"3","label6":"3","label7":"3","label8":"3","label9":"3","label10":"3"},{"DATE":"2019-01-06T22:00:00.000Z","label1":"6","OTHERS":"2","label2":"3","label3":"3","label4":"2","label5":"2","label6":"2","label7":"1","label8":"1","label9":"1","label10":"1"},{"DATE":"2019-01-06T23:00:00.000Z","label1":"7","OTHERS":"7","label2":"5","label3":"5","label4":"4","label5":"3","label6":"3","label7":"3","label8":"2","label9":"2","label10":"2"},{"DATE":"2019-01-07T00:00:00.000Z","label1":"4","OTHERS":"114","label2":"4","label3":"4","label4":"4","label5":"4","label6":"3","label7":"3","label8":"3","label9":"3","label10":"3"},{"DATE":"2019-01-07T01:00:00.000Z","label1":"6","OTHERS":"225","label2":"6","label3":"5","label4":"5","label5":"4","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-07T02:00:00.000Z","label1":"5","OTHERS":"228","label2":"5","label3":"5","label4":"5","label5":"5","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-07T03:00:00.000Z","label1":"6","OTHERS":"216","label2":"6","label3":"6","label4":"5","label5":"4","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-07T04:00:00.000Z","label1":"7","OTHERS":"228","label2":"6","label3":"6","label4":"5","label5":"5","label6":"5","label7":"5","label8":"5","label9":"5","label10":"4"},{"DATE":"2019-01-07T05:00:00.000Z","label1":"6","OTHERS":"225","label2":"6","label3":"5","label4":"5","label5":"5","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-07T06:00:00.000Z","label1":"8","OTHERS":"228","label2":"6","label3":"5","label4":"5","label5":"4","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-07T07:00:00.000Z","label1":"7","OTHERS":"219","label2":"6","label3":"6","label4":"6","label5":"5","label6":"5","label7":"5","label8":"5","label9":"5","label10":"5"},{"DATE":"2019-01-07T08:00:00.000Z","label1":"6","OTHERS":"454","label2":"4","label3":"4","label4":"3","label5":"3","label6":"3","label7":"3","label8":"3","label9":"3","label10":"2"},{"DATE":"2019-01-07T09:00:00.000Z","label1":"6","OTHERS":"1825","label2":"6","label3":"5","label4":"5","label5":"5","label6":"5","label7":"4","label8":"4","label9":"4","label10":"4"},{"DATE":"2019-01-07T10:00:00.000Z","label1":"6","OTHERS":"1307","label2":"5","label3":"5","label4":"5","label5":"5","label6":"4","label7":"4","label8":"4","label9":"4","label10":"4"}]
//console.log(data);

var format = d3.time.format("%Y-%m-%dT%H");


// Transpose the data into layers
var dataset = d3.layout.stack()(["label1", "OTHERS", "label2", "label3", "label4", "label5", "label6", "label7", "label8", "label9", "label10"].map(function(fruit) {
  return data.map(function(d) {
     d.DATE = d.DATE.substr(0,13)
    return {x: format.parse(d.DATE), y: +d[fruit]};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#DAF7A6", "#581845", "#900C3F", "#FFC300", "#FF5733", "#3368FF", "#8333FF"];


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
  .tickFormat(d3.time.format("%H"));

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

var dataLength = data.length;
document.getElementById("info").innerHTML = '<div>' + data[0]['DATE'] + ' - ' + data[50-1]['DATE'] + '</div>';

}).error(function() { document.getElementById("info").innerHTML = "<h2>Server is not reachable, try after sometime</h2>" })
});
