const aoc = require('../aoc');
const buffer = aoc.readfile('day13.txt');
const textraw = buffer.split(/\n/);

const sqrs = textraw.reduce((a, e) => {
    if (e.length === 0) a.push([])
    else a[a.length - 1].push(e)
    return a
}, [[]])

const getCol = (sqr, n) => sqr.reduce((a, e) => a += e[n], '')

const scan = (sqr, oScan) => {

    a = 0
    const r = []
    for (let i = 0; i < sqr.length; i++) {
        const row1 = sqr[i];

        for (let j = i + 1; j < sqr.length; j++) {
            const row2 = sqr[j];
            // console.log(i, j, row1, row2)
            if (row1 === row2) {
                // console.log(i,j)
                r.push([i, j])
            }
        }
    }

    // console.log('----')
    const c = []
    for (let i = 0; i < sqr[0].length + 1; i++) {
        const col1 = getCol(sqr, i)

        for (let j = i + 1; j < sqr[0].length; j++) {
            const col2 = getCol(sqr, j)

            // console.log(i, j, col1, col2)
            if (col1 === col2) {
                // console.log(i,j)
                c.push([i, j])
            }

        }

    }
    // console.log(sqr)

    // console.log('row', r)
    // console.log('col', c)


    const isMirror = (a, s) => {
        // console.log('is mirror')

        // console.log('oScan' ,oScan)

        rm = []


        mm = a.filter(([x, y]) => Math.abs(x - y) === 1)

        if (mm.length === 0) return undefined;
        // console.log(mm, s)
        for (let i = 0; i < mm.length; i++) {
            m = mm[i]



            if (m[0] === 0 || m[1] === s - 1) rm.push(m)
            while (true) {
                o = a.find(([x, y]) => x === m[0] - 1 && y === m[1] + 1)
                // console.log('o', o)

                if (!o) break;
                if (o[0] === 0 || o[1] === s - 1) rm.push(mm[i]);
                m = o
            }
        }
        return rm
    }




    rowM = isMirror(r, sqr.length)
    colM = isMirror(c, sqr[0].length)

    
    
    if (oScan > 99 && rowM?.length > 1) {/// row
        s = (oScan / 100) -1
        console.log('s',s)
        rowM = rowM.filter(([x,y]) => x !== s)[0]
    } else 
    {
        if (rowM?.length === 1) rowM = rowM[0]
    }
    
    
    if (oScan < 100 && colM?.length > 1) {/// row
        s = (oScan) -1
        colM = colM.filter(([x,y]) => x !== s)[0]
    }
    else {
        if (colM?.length === 1) colM = colM[0]
    }
    



//     console.log('rowM', rowM)
// console.log('colM', colM)


    


    return [rowM ? (rowM[0] + 1) * 100 : undefined, colM ? colM[0] + 1 : undefined];


}
// return 0


const p2R = (original_sizes) => {
    res = []

    for (let i = 0; i < sqrs.length; i++) {
        const sqr = sqrs[i];

        const oScan = original_sizes[i]

        console.log('o', oScan)
        // console.log(sqr)

        scans = []
        found = false
        for (let k = 0; k < sqr.length; k++) {
            for (let j = 0; j < sqr[0].length; j++) {

                const copy = JSON.parse(JSON.stringify(sqr))

                c = copy[k][j]
                // console.log(c)

                newc = c === '.' ? '#' : '.'
                l = copy[k]
                str = l.split('');
                str[j] = newc;
                copy[k] = str.join('');


                const s = scan(copy, oScan)
                scans.push(...s)

                   

                // if (s[0] !== undefined && s[0] !== oScan && !found) {
                //     found = true
                //     res.push(s[0])
                // }
                // if (s[1] !== undefined && s[1] !== oScan && !found) {
                //     found = true
                //     res.push(s[1])
                // }
            }
        }

        const t= [... new Set(scans.flat().filter(x => !isNaN(x) && x !== undefined && x !== oScan))]
        // console.log('>>>>>', t)


        if (t.length === 0) 
        {
        //  console.log(sqrs[i])

         process.exit()
        }


        res.push(t[0])
    }

    return res;

}

// console.log(sqrs)
const p1a = sqrs.map(scan);
p1aa = p1a.map(([x, y]) => x || y)
// console.log(p1aa)
// console.log(p1aa)


const p2 = p2R(p1aa);

// console.log(res)

// tl 21179
// tl 21308

// 30757

// th 41292
// p1 = 0
// p2 = 0

console.log('Part 1:', aoc.sum(p1aa)); // 34911
console.log('Part 2:', aoc.sum(res)); // 33183