const tw =  [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]];
const t1 =  [[3,[21,[1,[7,3]]]],[16,[5,[4,[3,2]]]]];

const t = [[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]



/// [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]] 

const syn = (t) => {

    const numsplit=(s) => {
        const r = [];
        const l = s.split('').map(x => isNaN(parseInt(x)) ? x : parseInt(x));
// console.log(l)
        const x = l.reduce((a,e) => {
            if (a.length === 0) {
                a.push(e);
                return a;
            }

            if (Number.isInteger(e)) {

                if (Number.isInteger(a[a.length-1])) {
                    a[a.length-1] = a[a.length-1] * 10 + e
                }else {
                    a.push(e)
                }

            }else {
                a.push(e);
            }
            return a;

        }, []);
        // console.log(x)
        return x;
    }
    
    const str = JSON.stringify(t);
    const chars = str.split('');
    let depth = 0;
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === '[') depth++
        if (c === ']') depth--
//        [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]];
        if (depth === 5) {
             const r = chars.slice(i+1).join('');
             const rr = r.substring(0, r.indexOf(']'));
            //  const
             const p1 = parseInt(rr.split(',')[0]);
             const p2 = parseInt(rr.split(',')[1]);
             console.log(p1,p2);

            const b = str.substring(0, str.indexOf(rr));
            const a = str.substring(str.indexOf(rr)+ rr.length);

            console.log(b);
            console.log(a)

           const x = numsplit(b.substring(0, b.length-1))
           const y =  numsplit(a.substring(1))
            

           const rfx = x.reverse();
           const ff = rfx.findIndex(z => Number.isInteger(z));
            if (ff) {
                rfx[ff] = rfx[ff] + p1;
            }


            const fy = y.findIndex(z => Number.isInteger(z));
            if (fy) {
                y[fy] = y[fy] + p2;
            }

            const c = rfx.reverse().join('') + '0' + y.join('')

            console.log(c)
            return JSON.parse(c)
           
        }
    }
    return t;
}

console.log(JSON.stringify(syn(t)));