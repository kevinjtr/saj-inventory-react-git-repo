const fs = require('fs');

// Original officeLocation array
let officeLocation = [
    {"id":18,"name":"Prudential Building - Jacksonville District Office","section":"HQ","address":"701 San Marco Boulevard","city":"Jacksonville","state":"FL","zipcode":32207,"division":6,"district":25},
    {"id":1,"name":"BCWPA Resident Office","section":"Construction","address":"3000 SW 148th Avenue Suite 251","city":"Miramar","state":"FL","zipcode":33027,"division":6,"district":25},
    {"id":2,"name":"EAA Embankment Office","section":"Construction","address":"13849 Wellington Trace","city":"Wellington","state":"FL","zipcode":33414,"division":6,"district":25},
    // other objects...
];

// Update the 'name' property to "Office N" where N is the 'id'
officeLocation = officeLocation.map(location => ({
    ...location,
    name: `Office ${location.id}`
}));

// Convert the modified array to JSON
const jsonContent = JSON.stringify(officeLocation, null, 2);

// Save the JSON to a file
fs.writeFile('officeLocation.json', jsonContent, 'utf8', (err) => {
    if (err) {
        console.error("An error occurred while writing the file:", err);
        return;
    }
    console.log("JSON file has been saved.");
});