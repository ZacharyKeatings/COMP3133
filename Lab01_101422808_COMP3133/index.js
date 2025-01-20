const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

[canadaFile, usaFile].forEach((file) => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`${file} deleted.`);
  }
});

const headers = 'country,year,population\n';
fs.writeFileSync(canadaFile, headers);
fs.writeFileSync(usaFile, headers);

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const { country } = row;

    if (country.toLowerCase() === 'canada') {
      fs.appendFileSync(canadaFile, `${Object.values(row).join(',')}\n`);
    } else if (country.toLowerCase() === 'united states') {
      fs.appendFileSync(usaFile, `${Object.values(row).join(',')}\n`);
    }
  })
  .on('end', () => {
    console.log(`'${inputFile}' processing finished.`);
    console.log(`Processed data written to '${canadaFile}' and '${usaFile}'`);
  })
  .on('error', (error) => {
    console.error(`Error processing CSV file: ${error.message}`);
  });
