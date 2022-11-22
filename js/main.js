//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){
    //use queue to parallelize asynchronous data loading
    d3.queue()
        .defer(d3.csv, "data/NC_janData.csv") //load attributes from csv
        .defer(d3.json, "data/nc_counties.topojson") //load choropleth spatial data
}
