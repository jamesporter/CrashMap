var width=window.innerWidth,height=window.innerHeight,force=d3.layout.force().charge(-600).linkDistance(100).size([width,height]),svg=d3.select("#chart").append("svg").attr("width",width).attr("height",height);d3.json("/json/refined_graph.json",function(e){function r(e,t){d3.select(this).select("circle").transition().duration(200).attr("fill","#4a8a8a");d3.select("#label-text").text(function(){console.log(e);console.log(this);return e.id})}function i(e,t){d3.select(this).select("circle").transition().duration(200).attr("fill","#fff");d3.select("#label-text").text("The Great Imbalance")}force.nodes(e.nodes).links(e.links).start();var t=svg.selectAll("line.link").data(e.links).enter().append("line").attr("class","link").attr("stroke-width",2).attr("stroke-color","#000"),n=svg.selectAll(".node").data(e.nodes).enter().append("g").attr("class","node").on("mouseover",r).on("mouseout",i).call(force.drag);n.append("circle").attr("r",function(t){var n=e.gdps[2001][t.id]/2e11;return n<3?3:n}).attr("fill","#fff");n.append("text").attr("x",function(e){return 10+e.n}).attr("dy",".5em").attr("font-size","0.75em").style("stroke","#dddddd").style("fill","#dddddd").style("display","none").text(function(e){return e.id});force.on("tick",function(){t.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y});n.attr("transform",function(e){return"translate("+e.x+","+e.y+")"})})});