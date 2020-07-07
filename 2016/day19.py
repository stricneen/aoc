inp = 3004953

def calc(num):
    n = 1
    while num >= (2 ** n):
        n += 1
    a = num + (num - (2 ** (n)) + 1)
    return a


print("Part 1", calc(inp))





# t = []
# for i in range(1, inp+1):
#     t.append(i)
    
# elf = 1
# while len(t) > 1:
#     c = t.index(elf)
#     n = t[(c+1)%len(t)]
#     elf = t[(c+2)%len(t)]
#     t.remove(n)
#     print(len(t))
    
# print(t)

# 1 2 3 4 5
# 1   3 4 5
# 1   3   5
