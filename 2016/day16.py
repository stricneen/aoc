start = '00111101111101000'

# Call the data you have at this point "a".
# Make a copy of "a"; call this copy "b".
# Reverse the order of the characters in "b".
# In "b", replace all instances of 0 with 1 and all 1s with 0.
# The resulting data is "a", then a single 0, then "b".

def step(data):
    b = ''
    # while len(data) % 2 == 0:
    #     print(len(data))
    data = partchecksum(data)
    
    for c in data:
        d = '0' if c == '1' else '1'
        b = d + b
    return data + '0' + b

def create(data, sizereq, current):
    s = step(data)
    
    current = (current * 2) + 1    
    print(current, sizereq)
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
print("Part 1 : " , c, c=='10011010010010010')

# d = create(start, 35651584, len(start))
# c = checksum(d)
# print("Part 2 : " , c)
