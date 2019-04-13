var width = 800,
    height = 600;
var svg = d3.select("body").append("svg")
    // .attr("class", "svgback")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.mercator()
    .center([121,24])
    .scale(6000);

var path = d3.geo.path()
    .projection(projection);

// load and display the World
d3.json("taiwan.json", function(error, topology) {
    var g = svg.append("g");
    
    // load and display the cities
    d3.csv("cities.csv", function(error, data) {
        g.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
           .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
           .attr("r", 5)
           .style("fill", "red");
    });
    
    // 縣市/行政區界線
    d3.select("svg").append("path").datum(
            topojson.mesh(topology,
                    topology.objects["County_MOI_1041215"], function(a,
                            b) {
                        return a !== b;
                    })).attr("d", path).attr("class","subunit-boundary");
    
    d3.select("g").selectAll("path")
          .data(topojson.feature(topology, topology.objects.County_MOI_1041215).features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr({
                d : path,
                name : function(d) {
                    return d.properties["C_Name"];
                },
                fill : '#55AA00'
        });
    
    // 顯示滑鼠所指向的縣市/行政區
    d3.select("svg").selectAll("path").on("mouseenter", function() {
        // console.log(e);
        fill = $(this).attr("fill");
        $(this).attr("fill", '#00DD77');
    
        $('#title').html($(this).attr("name"));
        $('#panel').css({
            "height" : "20px",
            "width" : "60px"
        });
    }).on("mouseout", function() {
        $(this).attr("fill", fill);
    });
    
    // panel 隨滑鼠移動
    $("path").mouseover(function(e) {
        if($('#panel').is(':visible')){
            $('#panel').css({
                'top' : e.pageY,
                'left' : e.pageX
            });
        } else {
            $('#panel').fadeIn('slow').fadeOut();
        }
    });

});

setInterval(function() {
    d3.csv("cities2.csv", function(error, data) {
        svg.select("g").selectAll("circle").remove();
        
        // new data joins old elements 'circle'
        var update = svg.append("g").selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
            })
            .attr("r", 5)
            .style("fill", "red");
    });
}, 2000);