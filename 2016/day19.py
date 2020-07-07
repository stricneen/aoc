inp = 3004953

def calc(num):
    n = 1
    while num >= (2 ** n):
        n += 1
    a = num + (num - (2 ** (n)) + 1)
    return a


print("Part 1", calc(inp))
