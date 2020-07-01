f4 = []
# f3 = ['XG','XM','RM','RG')]
# f2 = [('P','M'),('S','M')]
# f1 = [('T','G'),('T','M'),('P','G'),('S','G')]

f3 = ['LG']
f2 = ['HG']
f1 = ['HM', 'LM']


# print(f1)
# print(f2)
# print(f3)

def perms(objs):
    r = []
    for obj in objs:
        r.append([obj])
    for i in range(len(objs)):
        for j in range(i+1,len(objs)):
            r.append([objs[i], objs[j]])
    return r

def removeAll(lst, remove):
    for chip in remove:
        lst.remove(chip)
    return lst

def isSafeSet(s):
    if len(s) != 1:
        for left in s:
            if left[1] == 'G': #ignore generators
                continue
            if left[0] + 'G' in s:
                continue
            return False
    return True
    

# remvoe 
def canmove(objs):
    movable = []
    r = perms(objs)
    for i in r:
        toLeave = [i, removeAll(objs.copy(), i)]
        # print(toLeave)
        take, leave = toLeave
        
        if isSafeSet(leave):
            movable.append(toLeave)
        #     print('doable')
        # else:
        #     print('nope')
    
    return movable

def canMoveTo(lift, floor):
    r = []
    for l in lift:
        s = l[0] + floor
        if isSafeSet(s):
            r.append(l[0])
    return r

def tick(states):
    nextStates = []
    for state in states:
        floor, moves, objs = state
        current = objs[floor]
        movable = canmove(current)
        
        # move up
        if floor < 3:
            movesu = canMoveTo(movable, objs[floor + 1])
            for mv in movesu:
                newFloors = state[2].copy()
                newFloors[floor] =  [x for x in newFloors[floor] if x not in mv]
                newFloors[floor + 1] = newFloors[floor + 1] + mv
                nextStates.append([floor + 1, moves + 1, newFloors])
            
        if floor > 0:
            movesd = canMoveTo(movable, objs[floor - 1])
            for mv in movesd:
                newFloors = state[2].copy()
                newFloors[floor] =  [x for x in newFloors[floor] if x not in mv]
                newFloors[floor - 1] = newFloors[floor - 1] + mv
                nextStates.append([floor - 1, moves + 1, newFloors])
         


    if len(movable) == 0:
        print("oh no")
        
    print(len(nextStates))
        
    done = False 
    for _,moves,floors in nextStates:
        if len(floors[0]) == 0 and len(floors[1]) == 0 and len(floors[2])  == 0:
            done = True
            print (moves)
            print (floors)
    
    
    if done == False:
        tick(nextStates)
    
# bob = canmove(['TG','TM','PG','SG'])

    

start = [[0, 0, [f1, f2 ,f3, f4]]]
tick(start)
