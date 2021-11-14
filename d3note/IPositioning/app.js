let width, height;
let svg = d3.select("#main").append("svg");
const margin = {left: 30, top: 10, right: 10, bottom: 30};

let data;
let scaleX = d3.scaleLinear();
let scaleY = d3.scaleLinear();

function init() {
    svg.append("path").attr("class", "mypath");
    data = d3.range(1000).map(function (x) {
        return 0.5
    });
}

function draw() {
    width = window.innerWidth; height = window.innerHeight;

    svg
        .attr("width", width)
        .attr("height", height)
    ;

    scaleX.domain([0, 1000]).range([margin.left, width - margin.right]);
    scaleY.domain([0, 1]).range([height - margin.bottom, margin.top]);

    svg.select(".mypath")
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
/*
var downing = false;

svg.on("mousedown", () => {
    downing = true;
});
svg.on("mouseup", () => {
    downing = false;
})
svg.on("mousemove", (e) => {
    console.log(e);
        data.shift();
        data.push((height - d3.pointer(e)[1]) / height);
        update();

})
*/
/*
svg.on("click", (e)=> {
    console.log(e);
    data.shift();
    data.push((height - d3.pointer(e)[1]) / height);
    update();
});
*/
svg.call(
d3.drag().on("drag", function(e, d){
    data.shift();
    data.push((height - d3.pointers(e)[0][1]) / height);
    update();
}));

function updateWindow() {
    draw();
    console.log("resize")
}

d3.select(window).on('resize', updateWindow);
init();
draw();