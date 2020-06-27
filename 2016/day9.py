f = open('data/day9.txt')
l = f.read()

# print(l)

def decompress(i):
    if '(' in i:
        pre = i[0:i.index('(')]
        post = i[i.index(')')+1:]
        # print(pre,post)
        marker = i[i.index('(')+1:i.index(')')]
        marker = marker.split('x')
        marker = [int(marker[0]), int(marker[1])]
        # print(marker)
        
        dup = post[0:marker[0]] 
        
        if post.startswith(dup):
            post = post[len(dup):]
        
        return pre + (dup * marker[1]) + decompress(post)
        
    
    else:
        return i


# print(decompress("ADVENT"))
# print()
# print(decompress("A(1x5)BC"))
# print()
# print(decompress("(3x3)XYZ"))
# print()
# print(decompress("A(2x2)BCD(2x2)EFG"))
# print()
# print(decompress("(6x1)(1x3)A"))
# print()
# print(decompress("X(8x2)(3x3)ABCY"))


d = decompress(l)
print(len(d))