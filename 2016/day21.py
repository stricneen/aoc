f = open('data/day21.txt')
l = f.read()
lines = l.split('\n')

password = 'abcdefgh'
# password = 'abcde'

def scramble(lines, password):
    chars = [char for char in password]  
    for l in lines:
        if l == '@':
            break
        # print(l)
        
        # l = 'rotate right 1 steps'
        f = False
        p = l.split(' ')
        if l.startswith("swap position"): # swap position 2 with position 3
            x, y = int(p[2]), int(p[5])
            t = chars[x]
            chars[x] = chars[y]
            chars[y] = t
            f=True
        
        if l.startswith("swap letter"): # swap letter b with letter f
            x, y = p[2], p[5]
            xi = chars.index(x)
            yi = chars.index(y)
            chars[xi] = y
            chars[yi] = x
            f=True
    
        if l.startswith("rotate left"):
            x = int(p[2])
            s = chars[:x]
            e = chars[x:]
            chars = e + s
            f=True

        if l.startswith("rotate right"):
            x = int(p[2])
            s = chars[-x:]
            e = chars[0:len(chars) - len(s)]
            chars = s + e
            f=True
            
        if l.startswith("rotate based"): # rotate based on position of letter e
            x = chars.index(p[6]) + 1
            if x >= 5:
                x+=1
            for _ in range(x):
                s = chars[:-1]
                e = [chars[-1]]
                chars = e + s
            f=True

        if l.startswith("move position"): # move position 6 to position 0
            i = int(p[2])
            c = chars[i]
            chars.remove(c)
            chars.insert(int(p[5]), c)
            f=True

        if l.startswith("reverse positions"): # reverse positions 2 through 6
            x,y = int(p[2]), int(p[4])
            copy = chars.copy()
            for i in range(x ,y+1):
                chars[i] = copy[x+y-i]
            f=True
        
        if not f:
            print(l)
    
    return ''.join(chars) 
    
def descramble(lines, password):
    chars = [char for char in password]
    rlines = reversed(lines)
    for l in rlines:
        if l == '@':
            break
        # print(l)
        
        # l = 'rotate right 1 steps'
        f = False
        p = l.split(' ')
        if l.startswith("swap position"): # swap position 2 with position 3
            x, y = int(p[2]), int(p[5])
            t = chars[x]
            chars[x] = chars[y]
            chars[y] = t
            f=True
        
        if l.startswith("swap letter"): # swap letter b with letter f
            x, y = p[2], p[5]
            xi = chars.index(x)
            yi = chars.index(y)
            chars[xi] = y
            chars[yi] = x
            f=True
    
        if l.startswith("rotate left"):
            x = int(p[2])
            s = chars[:x]
            e = chars[x:]
            chars = e + s
            f=True

        if l.startswith("rotate right"):
            x = int(p[2])
            s = chars[-x:]
            e = chars[0:len(chars) - len(s)]
            chars = s + e
            f=True
            
        if l.startswith("rotate based"): # rotate based on position of letter e
            x = chars.index(p[6]) + 1
            if x >= 5:
                x+=1
            for _ in range(x):
                s = chars[:-1]
                e = [chars[-1]]
                chars = e + s
            f=True

        if l.startswith("move position"): # move position 6 to position 0
            i = int(p[2])
            c = chars[i]
            chars.remove(c)
            chars.insert(int(p[5]), c)
            f=True

        if l.startswith("reverse positions"): # reverse positions 2 through 6
            x,y = int(p[2]), int(p[4])
            copy = chars.copy()
            for i in range(x ,y+1):
                chars[i] = copy[x+y-i]
            f=True
        
        if not f:
            print(l)
    
    return ''.join(chars) 

s = scramble(lines, password)
print("Part 1", s, s == 'dgfaehcb')


d = descramble(lines, s)
print("Part 2", d, d == password) # edgbcfah