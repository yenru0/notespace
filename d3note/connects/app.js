let width, height;

let svg = d3.select("#main").append("svg");

/*let data = {
    nodes: [{id: "이정호"}, {id: "양재성"}, {id: "주하진"}, {id: "이도규"}],
    links: [
        {source: "주하진", target: "양재성"},
        {source: "주하진", target: "이도규"},
        {source: "양재성", target: "주하진"},
        {source: "양재성", target: "이도규"},
        {source: "이도규", target: "주하진"},
        {source: "이도규", target: "양재성"},
        {source: "이도규", target: "이정호"},
        {source: "이정호", target: "이도규"}

    ]
};*/

let data = {
    nodes: Array.from(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "cursor"],
        function (x) {
            return {id: x}
        }),
    links: [{"source": "v", "target": "z"}, {"source": "r", "target": "m"}, {
        "source": "x",
        "target": "h"
    }, {"source": "x", "target": "t"}, {"source": "s", "target": "e"}, {"source": "v", "target": "h"}, {
        "source": "b",
        "target": "y"
    }, {"source": "w", "target": "a"}, {"source": "w", "target": "y"}, {"source": "w", "target": "k"}, {
        "source": "p",
        "target": "s"
    }, {"source": "f", "target": "t"}, {"source": "a", "target": "f"}, {"source": "u", "target": "e"}, {
        "source": "f",
        "target": "n"
    }, {"source": "n", "target": "l"}, {"source": "r", "target": "n"}, {"source": "a", "target": "d"}, {
        "source": "u",
        "target": "g"
    }, {"source": "h", "target": "q"}, {"source": "f", "target": "r"}, {"source": "j", "target": "v"}, {
        "source": "t",
        "target": "o"
    }, {"source": "n", "target": "h"}, {"source": "e", "target": "h"}, {"source": "q", "target": "h"}, {
        "source": "a",
        "target": "n"
    }, {"source": "s", "target": "k"}, {"source": "m", "target": "w"}, {"source": "i", "target": "n"}, {
        "source": "q",
        "target": "u"
    }, {"source": "e", "target": "q"}, {"source": "c", "target": "f"}, {"source": "c", "target": "m"}, {
        "source": "b",
        "target": "l"
    }, {"source": "w", "target": "f"}, {"source": "i", "target": "e"}, {"source": "h", "target": "s"}, {
        "source": "u",
        "target": "a"
    }, {"source": "e", "target": "r"}, {"source": "y", "target": "i"}, {"source": "d", "target": "c"}, {
        "source": "c",
        "target": "t"
    }, {"source": "h", "target": "d"}, {"source": "l", "target": "p"}, {"source": "w", "target": "h"}, {
        "source": "d",
        "target": "x"
    }, {"source": "e", "target": "o"}, {"source": "g", "target": "h"}, {"source": "r", "target": "j"}, {
        "source": "d",
        "target": "o"
    }, {"source": "k", "target": "g"}, {"source": "r", "target": "q"}, {"source": "s", "target": "z"}, {
        "source": "q",
        "target": "a"
    }, {"source": "s", "target": "h"}, {"source": "t", "target": "l"}, {"source": "n", "target": "i"}, {
        "source": "b",
        "target": "x"
    }, {"source": "f", "target": "l"}, {"source": "w", "target": "x"}, {"source": "h", "target": "b"}, {
        "source": "k",
        "target": "y"
    }, {"source": "t", "target": "d"}, {"source": "m", "target": "s"}, {"source": "v", "target": "s"}, {
        "source": "z",
        "target": "u"
    }]
};

function linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}

const links = data.links.map(d => Object.create(d));
const nodes = data.nodes.map(d => Object.create(d));
let simulation;


drag = simulation => {

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;

    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;

    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-3000))
        .force("x", d3.forceX().x(
                function (d) {
                    if (d.id === 'a') {
                        return -width / 2 - 10000
                    } else if (d.id === 'y') {
                        return width / 2 + 10000
                    } else {
                        return null;
                    }
                }
            )
        )
        .force("y", d3.forceY().y(
            function (d) {
                if (d.id === 'a') {
                    return -width / 2 - 1000
                } else if (d.id === 'y') {
                    return width / 2 + 1000
                } else {
                    return null;
                }
            }
        ));
    svg.attr("viewBox", [-width / 2, -height / 2, width, height])
        .style("font", "12px sans-serif");

    svg.append("defs").selectAll("marker")
        .data(["arrow"])
        .join("marker")
        .attr("id", `arrow`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -0.5)
        .attr("markerWidth", 4)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", "black")
        .attr("d", "M0,-5L10,0L0,5");

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("stroke", "black")
        .attr("marker-end", d => `url(${new URL(`#arrow`, location)})`);

    const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("id", d => d.id)
        .call(drag(simulation));

    node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", 6);

    node.append("text")
        .attr("x", 8)
        .attr("y", "0.31em")
        .text(d => d.id)
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3);

    simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);

        let n = nodes.find(d => d.id === 'a');
        n.fx = -width/2; n.fy = -height/2;
        n = nodes.find(d => d.id === 'y');
        n.fx = width/2; n.fy = height/2;
        n = nodes.find(d => d.id === 'z');
        n.fx = width/2; n.fy = -height/2;
        n = nodes.find(d => d.id === 't');
        n.fx = -width/2; n.fy = height/2;
        n = nodes.find(d => d.id === 'b');
        n.fy = height/2;
        n = nodes.find(d => d.id === 'u');
        n.fy = -height/2;
        n = nodes.find(d => d.id === 'c');
        n.fx = -width/2;
    });

    d3.invalidation.then(() => simulation.stop());
}

function update() {
    width = window.innerWidth;
    height = window.innerHeight;
    svg.attr("viewBox", [-width / 2, -height / 2, width, height])

}


d3.select(window).on("resize", update);

svg.on("pointermove", (e) => {
    simulation.force('x', d3.forceX(d3.pointers(e)[0][0]).strength(-0.030));
    simulation.force('y', d3.forceY(d3.pointers(e)[0][1]).strength(-0.030));
    simulation.alphaTarget(0.3).restart();
});

init();

