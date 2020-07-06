import hashlib

inp = 'edjrjqaa'
op = 'bcdef'

def md5(inp):
    return hashlib.md5(inp.encode('utf-8')).hexdigest() 

def doors(inp):
    h = md5(inp)
    u,d,l,r = h[0] in op, h[1] in op, h[2] in op, h[3] in op
    return (u,d,l,r)

def run(states):
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
    
    for x,y,code in next:
        if x == 3 and y == 3:
            print ("Part 1", code[8:])
            return
           

    
    if len(next) > 0:
        run(next)
      

# start = [(0, 0, 'hijkl')]
# run(start)

t1 = 'ihgpwlah' # DDRRRD
t2 = 'kglvqrro' # DDUDRLRRUDRD
                # DDUDRLRRUDRD
t3 = 'ulqzkmiv' # DRURDRUDDLLDLUURRDULRLDUUDDDRR
                # DRURDRUDDLLDLUURRDULRLDUUDDDRR

start = [(0, 0, inp)]
run(start)
