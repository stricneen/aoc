f = open('data/day21.txt')
l = f.read()
lines = l.split('\n')

password = 'abcdefgh'
chars = [char for char in password]  

for l in lines:
    if l == '@':
        break
    print(l)
    
    l = 'rotate right 1 steps'
    
    p = l.split(' ')
    if l.startswith("swap position"): # swap position 2 with position 3
        x, y = int(p[2]), int(p[5])
        t = chars[x]
        chars[x] = chars[y]
        chars[y] = t
    
    if l.startswith("swap letter"): # swap letter b with letter f
        x, y = p[2], p[5]
        xi = chars.index(x)
        yi = chars.index(y)
        chars[xi] = y
        chars[yi] = x
        
    if l.startswith("rotate left"):
        x = int(p[2])
        s = chars[:x]
        e = chars[x:]
        chars = e + s
        
    if l.startswith("rotate right"):
        x = int(p[2])
        s = chars[-x:]
        e = chars[0:len(chars)-1]
        chars = s + e
        
    