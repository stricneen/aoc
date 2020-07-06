start = '00111101111101000'

# Call the data you have at this point "a".
# Make a copy of "a"; call this copy "b".
# Reverse the order of the characters in "b".
# In "b", replace all instances of 0 with 1 and all 1s with 0.
# The resulting data is "a", then a single 0, then "b".

def step(data):
    b = ''
    for c in data:
        d = '0' if c == '1' else '1'
        b = d + b
    return data + '0' + b

def create(data, sizereq, current):
    s = step(data)
    # print(data)
    # print(s)
    # print()
    current = (current * 2) + 1    
    if current >= sizereq:
        return s[0:sizereq]
    else:
        return create(s, sizereq, current)

def checksum(data):
    c = ''
    if len(data) % 2 != 0:
            return data
    
    for i in range(0, len(data), 2):
        c = c + '1' if data[i] == data[i+1] else c + '0'
        
    if len(c) % 2 == 0:
            return checksum(c)
    return c

def rev(inp):
    r = ''
    for c in inp:
        r = c + r
    return r

# def seq(fwd):
#     bck = ''
#     for c in rev(fwd):
#         bck =  bck + '0' if c == '1' else bck + '1'
#     while True:
#         for c in fwd:
#             yield c
#         yield 0
#         for c in bck:
#             yield c
#         yield 1
    
def inter(folds):
    s = '0'
    for _ in range(folds):
        s = step(s)
    return s
    
    

def partchecksum(data):
    c = ''
  
    ctr = data
    while len(ctr) > 1:
        t = ctr[0:2]
        ctr = ctr[2:]
        c = c + '1' if t[0] == t[1] else c + '0'
    c = c + ctr
    
    # for i in range(0, len(data), 2):
    #     if i + 1 > len(data):
    #     c = c + '1' if data[i] == data[i+1] else c + '0'
    return c
    if len(partchecksum(c)) % 2 != 0:
        return c
    
    return partchecksum(c)
    
       

d = create(start, 272, len(start))
c = checksum(d)
print("Part 1 : ", c, c == '10011010010010010')


#create(start, 80, 3)

# def times(start,req):
#     c = start
#     t = 0
#     while c <= req:
#         t += 1
#         c = (c*2) + 1
#     return t

# def hashtimes(size):
#     c = 0
#     while(size % 2 == 0):
#         c += 1
#         size = size / 2
#     return c
  
# 35651584
# t = times(len(start), 272)
# ht = hashtimes(272)
# print(t, ht)

# 10011010010010010

# print(t2)

# c = start
# r = ''

# c1 = step(start)

# h = ''
# t = ''

# '00 11 11 01   11 11 01 00    0 0 1    11 01 00 00   01 00 00 11'









# print()
# gen = seq(start)
# for c in range(272):
#     print (next(gen), end='')

# d = create(start, 35651584, len(start))
# c = checksum(d)
# print("Part 2 : " , c)

