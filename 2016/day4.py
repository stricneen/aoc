def decode(cr):
    r = ''
    offset = int(cr.split('-')[-1])
    for ch in cr:
        if ch == '-':
            r += ' '
        else:
            rrrr = (((ord(ch) - 96) + offset) % 26) + 96
            r += chr(rrrr)
    return r


# test = 'qzmt-zixmtkozy-ivhz-343'
# out = decode(test)
# print(out)

f = open('data/day4.txt')
l = f.read()
lines = l.split('\n')
total = 0
for l in lines:
    
    t = l.split('-')
    
    code = ""
    cipher = ""
    for c in t[:-1]:
        code += c    
        cipher += c + '-'   
    section = int(t[-1].split('[')[0])
    checksum = t[-1].split('[')[1][:-1]
    
    cipher = cipher + t[-1].split('[')[0]
    print(decode(cipher), section)
    
    chars = {}
    for one in range(97,123):
        chars[chr(one)] = code.count(chr(one))
        
    a = sorted(chars)
    b = sorted(chars.values(), reverse=True)
#    c = [chars for (key, value) in sorted(chars.keys())]
    ordinal = ""
    for i in range(30,0,-1):
        if len(ordinal) == 5:
            break
        for j in chars.keys():
            if chars[j] == i:
                ordinal += j
                
    if ordinal[0:5] == checksum:
        total += section
       
    t = ordinal[0:5]
    
    # print (l)
print (total)

# 235196  tl