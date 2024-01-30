class Hailstone:
    def __init__(self, sx, sy, sz, vx, vy, vz):
        self.sx = sx
        self.sy = sy
        self.sz = sz
        self.vx = vx
        self.vy = vy
        self.vz = vz
        
        self.a = vy
        self.b = -vx
        self.c = vy * sx - vx * sy
    
    def __repr__(self):
        # return "Hailstone{" + f"x={self.sx}, y={self.sy}, z={self.sz}" + "}"
        return  f"{self.sx}"

hailstones = [Hailstone(*map(int, line.replace("@", ",").split(","))) for line in open('./data/day24.txt')]
print(hailstones[0])
print(hailstones[1])

total = 0

f = open("out.txt", "a")

for i, hs1 in enumerate(hailstones):
    for hs2 in hailstones[:i]:
        print(hs1,hs2)
        a1, b1, c1 = hs1.a, hs1.b, hs1.c
        a2, b2, c2 = hs2.a, hs2.b, hs2.c
        if a1 * b2 == b1 * a2:
            # f.write(f"{min(hs1.sx,hs2.sx)},{max(hs1.sx,hs2.sx)},false\n")
            # f.write(hs1,hs2,'false\n')
            continue
        x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1)
        y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1)
        print(x,y)
        # if 200000000000000 <= x <= 400000000000000 and 200000000000000 <= y <= 400000000000000:
        if all((x - hs.sx) * hs.vx >= 0 and (y - hs.sy) * hs.vy >= 0 for hs in (hs1, hs2)) and 200000000000000 <= x <= 400000000000000 and 200000000000000 <= y <= 400000000000000:
            total += 1
            # f.write(f"{min(hs1.sx,hs2.sx)},{max(hs1.sx,hs2.sx)},true\n")
        # else:
            # f.write(f"{min(hs1.sx,hs2.sx)},{max(hs1.sx,hs2.sx)},false\n")
                

print(total)
