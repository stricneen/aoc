f = open('data/day10.txt')
l = f.read()
lines = l.split('\n')

bots = dict()
inst = dict()

for l in lines:
    if l == '@':
        break
    print (l)
    
    if l.startswith('bot'):
        b,low,high = int(l.split(' ')[1]), int(l.split(' ')[6]), int(l.split(' ')[11])
        if l.split(' ')[5] == 'output':
            low *= -1
        if l.split(' ')[10] == 'output':
            high *= -1
        
        inst[b] = low,high
        
    
    if l.startswith('value'):
        v, b = int(l.split(' ')[1]), int(l.split(' ')[5])
        if b in bots:
            bots[b].append(v)
        else:
            bots[b] = [v]


for i in inst:
    l,h = inst[i]
    if l > -1 and l not in bots:
        bots[l] = []
    if h > -1 and h not in bots:
        bots[h] = []
        

# print (inst)


changed = True

while changed:
    
    changed = False
    for b in bots:
        # print(bots)
        if len(bots[b]) == 2:
            
            ans = sorted(bots[b])
            if ans[0] == 17 and ans[1] == 61:
                print("Bot", b)
            
            lwr = inst[b][0]
            hgh = inst[b][1]
            
            if lwr > -1:
                bots[lwr].append(sorted(bots[b])[0])
                changed = True
            if hgh > -1:
                bots[hgh].append(sorted(bots[b])[1])
                changed = True
            bots[b] = []
# print(bots)
