start = '00111101111101000'

# Call the data you have at this point "a".
# Make a copy of "a"; call this copy "b".
# Reverse the order of the characters in "b".
# In "b", replace all instances of 0 with 1 and all 1s with 0.
# The resulting data is "a", then a single 0, then "b".

def step(data):
    b = ''.join('0' if c=='1' else '1' for c in reversed(data))
    return '{}0{}'.format(data,b)

def create(data, sizereq):
    s = step(data)
    if len(s) >= sizereq:
        return s[0:sizereq]
    else:
        return create(s, sizereq)

def checksum(data):
    c = []
    if len(data) % 2 != 0:
            return data
    for i in range(0, len(data), 2):
        c.append('1' if data[i] == data[i+1] else '0')
    c = ''.join(c)
    if len(c) % 2 == 0:
            return checksum(c)
    return c


d = create(start, 272)
c = checksum(d)
print("Part 1 : ", c, c == '10011010010010010')

d = create(start, 35651584)
c = checksum(d)
print("Part 2 : ", c)