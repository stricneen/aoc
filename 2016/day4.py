f = open('data/day4.txt')
l = f.read()
lines = l.split('\n')
total = 0
for l in lines:
    
    t = l.split('-')
    
    code = ""
    for c in t[:-1]:
        code += c       
    section = int(t[-1].split('[')[0])
    checksum = t[-1].split('[')[1][:-1]
    
    chars = {}
    for one in range(97,123):
        chars[chr(one)] = code.count(chr(one))
        
    a = sorted(chars)
    b = sorted(chars.values(), reverse=True)
#    c = [chars for (key, value) in sorted(chars.keys())]
    ord = ""
    for i in range(30,0,-1):
        if len(ord) == 5:
            break
        for j in chars.keys():
            if chars[j] == i:
                ord += j
                
    if ord[0:5] == checksum:
        total += section
        print ('---valid---')
    t = ord[0:5]
    
    print (l)
    print (total)

# 235196  tl