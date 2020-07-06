inp = '.^.^..^......^^^^^...^^^...^...^....^^.^...^.^^^^....^...^^.^^^...^^^^.^^.^.^^..^.^^^..^^^^^^.^^^..^'

test = '..^^.'

rows = 2

def nxt(row):
    n = []
    r = '.{}.'.format(row)
    for i in range(0, len(row)):
        t = r[i:i+3]
        if t == '^^.' or t == '.^^' or t == '^..' or t == '..^':
            n.append('^')
        else:
            n.append('.')
    return ''.join(n)


start = inp # '.^^.^.^^^^'
#print(start)
total = 0
total += len(start.replace('^',''))
for r in range(399999):
    start = nxt(start)
    total += len(start.replace('^',''))
    #print(start)


print(total)