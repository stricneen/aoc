import hashlib

input = 'ahsbgdzn'
# input = 'abc'

def hasMatch(i,k):
    for tt in range(i, i+1000):
        h2 = hashlib.md5((input+str(tt)).encode('utf-8')).hexdigest() 
        for t2 in range(len(h2) - 4):
            if h2[t2] == k and h2[t2+1] == k and h2[t2+2] == k and h2[t2+3] == k and h2[t2+4] == k:
                return True
    return False

c=0
for i in range(1000000):
    
    h = hashlib.md5((input+str(i)).encode('utf-8')).hexdigest() 
    
    for t in range(len(h) - 2):
        if h[t] == h[t+1] and h[t] == h[t+2]:
            
            if hasMatch(i+1, h[t]):    
                c+=1
                print(c,i,h)
            break
        
            
    if c == 64:
        break