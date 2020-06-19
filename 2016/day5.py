import hashlib 

input2 = 'abc'
input = 'reyedfim'
output = ''
output2 = ['-'] * 8
h = ''
for i in range(1000000000):
    h = hashlib.md5((input+str(i)).encode('utf-8')).hexdigest() 
    if h.startswith("00000"):
        #output += h[5]
        #if len(output) == 8:
        #    break
        print(h)
        if h[5].isdigit():
            if int(h[5]) < 8 and output2[int(h[5])] == '-':
                output2[int(h[5])] = h[6]
                print(output2)
            
            if "-" not in "".join(output2):
                break
        
        
print ("".join(output2))

# e635d627