const https = require('https');
const fs = require('node:fs');

// https://adventofcode.com/2022/day/1/input

const args = process.argv;
// console.log(args)

const cookie = fs.readFileSync('../cookie.txt');
const day = args[2] || new Date().getDate(); // default to today

const options = {
    host: 'adventofcode.com',
    port: 443,
    path: `/2023/day/${day}/input`,
    method: 'GET',
    headers: { 'Cookie': cookie }
};

// console.log(options)
// process.exit();

https.get(options, res => {

    const data = [];
    console.log(res.statusCode);

    res.on('data', chunk => {
        data.push(chunk);
    });

    res.on('end', () => {
        console.log('Response ended: ');
        const input = Buffer.concat(data).toString();

        fs.writeFileSync(`./data/day${day}.txt`, input);

        console.log(`Input written: ./data/day${day}.txt`);
    });


}).on('error', err => {
    console.log('Error: ', err.message);
});