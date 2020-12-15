const input = "0,13,1,8,6,15".split(",")

const solve = (n) => {
  let lastNum = input[input.length - 1];
  const lastSpoken = new Array(n);
  input.forEach((v, i) => lastSpoken[v] = i + 1);

  for (let i = input.length; i < n; i++) {
    const next = lastSpoken[lastNum] ? i - lastSpoken[lastNum] : 0;
    lastSpoken[lastNum] = i;
    lastNum = next;
  }
  return lastNum;
}

console.log("Part 1 : ", solve(2020));
console.log("Part 2 : ", solve(30000000));