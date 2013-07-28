var width = window.innerWidth,
        height = window.innerHeight;

var force = d3.layout.force()
    .charge(-600)
    .linkDistance(100)
    .size([width, height]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/json/refined_graph.json", function(json) {
    force
        .nodes(json.nodes)
        .links(json.links)
        .start();

    var link = svg.selectAll("line.link")
        .data(json.links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke-width", 2)
        .attr("stroke-color", "#000");

    var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(force.drag);

    node.append("circle")
        .attr("r", function(d){
            var rad = json.gdps["2001"][d.id] / 200000000000.0;
            if(rad < 3.0){
                return 3.0
            }else{
                return rad;
            }
        })
        .attr("fill", "#fff");

    node.append("text")
        .attr("x", function(d){return 10 + d.n})
        .attr("dy", ".5em")
        .attr("font-size", "0.75em")
        .style("stroke", "#dddddd")
        .style("fill", "#dddddd")
        .style("display", "none")
        .text(function(d) { return d.id; });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    });

    function mouseover(d,i){
        d3.select(this).select("circle")
            .transition().duration(200)
            .attr("fill", "#4a8a8a")

        d3.select("#label-text")
            .text(function(){console.log(d); console.log(this); return d.id;});
    }

    function mouseout(d,i){
        d3.select(this).select("circle")
            .transition().duration(200)
            .attr("fill", "#fff")

        d3.select("#label-text")
                    .text("The Great Imbalance");
    }
});

d3.select("#play-button").on("click", function(){


});

