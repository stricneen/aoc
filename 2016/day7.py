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

def inBrackets2(codes, l):
    for code in codes:
        oppo = code[1] + code [0] + code [1]
        if oppo in l:
            if inBra(oppo,l) and (inBra(code,l) == False):
                print(l)
                print(code)
                print()
                return True
    return False

# 208 - 219 - 221 - 247


        
def inBra(code,l):
    indexes = [i for i in range(len(l)) if l.startswith(code, i)]
    
    if len(indexes) > 1:
        print(indexes)
    
    for ind in indexes:
        before = l[:ind]
        after = l[ind+3:]
        
        b, a = '', ''
        
        for c in before:
            if c == ']' or c == '[':
                b += c

        for c in after:
            if c == ']' or c == '[':
                a += c
                
        
        if len(b) > 0 and len(a) > 0 and b[len(b)-1] == '[' and a[0] == ']':
            return  True
        
        print(b,a)
    return False

def split(l):
    end = '-' + l[l.rfind(']'):]
    out = ''
    ins = ''
    while '[' in l:
        
        op = l.index('[')
        cl = l.index(']')
        
        out += l[0:op + 1]
        ins += l[op:cl]
        
        l = l[cl+1:]
  
        
    return (out + end, ins)

f = open('data/day7.txt')
l = f.read()
lines = l.split('\n')
total = 0
total2 = 0
t = 0
for l in lines:

    i, o = split(l)
    
    for ind in range(0, len(i)-2):
        op = i[ind:ind+3]
        
        if op[0] == op[2] and op[0] != op[1] and '[' not in op and ']' not in op:
            opp = op[1] + op[0] + op[1]
            print(op)
            print(opp)
            if opp in o:
                total2 += 1
                print('match')
                break
            
    
    print(l)
    print(i)
    print(o)
    
    print()
    
    
    # print (l)
    # t += 1
    # x = 0
    # codes = []
    
    # for i in range(0, len(l)- 3):
    #     if l[i] == l[i+3] and l[i+1] == l[i+2] and l[i] != l[i+1]:
    #         # print(l[i:i+4])
    #         codes.append(l[i:i+4])
            
   
    # if len(codes) > 0:
    #     valid = inBrackets(codes,l)
    #     if valid:
    #         total += 1 

    # # Part 2
    # codes2 = []
    # for i in range(0, len(l)- 2):
    #     if l[i] == l[i+2] and l[i] != l[i+1]:
    #         # print(l[i:i+3])
    #         codes2.append(l[i:i+3])  
    
    # if len(codes2) > 1:
    #     valid = inBrackets2(codes2,l)
    #     if valid:
    #         total2 += 1  
            
    # print(len(codes2))
    # print()
    # if len(codes2) > 1:
        
            
                        
#print(total)
print(total2)    
#print(t)               
# mgftm[bpesperctavrfcn]wgzsbkjyyrbcjzghvlo[gixpf  kuuk   vaoecc]zrvymealuxycdlse[cnmjogkfmapiwvkbk]vcgzczxskqenrst
# kuuk