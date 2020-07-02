import hashlib

input = 'ahsbgdzn'
#input = 'abc'

def stretch(h):
    for i in range(2016):
        h = hashlib.md5(h.encode('utf-8')).hexdigest() 
    return h
        

def hasMatch(i,k):
    for tt in range(i, i+1000):
        h2 = hashlib.md5((input+str(tt)).encode('utf-8')).hexdigest() 
        h2 = stretch(h2)
        for t2 in range(len(h2) - 4):
            if h2[t2] == k and h2[t2+1] == k and h2[t2+2] == k and h2[t2+3] == k and h2[t2+4] == k:
                return True
    return False

c=0
for i in range(1000000):
    
    h = hashlib.md5((input+str(i)).encode('utf-8')).hexdigest() 
    h = stretch(h)
    for t in range(len(h) - 2):
        if h[t] == h[t+1] and h[t] == h[t+2]:
            
            if hasMatch(i+1, h[t]):    
                c+=1
                print(c,i,h)
            else:
                print (i)
            break
        
            
    if c == 64:
        break