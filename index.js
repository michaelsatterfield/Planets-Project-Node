const { parse } = require('csv-parse');
const fs = require('fs');

//empty array to be filled with data from .csv file
const habitablePlanet = [];

//function to filter habitable planets
const isHabitablePlanet = (planet) =>{
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11;
}

fs.createReadStream('kepler_data.csv')
    //pipe function parses to readable data to writable
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data)){
        //pushes parsed data to habitablePlanet array above
        habitablePlanet.push(data)
        }
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', ()=> {
        console.log(habitablePlanet);
        console.log("done")
    });
