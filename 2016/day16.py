start = '00111101111101000'



# Call the data you have at this point "a".
# Make a copy of "a"; call this copy "b".
# Reverse the order of the characters in "b".
# In "b", replace all instances of 0 with 1 and all 1s with 0.
# The resulting data is "a", then a single 0, then "b".

def step(data):
    b = ''
    while len(data) % 2 == 0:
        data = partchecksum(data)
    
    for c in data:
        d = '0' if c == '1' else '1'
        b = d + b
    return data + '0' + b

def create(data, ln):
    s = step(data)
    # print(len(s))
    # print(s)
    if len(s) >= ln:
        return s[0:ln]
    else:
        # print(35651584 - len(s))
        return create(s, ln)



def checksum(data):
    c = ''
    for i in range(0, len(data), 2):
        c = c + '1' if data[i] == data[i+1] else c + '0'
        
    if len(c) % 2 == 0:
            return checksum(c)
    return c

  
def partchecksum(data):
    c = ''
    for i in range(0, len(data), 2):
        c = c + '1' if data[i] == data[i+1] else c + '0'
        
    if len(partchecksum(c)) % 2 != 0:
        return c
    
    return partchecksum(c)
    
       

d = create(start, 272)
c = checksum(d)

print("Part 1 : " , c, c=='10011010010010010')




# d = create(start, 35651584)
# c = checksum(d)
# print("Part 21 : " , c)
