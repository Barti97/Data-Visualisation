var width = 1920;
var height = 1080;
var labelSize = 30;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geoFahey()
    .scale(width / 5)
    .translate([width / 2, height / 2.5]);

var path = d3.geoPath().projection(projection);
var center = {
    x: (width / 2),
    y: (height / 2)
};
d3.json("world.json")
    .then(function (world) {

        console.log(world);
        world = topojson.presimplify(world);

        renderMap(svg.append("g"), 0.0001, "green");

        function renderMap(container, minWeight, color) {
            var geo = topojson.simplify(world, minWeight);
            var countries = topojson.feature(geo, world.objects.countries).features;
            container
                .append("g")
                .selectAll("path", ".country")
                .data(countries).enter()
                .append("path")
                .attr("class", "country")
                .attr("d", path)
                .style("fill", color)
                .on("mouseover", function () {
                    d3.select(this).style("fill", "white");
                    console.log(projection.invert(d3.mouse(this)));

                })
                .on("mousedown.log", function () {

                })
                .on("mouseout", function () {
                    d3.select(this).style("fill", "green");
                });

        }
    });
