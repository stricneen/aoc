f = open('data/day9.txt')
l = f.read()

# print(l)

def decompress(i):
    if '(' in i:
        pre = i[0:i.index('(')]
        post = i[i.index(')')+1:]
        marker = i[i.index('(')+1:i.index(')')]
        marker = marker.split('x')
        marker = [int(marker[0]), int(marker[1])]
        
        dup = post[0:marker[0]] 
        
        if post.startswith(dup):
            post = post[len(dup):]
        
        return pre + (dup * marker[1]) + decompress(post)
        
    
    else:
        return i


d = decompress(l)
print("part 1 : ", len(d))



# (25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN

# (25x3)    (3x3)ABC(2x3)XY(5x2)PQRST       X(18x9)(3x2)TWO(5x7)SEVEN



def decompress_v2(l, total):
    
    if '(' not in l:
        total += len(l)
        return total
    
   
    pre = l[0:l.index('(')]
    post = l[l.index(')')+1:]
    marker = l[l.index('(')+1:l.index(')')]
    marker = marker.split('x')
    sub, times = [int(marker[0]), int(marker[1])]
    
    
    nxt = post[0:sub]
    rest = post[sub:]
    return len(pre) + (decompress_v2(nxt,  total) * times) + decompress_v2(rest, 0)
    

t1 = "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN"
t2 = "(27x12)(20x12)(13x14)(7x10)(1x12)A"

tt1 = decompress_v2(t1 , 0)    
tt2 = decompress_v2(t2 , 0)    


print(tt1)
print(tt2)


answer = decompress_v2(l,0)
print("part 2: ", answer)






# (3x3)XYZ still becomes XYZXYZXYZ, as the decompressed section contains no markers.
# X(8x2)(3x3)ABCY becomes XABCABCABCABCABCABCY, because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.
# (27x12)(20x12)(13x14)(7x10)(1x12)A decompresses into a string of A repeated 241920 times.
# (25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN becomes 445 characters long.






# X(8x2)(3x3)ABCY
# X(3x3)ABC(3x3)ABCY
# XABCABCABCABCABCABCY

# (27x12)(20x12)(13x14)(7x10)(1x12)A

# (20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A(20x12)(13x14)(7x10)(1x12)A




# (6x3)(6x5)A
# (6x5)A(6x5)A(6x5)A



# (25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN

# (25x3)    (3x3)ABC(2x3)XY(5x2)PQRST       X(18x9)(3x2)TWO(5x7)SEVEN

#  3 *
# (25x3)    (3x3)ABC(2x3)XY(5x2)PQRST           X(18x9)(3x2)TWO(5x7)SEVEN
                                            



