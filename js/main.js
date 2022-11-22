//begin script when window loads
window.onload = setMap();

//array for data file names
const files = ['NC_janData.csv', 'nc_counties.topojson', 'backgroundStates.topojson']

//set up choropleth map
function setMap(){
    //use promise.all to parallelize asynchronous data loading
    var promises = [];
    promises.push(d3.csv('data/NC_janData.csv'));    // load attributes from csv
    promises.push(d3.json('data/nc_counties.topojson'));  //load choropleth spatial data
    promises.push(d3.json, 'data/backgroundStates.topojson');  //load background spatial data
    Promise.all(promises).then(callback);

    function callback(data){
        csvData = data[0];
        nc = data[1];
        states = data[2];
        console.log(csvData);
        console.log(nc);
        console.log(states);

    };

};
