const { parse } = require('csv-parse');
const fs = require('fs');

//empty array to be filled with data from .csv file
const results = [];

fs.createReadStream('kepler_data.csv')
    //pipe function parses to readable data to writable
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        results.push(data)
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', ()=> {
        console.log(results);
        console.log("done")
    });
