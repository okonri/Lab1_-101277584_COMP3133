var fs = require('fs'); 
//var parse = require('csv-parse');
const { parse } = require('csv-parse');


const canadaData =[];

//deleting old files
// fs.unlink('canada1.txt', (err) =>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log("File deleted successfully")
// })
// fs.unlink('usa1.txt', (err) =>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log("File deleted successfully")
// })


//populating Canada array
fs.createReadStream('input_countries.csv')
    .pipe(parse())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            canadaData.push(row);
        };

    })
    .on('end', () => {
        let str_canada = canadaData.map(r=> {
            return ` ${r['country']}, ${r['year']},${r['population']}`;
        });

    //writing to file

        fs.writeFile('canada.txt', str_canada.join("\n"), (err) => {
            if(err) {
                console.log(err);
            }
        });
  
    })


//populating the USA array
const usaData =[];

fs.createReadStream('input_countries.csv').pipe(parse())
    .on('data', (row) => {

    if (row.country === 'United States') {
            usaData.push(row);
    
        };
    })
    .on('end', () => {

    let str_usa = usaData.map(r=> {
        return `${r['country']}, ${r['year']},${r['population']}`;
    });

    //writing to file
        fs.writeFile('usa.txt', str_usa.join("\n"), (err) => {
            if(err) {
                console.log(err);
            };
        });    
})