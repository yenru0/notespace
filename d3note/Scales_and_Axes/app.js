const Width = 500, Height = 500;

const svg = d3.select("#main")
    .append("svg")
    .attr("width", Width)
    .attr("height", Height)
;

d3.select("#main").append("div").attr("id", "main_form")

d3.select("#main_form").append("button")
    .html("Change")
    .on("click", function () {
        let mu = d3.select("#mu").property("value"), sigma = d3.select("#sigma").property("value");
        console.log(sigma)
        update(mu, sigma);
    })

d3.select("#main_form").append("div")
    .attr("id", "main_form_mu")
    .attr("class", "subform")
d3.select("#main_form").append("div")
    .attr("id", "main_form_sigma")
    .attr("class", "subform")

d3.select("#main_form_mu").append("label")
    .attr("for", "mu")
    .html("mu")
d3.select("#main_form_mu").append("input")
    .attr("type", "number")
    .attr("id", "mu")
    .attr("name", "mu")
    .attr("value", "25")

d3.select("#main_form_sigma").append("sigma")
    .attr("for", "sigma")
    .html("sigma")
d3.select("#main_form_sigma").append("input")
    .attr("type", "number")
    .attr("id", "sigma")
    .attr("name", "sigma")
    .attr("value", "5")


const margin = {left: 30, top: 10, right: 10, bottom: 30};

let Xscale = d3.scaleLinear().domain([0, 50]).range([margin.left, Width - margin.right]);
let Yscale = d3.scaleLinear().domain([0, 50]).range([Height - margin.bottom, margin.top]);

svg.append('g').call(d3.axisBottom(Xscale))
    .attr('transform', `translate(0, ${Height - margin.bottom})`);
svg.append('g').call(d3.axisLeft(Yscale))
    .attr('transform', `translate(${margin.left},0)`);

var data;
var link;
function init(mu, sigma) {
    data = d3.range(1000)
        .map(function (x) {
            return {x: d3.randomNormal(mu, sigma)(x), y: d3.randomNormal(mu, sigma)(x)}
        });
    svg.append("g").attr("class", "link").selectAll("line").data(d3.range(1000)).enter().append("line").attr("stroke-width", 2).style("stroke", "black");
    svg.selectAll('circle').data(data).enter().append('circle')
        .attr('cx', d => Xscale(d.x)).attr('cy', d => Yscale(d.y))
        .attr('r', 3).attr('fill', 'red');
}

function update(mu, sigma) {
    data = d3.range(1000)
        .map(function (x) {
            return {x: d3.randomNormal(mu, sigma)(x), y: d3.randomNormal(mu, sigma)(x)}
        })

    for(let i=0;i<1000;i++) {

    }

    svg.selectAll('circle').data(data).transition().duration(1000)
        .attr('cx', d => Xscale(d.x)).attr('cy', d => Yscale(d.y))
        .attr('r', 3).attr('fill', 'red');
}

init(25, 6);