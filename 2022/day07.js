const aoc = require('./aoc');
const buffer = aoc.readfile('day07.txt');
const text = buffer.split(/\n/);

root = { type: 'dir', name: '/', cnts: [], size: 0 }

ptr = [root]
fs = ptr;

for (let i = 1; i < text.length; i++) {
    const cmd = text[i];
    
    

    if (cmd.startsWith('$')) {
        if (cmd.includes('cd')) {
            if (cmd.split(' ')[2] === '..') {
                ptr.pop()
            } else {
                contents = ptr[ptr.length - 1].cnts
                newdir = contents.find(x => x.name === cmd.split(' ')[2])
                ptr.push(newdir)
            }
        }
    } else {
        if (cmd.startsWith('dir')) {
            newdir = { type: 'dir', size: 0, name: cmd.split(' ')[1], cnts: [] }
            ptr[ptr.length - 1].cnts.push(newdir)
        } else {
            f = cmd.split(' ')
            ptr[ptr.length - 1].cnts.push({ type: 'file', size: parseInt(f[0]), name: f[1] })
        }
    }

    // console.log('cmd', cmd)
    // console.log('fs ', fs)
    // console.log()

}


final = fs[0]


const calc = (dir) => {
    if (dir.type === 'dir') {
        for (let i = 0; i < dir.cnts.length; i++) {
            dir.size += calc(dir.cnts[i])
        }
        return dir.size
    } else {
        console.log(dir.size)
        return dir.size
    }

}
calc(final)
// console.log(JSON.stringify(final))


s = 0
const sum = (dir) => {
    if (dir.type === 'dir') {
        if (dir.size <= 100000) {
            s += dir.size
        }
        for (let i = 0; i < dir.cnts.length; i++) {
            sum(dir.cnts[i])

        }
    }
}
sum(final)
p1 = s


s1 = []
const min = (dir) => {
    if (dir.type === 'dir') {
        s1.push(dir.size)
        for (let i = 0; i < dir.cnts.length; i++) {
            min(dir.cnts[i])
        }
    }
}


min(final)


total = s1[0];
unused = 70000000 - total;

need = 30000000
console.log('unused ', unused)
t = []
for (let i = 0; i < s1.length; i++) {

    free = s1[i] + unused

    if (free >= need) {
        t.push(s1[i])
    }

}

console.log(Math.min(...t))



console.log("Part 1 : ", (p1)) //1334506
console.log("Part 2 : ", (Math.min(...t))) //7421137
