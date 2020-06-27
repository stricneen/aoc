import time


f = open('data/day8.txt')
l = f.read()
lines = l.split('\n')

w, h = 7,3
w, h = 50, 6
screen = [[' ' for x in range(w)] for y in range(h)] 

def pm(mat):
    for j in range(len(mat)):
        for i in range(len(mat[j])):
            print(mat[j][i], end='')
        print()
   

for l in lines:
    if l == '@':
        break
    print ()
    print(l)
    
    if l.startswith('rect'): # rect 1x1
        dims = l[5:].split('x')
        for i in range(int(dims[0])):
            for j in range(int(dims[1])):
                screen[j][i] = '#'
    
    if l.startswith('rotate row'): # rotate row y=0 by 7
        dims = l[13:].split(' by ')
        dims = [int(dims[0]), int(dims[1])]
        
        s = screen[dims[0]][:-1 * dims[1]]
        t = screen[dims[0]][-1 * dims[1]:]
        xxxx = t + s
        screen[dims[0]] =  t + s
               

    if l.startswith('rotate column'): # rotate column x=20 by 1
        dims = l[16:].split(' by ')
        dims = [int(dims[0]), int(dims[1])]
        t = ""
        
        for i in range(len(screen)):
            t += screen[i][dims[0]]
            
        for i in range(len(screen)):
            pos = (len(screen) - dims[1] + i) % h
            screen[i][dims[0]] = t[pos]
        
    

    time.sleep(0.1)
    
    pm (screen)
    
    # 59
    
total = 0
for j in range(len(screen)):
    for i in range(len(screen[j])):
        if screen[j][i] == '#':
            total += 1
print(total)
    
    
    
# That's not the right answer; your answer is too low. Curiously, it's the right answer for someone else; you might be logged in to the wrong account or just unlucky. In any case, you need to be using your puzzle input. If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 110.) [Return to Day 8]
# 110   95


