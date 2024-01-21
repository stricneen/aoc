const aoc = require('./aoc');
const buffer = aoc.readfile('day12.txt');
const textraw = buffer.split(/\n/);

springs = textraw.map(x => {
    l = x.split(' ')
    return { springs: l[0], arrange: l[1].split(',').map(y => parseInt(y)) }
});
springs = [springs[1]]

cache = new Map()

// i        - current pos
// bi       - current block
// current  - length current block

const f = (springs, arrange, i=0, bi=0, current=0) => {

   const key = `${i}-${bi}-${current}`
   
   // console.log(key)
   
   // { springs: '???#???.?#??????', arrange: [ 1, 2, 2, 3, 2 ] } 5
    
    if (i === springs.length) {
        if (bi === arrange.length ) {return 1}
        return 0
    }
    
    if (cache.has(key)) {
        console.log('hit', key, cache.get(key))
        return cache.get(key);
    }
    
/*

1-0-0


*/

    //  ???.### 1,1,3
    ans = 0
    '.#'.split('').forEach(c => {
        if (springs[i] === c || springs[i] === '?') {
            if (c === '.' && current === 0)
                ans += f(springs, arrange, i + 1, bi, 0)
            else if (c === '#')
                ans += f(springs, arrange, i + 1, bi, current + 1)
            else if (c === '.' && current > 0 && bi < arrange.length && arrange[bi] === current)
                ans += f(springs, arrange, i + 1, bi + 1, 0)
        }
    })

    // '.??..??...?##.', arrange: [ 1, 1, 3 ] } 4

    cache.set(key, ans)
    console.log(key, cache.get(key))
    return ans
}

p1 = 0
p2 = 0
springs.forEach(s => {

    a = f(`${s.springs}.`, s.arrange);
    console.log(s, a)
    p1 += a
    cache.clear()
});
console.log('Part 1:', p1); // 6852


// springs.forEach(s => {
//     // console.log(s)

//     sp = `${s.springs}?${s.springs}?${s.springs}?${s.springs}?${s.springs}.`
//     arr = [...s.arrange,...s.arrange,...s.arrange,...s.arrange,...s.arrange]
//     a = f(sp, arr, 0, 0, 0);
//     p2 += a
//     console.log(s, a)
//     cache.clear()
// });

// ???.### 1,1,3 - 1 arrangement
// .??..??...?##. 1,1,3 - 4 arrangements
// ?#?#?#?#?#?#?#? 1,3,1,6 - 1 arrangement
// ????.#...#... 4,1,1 - 1 arrangement
// ????.######..#####. 1,6,5 - 4 arrangements
// ?###???????? 3,2,1 - 10 arrangements
// console.log(springs)


console.log('Part 1:', p1); // 6852
console.log('Part 2:', p2); // 
