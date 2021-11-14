var width, height;
var svg = d3.select("#main").append("svg");
const margin = {left: 30, top: 10, right: 10, bottom: 30};

function draw() {
    var width = window.innerWidth, height = window.innerHeight;

    svg
        .attr("width", width)
        .attr("height", height)
    ;

    var scaleX = d3.scaleLinear().domain([0, 1000]).range([margin.left, width - margin.right]);
    var scaleY = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

    var data;
    data = d3.range(1000).map(function (x) {
        return 0.5
    });

    svg.append("path")
        .attr("class", "mypath")
        .datum(data)
        .attr("fill", "#69b3a2")
        .attr("opacity", ".8")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.line()
            .curve(d3.curveBasis)
            .x(function (d, i) {
                return scaleX(i);
            })
            .y(function (d, i) {
                return scaleY(d);
            })
        );

}

function update() {
    svg.select(".mypath").datum(data).transition().duration(10)
        .attr("d", d3.line()
            .curve(d3.curveBasis)
            .x(function (d, i) {

                return scaleX(i);
            })
            .y(function (d, i) {
                return scaleY(d);
            })
        );
}

/*
var t = d3.timer(function(e) {
    data.shift();
    data.push(d3.mouse(this)[1]/height);
    update();
}, 200)
*/

var downing = false;

svg.on("mousedown", () => {
    downing = true;
});
svg.on("mouseup", () => {
    downing = false;
})
svg.on("mousemove", (e) => {
    if (downing) {
        data.shift();
        data.push((height-d3.pointer(e)[1]) / height);
        update();
    }
})

function updateWindow(){

}

d3.select(window).on('resize', updateWindow);
