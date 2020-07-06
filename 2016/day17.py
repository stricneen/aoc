import hashlib

op = 'bcdef'

def md5(inp):
    return hashlib.md5(inp.encode('utf-8')).hexdigest() 

def doors(inp):
    h = md5(inp)
    u,d,l,r = h[0] in op, h[1] in op, h[2] in op, h[3] in op
    return (u,d,l,r)

def run(states, mx):
    next = []
    for x,y,code in states:
       u, d, l, r = doors(code)
       
       if x > 0 and l:
           next.append((x-1,y,'{}{}'.format(code, 'L')))
       if x < 3 and r:
           next.append((x+1,y,'{}{}'.format(code, 'R')))
       if y > 0 and u:
           next.append((x,y-1,'{}{}'.format(code, 'U')))
       if y < 3 and d:
           next.append((x,y+1,'{}{}'.format(code, 'D')))
           
    #print(next)
    n = []
    for x,y,code in next:
        if x == 3 and y == 3:
            path = len(code[8:])
            if path > mx:
                mx = path
                print(mx)
        else:
            n.append((x,y,code))

    
    if len(n) > 0:
        run(n, mx)
      

# start = [(0, 0, 'hijkl')]
# run(start)

t1 = 'ihgpwlah' # 370
t2 = 'kglvqrro' # 492
t3 = 'ulqzkmiv' # 830
                
inp = 'edjrjqaa'
start = [(0, 0, inp)]
run(start,0)
