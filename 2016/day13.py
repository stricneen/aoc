
num = 1364
#num = 10

def isEmpty(x,y):
    n = (x*x) + (3*x) + (2*x*y) + y + (y*y) + num
    b = str(bin(n))
    return b.count('1') % 2 == 0

def notVisited(pos,x,y):
    for xx,yy,_ in pos:
        if xx == x and yy == y:
            return False
    return True 

def tick(pos, dist):
    n = []
    for p in pos:
        x,y,c = p
        
        if x >= 0 and y >= 0:
            if isEmpty(x-1,y) and notVisited(pos,x-1,y) and x-1>=0:
                n.append((x-1,y,c+1))
            if isEmpty(x+1,y) and notVisited(pos,x+1,y):
                n.append((x+1,y,c+1))
            if isEmpty(x,y-1) and notVisited(pos,x,y-1) and y-1>=0:
                n.append((x,y-1,c+1))
            if isEmpty(x,y+1) and notVisited(pos,x,y+1):
                n.append((x,y+1,c+1))
    
    # for x,y,c in n:
    #     if x == 31 and y == 39:
    #         print("Part 1", c)
    #         return
    
    if dist == 49:
        cc = {}
        for pn in pos + n:
            cc[pn] = 1
        print ("Part 2", len(cc))
        
        return
    
    tick(pos + n, dist + 1)
    
start = [(1,1,0)]
tick(start, 0)

# 162 too high