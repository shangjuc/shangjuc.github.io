//設定向量圖寬高
var width = 1200,
    height = 900;

var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);
      
var projection = d3.geo.mercator()
      .center([121, 24])
      
      //設定地圖尺度(類似拉近拉遠效果)
      .scale(8000);

var path = d3.geo.path()
      .projection(projection);


      
//讀取同資料夾下的taiwan.json
d3.json("taiwan.json", function(error, topology) {

    // 行政區
    var g = svg.append("g");

    d3.select("svg").append("path").datum(
        topojson.mesh(topology,
            topology.objects["County_MOI_1060525"],function(a,b) {
            return a !== b;
        })
    )
        
    .attr("d", path)

    //次級單位邊界
    .attr("class", "subunit-boundary");

    d3.select("g").selectAll("path")
    .data(topojson.feature(topology, topology.objects.County_MOI_1060525).features)
    .enter()
    .append("path")
    .attr("d", path)
    
    //匯入行政區名稱/代碼/ID
    .attr({
        d: path,
        countyName: function(d) {
            return d.properties["COUNTYNAME"];
        },
        countyEng: function(d) {
            return d.properties["COUNTYENG"];
        },
        countyCode: function(d) {
            return d.properties["COUNTYCODE"];
        },
        countyID: function(d) {
            return d.properties["COUNTYID"];
        },
        
        //設定區塊顏色
        fill: 'lightgreen',  
        
        //設定邊界顏色
        stroke: "#fff"   
    })

    //設定邊界寬度
    .attr('stroke-width', "1")
    
    
    // //設定滑鼠移入時的區塊顏色
    // .on("mouseover", function(d) {
    //     d3.select(this).attr("fill", "#fff");
    // })
    
    // //設定滑鼠移出後的區塊顏色
    // .on("mouseleave", function(d) {
    //     d3.select(this).attr("fill", "lightgreen");
    // });




    //用jQuery顯示滑鼠所指向的行政區
    var fill;
    var e;

    d3.select("svg")
    .selectAll("path")
    //滑鼠移入時的區塊顏色
    .on("mouseenter", function() {
        // console.log(e);
        fill = $(this).attr("fill");
        $(this).attr("fill", 'white');
    })
    
    //滑鼠移出後的區塊顏色
    .on("mouseout", function() {
        $(this).attr("fill", fill);
    });


    //滑鼠移入時顯示行政區名稱
    $("path").mouseenter(function(e) {
        $('#countyName--s').html($(this).attr("countyName"));
        
        $('#panel').css({
            'top' : e.pageY,
            'left' : e.pageX,
            'opacity': '100'
        });
    });

    //滑鼠移出時將panel取消
    $("path").mouseout(function() {
        $('#panel').css({
            'opacity': '0'
        });
    });

    //滑鼠點擊後顯示panel--big
    $("path").mousedown(function() {
        $('.countyInfo').css({
            'opacity' : '100'
        });
        $('#countyName').html($(this).attr("countyName"));
        $('#countyEng').html($(this).attr("countyEng"));
        $('#countyCode').html($(this).attr("countyCode"));
        $('#countyID').html($(this).attr("countyID"));

    });
    
});



// //在地圖上標記城市的點
// var g = svg.append("g");
    
// //讀取同資料夾下的cities.csv
// d3.csv("cities.csv", function(error, data) {
//     g.selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", function(d) {
//         return projection([d.lon, d.lat])[0];
//     })
//     .attr("cy", function(d) {
//         return projection([d.lon, d.lat])[1];
//     })

//     //設定城市的半徑
//     .attr("r", 15)
    
//     //設定城市的顏色
//     .style("fill", "blue");
// });

//讀取同資料夾下的cities2.csv

// setInterval(function() {
//     d3.csv("cities2.csv", function(error, data) {
//         svg.select("g").selectAll("circle").remove();
        
//         // new data joins old elements 'circle'
//         var update = svg.append("g").selectAll("circle")
//             .data(data)
//             .enter()
//             .append("circle")
//             .attr("cx", function(d) {
//                 return projection([d.lon, d.lat])[0];
//             })
//             .attr("cy", function(d) {
//                     return projection([d.lon, d.lat])[1];
//             })
//             .attr("r", 5)

//             //設定城市的顏色
//             .style("fill", "red");
//     });
// }, 2000);


//







