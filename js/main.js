//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap() {

    //map frame dimensions
    var width = 960,
        height = 460;

    //create new svg container for the map
    var map = d3.select('body')
        .append('svg')
        .attr('class', 'map')
        .attr('width', width)
        .attr('height', height);

    //create Albers equal area conic projection centered on North Carolina
    var projection = d3.geoAlbers()
        .center([1.2, 35.3])
        .rotate([81, 0, 0])
        .parallels([29.5, 45.5])
        .scale(7000)
        .translate([width / 2, height / 2]);
    //console.log(map);

    //create path generator
    var path = d3.geoPath()
        .projection(projection);

    //use promise.all to parallelize asynchronous data loading
    var promises = [];
    promises.push(d3.csv('data/NC_janData.csv'));    // load attributes from csv
    promises.push(d3.json('data/backgroundStates.topojson'));  //load background spatial data
    promises.push(d3.json('data/nc_counties.topojson'));  //load choropleth spatial data
    Promise.all(promises).then(callback);
    //console.log(promises);

    function callback(data) {

        csvData = data[0];
        nc = data[1];
        states = data[2];

        //translate topoJSONs
        var ncCounties = topojson.feature(nc, nc.objects.ncCounties),     //assign variable names to the features in the topojson data
            stateOutlines = topojson.feature(states, states.objects.stateOutlines).features; //get array of features to pass to .data()
        console.log(ncCounties);


        //add states to map using path generator. creates single svg element for states
        var otherStates = map.append('path')
            .datum(stateOutlines)
            .attr('class', "otherStates")
            .attr('d', path);

        //add enumeration units to map using .selectAll().data().enter()
        var counties = map.selectAll(".counties")
            .data(ncCounties)
            .enter()
            .append('path')
            .attr('class', function (d) {
                return d.properties.NAME_ALT;
            })
            .attr("d", path);
    }

    // create graticule generator
    var graticule = d3.geoGraticule()
        .step([5,5]);  //step for 5 degrees lon, lat grat lines

   var gratBack = map.append('path')  //append background to map using outline method
       .datum(graticule.outline())
       .attr('class', 'gratBack')     //class for css styling
       .attr('d',path)     //project graticule

   // draw graticule lines
   var gratLines= map.selectAll('.gratLines')
       .data(graticule.lines())
       .enter()
       .append('path')
       .attr("class", 'gratLines')
       .attr('d', path);

};