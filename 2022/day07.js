const aoc = require('./aoc');
const buffer = aoc.readfile('day07.txt');
const text = buffer.split(/\n/);

const buildTree = () => {
    const root = { type: 'dir', name: '/', children: [], size: 0 }
    const ptr = [root]

    for (let i = 1; i < text.length; i++) {
        const cmd = text[i].split(' ');
        if (cmd[1] === 'cd') {
            if (cmd[2] === '..') {
                ptr.pop()
            } else {
                ptr.push(ptr[ptr.length - 1].children.find(x => x.name === cmd[2]))
            }
        }

        if (cmd[0] === 'dir') { // new dir
            ptr[ptr.length - 1].children.push({ type: 'dir', size: 0, name: cmd[1], children: [] })
        }
        if (aoc.isNumber(cmd[0])) { // new file
            ptr[ptr.length - 1].children.push({ type: 'file', size: parseInt(cmd[0]), name: cmd[1] })
        }
    }

    // Calculate dir sizes
    const calc = (item) => {
        if (item.type === 'dir') {
            for (let i = 0; i < item.children.length; i++) {
                item.size += calc(item.children[i])
            }
        }
        return item.size
    }

    calc(root)
    console.log(JSON.stringify(root))
    return root;
}

const tree = buildTree();

const sum = (dir, c) => {
    if (dir.type === 'dir') {
        for (const child of dir.children) {
            c = sum(child, c)
        }
        if (dir.size <= 100000) c += dir.size
    }
    return c;
}

const p1 = sum(tree, 0);


const disk = 70000000
const required = 30000000
const used = tree.size
const free = disk - used

const needToDelete = required - free

const scan = (item, min) => {
    if (item.type === 'dir') {
        localMin = item.size < min && item.size > needToDelete ? item.size : min
        for (const children of item.children) {
            min = scan(children, localMin)
        }
    }
    return min
}

const p2 = scan(tree, Infinity)
console.log("Part 1 : ", (p1)) //1334506
console.log("Part 2 : ", (p2)) //7421137
