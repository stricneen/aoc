const aoc = require('./aoc');

    
const t = 1000391;
const time = '19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,383,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29,x,457,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,17';

const test = 939;
// const testtimes = '7,13,x,x,59,x,31,19';

const mintime = (f, m) => {
    let x = 0;
    while(x < m) {
        x += f;
    }
    return [x,f];
}
// const times = time.split(',').filter(x => x != 'x').map(x => parseInt(x));
// console.log(times);
// const ts = times.map(x => mintime(x, t));
// console.log(ts);

// 1915


const testtimes = '7,13,x,x,59,x,31,19';

const test1 = '17,x,13,19'  //  is 3417.
const timesp2 = test1.split(',').filter(x => x != 'x').map((x,i) => { return {offset: i, time: parseInt(x)}});
//const ts = timesp2.map(x => mintime(x, t));


console.log(ts);


