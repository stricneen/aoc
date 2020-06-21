def inBrackets(codes, l):
    for code in codes:
        
        start = l.index(code)
            
        before = l[:start]
        after = l[start+4:]
        
        b, a = '', ''
        
        for c in before:
            if c == ']' or c == '[':
                b += c
    
        for c in after:
            if c == ']' or c == '[':
                a += c
        
        if len(b) > 0 and len(a) > 0 and b[len(b)-1] == '[' and a[0] == ']':
            return  False
    
    return True

f = open('data/day7.txt')
l = f.read()
lines = l.split('\n')
total = 0
total2 = 0
for l in lines:
    # print (l)
    x = 0
    codes = []
    
    for i in range(0, len(l)- 3):
        if l[i] == l[i+3] and l[i+1] == l[i+2] and l[i] != l[i+1]:
            print(l[i:i+4])
            codes.append(l[i:i+4])
            
   
    if len(codes) > 0:
        valid = inBrackets(codes,l)
        if valid:
            total += 1 

    # Part 2
    # codes2 = []
    # for i in range(0, len(l)- 2):
    #     if l[i] == l[i+2] and l[i] != l[i+1]:
    #         print(l[i:i+3])
    #         codes2.append(l[i:i+3])  
    
    # print(len(codes2))
    # print()
    # if len(codes2) > 1:
        
            
                        
print(total)
print(total2)    
            
# mgftm[bpesperctavrfcn]wgzsbkjyyrbcjzghvlo[gixpf  kuuk   vaoecc]zrvymealuxycdlse[cnmjogkfmapiwvkbk]vcgzczxskqenrst
# kuuk