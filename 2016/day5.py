import hashlib 

input2 = 'abc'
input = 'reyedfim'
output = ''
h = ''
for i in range(1000000000):
    h = hashlib.md5((input+str(i)).encode('utf-8')).hexdigest() 
    if h.startswith("00000"):
        output += h[5]
        if len(output) == 8:
            break
print (output)