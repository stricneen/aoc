const aoc = require('./aoc');

    
const t = 1000391;

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


const time = '19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,383,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29,x,457,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,17';
const testtimes = '7,13,x,x,59,x,31,19'; // 1068781
const time1 = '17,x,13,19'  //  is 3417.
const t3 = '67,7,59,61';   //754018.
const t4 = '67,x,7,59,61'; // 779210.
const t5 = '67,7,x,59,61'; // 1261476.
const t6 = '1789,37,47,1889'; // first occurs at timestamp 1202161486.'

const timetable = time.split(',')
    .map((x,i) => { return {offset: i, time: parseInt(x)}})
    .filter(x => !isNaN(x.time));

timetable.sort((a,b) => a.offset - b.offset);

const lcd = (x,y,t) => {
    console.log();
    console.log(x);
    console.log(y);

    let biggest = Math.max(x.time, y.time);

    let max ={}, min ={};
    if (x.time != biggest) {
        max = x;
        min = y;
    } else {
        max = y;
        min = x;
    }

    let firstMeeting = max.time + max.offset;
    while(true) {
        if (min.time < min.offset) {
            console.log('ERROR', min.time, min.offset);
            break;
        }
        if ((firstMeeting % min.time) == min.offset) {
            return {offset: firstMeeting, time: x.time * y.time}
        }
        firstMeeting += t;
    }

     


};

// let np = timetable[0].time;
// let s = lcd(timetable[0], timetable[1], np);
// for(var i =2 ; i < timetable.length; i++) {

//     s = lcd(s, timetable[i], np);
//     np *= timetable[i].time;
//     console.log(s);
// }

// console.log (s.time - s.offset);



const next = (offset, time, ans, period) => {

    // let ans = x;
    while((ans + offset) % time != 0) {
        ans += period;

    }
    console.log(period);
    return ans;

}

console.log(timetable);
const p2 = timetable.reduce((a,e) => {

    const n = next(e.offset, e.time, a[1], a[0]);

    return [a[0]*e.time, n];
}, [1, 0]);

console.log(p2);