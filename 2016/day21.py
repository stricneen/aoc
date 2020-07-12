f = open('data/day21.txt')
l = f.read()
lines = l.split('\n')

password = 'abcdefgh'
# password = 'abcde'

def scramble(lines, password):
    chars = [char for char in password]  
    steps = [password]
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
            
        steps.append(''.join(chars))
    
    return ''.join(chars), steps
    
def descramble(lines, password):
    chars = [char for char in password]
    rlines = reversed(lines)
    steps = [password]
    for l in rlines:
        if l == '@':
            break

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
    
        # if l.startswith("rotate left"):
        if l.startswith("rotate right"):
            x = int(p[2])
            s = chars[:x]
            e = chars[x:]
            chars = e + s
            f=True

        # if l.startswith("rotate right"):
        if l.startswith("rotate left"):
            x = int(p[2])
            s = chars[-x:]
            e = chars[0:len(chars) - len(s)]
            chars = s + e
            f=True
            
        if l.startswith("rotate based"): # rotate based on position of letter e
            x = chars.index(p[6])
            
            if x == 7:
                x = 4
            elif x == 6:
                x = 0
            elif x == 2:
                x = 6
            elif x == 4:
                x = 7
            elif x == 0:
                x = 1
            elif x == 5:
                x = 3
                  
            # x-------  -x------
            # -x------  ---x----
            # --x-----  -----x--
            # ---x----  -------x
            # 01234567
            # ----x---  -x------
            # -----x--  ---x----
            # ------x-  -----x--
            # -------x  -------x
            
                
            for _ in range(x):
                s = chars[:1]
                e = chars[1:]
                chars = e + s
            f=True

        if l.startswith("move position"): # move position 6 to position 0
            i = int(p[5])
            c = chars[i]
            chars.remove(c)
            chars.insert(int(p[2]), c)
            f=True

        if l.startswith("reverse positions"): # reverse positions 2 through 6
            x,y = int(p[2]), int(p[4])
            copy = chars.copy()
            for i in range(x ,y+1):
                chars[i] = copy[x+y-i]
            f=True
        
        if not f:
            print(l)
    
        steps.append(''.join(chars))
    
    return ''.join(chars), steps

def pt(colour, text):
    if colour == 'red':
        return '\033[91m' + text
    if colour == 'grn':
        return '\033[92m' + text
    return text


s, s1 = scramble(lines, password)
print("Part 1", s, s == 'dgfaehcb')


d, s2 = descramble(lines, s)
print("Part 2", d, d == password) # edgbcfah

s2 = s2[::-1]

for i in range(len(s1)):
    
    if s1[i] == s2[i]:
        print(pt('grn', ''))
    else:
        print(pt('red', ''))
    eq = str(s1[i] == s2[i])
    print(s1[i], s2[i], eq)
    
    if i <= len(lines) - 1:
        print(lines[i])