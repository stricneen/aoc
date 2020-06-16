module Day22

open Utils
open System.Numerics

// deal into new stack
// deal with increment 21
// cut -1639

let day22 = 
    print "Advent of code - Day 22 - Slam Shuffle"

    let ins = readLines "./data/day22.txt" |> Array.toList

    let startDeck = [ 0 .. 10006 ]


    //printf "%A\n" startDeck

    let getNumber (line:string) =
        int(line.Split(' ') |> Array.last)


    let getL (line:string) =
        int64(line.Split(' ') |> Array.last)

    let cut (deck:list<int>) (pos:int) = 
        if pos > 0 then
            deck.[pos..] @ deck.[0..pos-1]
        else
            let len = List.length deck
            (deck |> List.skip (len + pos)) @ (deck |> List.take (len + pos))

    let updateEle (lst:list<int>) index itm =
        lst.[0..index - 1] @ [ itm ] @ lst.[index + 1 ..]

    let increment2 (deck:list<int>) (pos:int) =
        let len = List.length deck
        let position i =  ((pos-i % pos)*pos +  (i/pos + 1)) % pos
        deck |> List.map position

    let increment (deck:list<int>) (pos:int) =
        let len = List.length deck
        let mutable nw = List.init len (fun x -> 0)
        for x in 0 .. len - 1 do
            let pos = (x * pos) % len
            //printf "%A\n" pos
            nw <- updateEle nw pos deck.[x] 
        nw              
        
    let shuffle deck (line: string) =
        match line with
        | l when l.Contains("stack") -> deck |> List.rev
        | l when l.Contains("increment") -> increment deck (getNumber line)
        | l when l.Contains("cut") -> cut deck (getNumber line)
        | _ -> failwith "Unknown shuffle"
        

    // let ns = shuffle startDeck "deal into new stack"
    // let ns = shuffle startDeck "cut -4"
    // let ns = shuffle startDeck "deal with increment 3"
  
    let rec shf deck c =
        if c > (List.length ins) - 1 then
            deck
        else
            let instr = ins.[c]
            print instr
            let shuf = shuffle deck instr
            shf shuf (c + 1)


   // let r = shf startDeck 0

    // printf "%A\n" r
  
    // let pos = r |> List.tryFindIndex(fun x -> x = 2019)
    // printf "pos : %A\n" pos

    let m = 119315717514047L
    let n = 101741582076661L
    let pos = 2020L

//   shuffles = { 'deal with increment ': lambda x,m,a,b: (a*x %m, b*x %m),
//  'deal into new stack': lambda _,m,a,b: (-a %m, (m-1-b)%m),
//  'cut ': lambda x,m,a,b: (a, (b-x)%m) }

    let incx x m a b = (a * x) % m, ( b * x) % m

    let stack _ m a b = (-a % m, (m - 1L - b) % m )

    let cut x m a b = (a, (b-x)%m)

    

    let powL (x: int64) (y: int64) (m: int64) =
        let x' = BigInteger x 
        let y' = BigInteger y 
        let m' = BigInteger m 
        let p = BigInteger.ModPow( x', y', m')
        int64(p)

    let shuffle2 (line: string) c a b =
            match line with
            | l when l.Contains("stack") -> stack ' ' c a b
            | l when l.Contains("increment") -> incx (getL line) c a b
            | l when l.Contains("cut") -> cut (getL line) c a b
            | _ -> failwith "Unknown shuffle"

    let rec shf2 c a b =
        if c > (List.length ins) - 1 then
            a,b
        else
            let instr = ins.[c]
            print instr
            let a',b' = shuffle2 instr m a b
            shf2 (c + 1) a' b'

    let a,b = shf2 0 1L 0L
    let r =  (b * (powL (1L - a)  (m - 2L)  m)) % m
    let rs = ((pos - r) * (powL a (n * (m - 2L)) m) + r) % m
    printf "%A \n" rs

    // 3920265924568
(*
m = 119315717514047
n = 101741582076661
pos = 2020
shuffles = 
a,b = 1,0
with open('ex.input') as f:
  for s in f.read().strip().split('\n'):
    for name,fn in shuffles.items():
      if s.startswith(name):
        arg = int(s[len(name):]) if name[-1] == ' ' else 0
        a,b = fn(arg, m, a, b)
        break
r = (b * pow(1-a, m-2, m)) % m
# print(f"Card at #{pos}: {((pos - r) * pow(a, n*(m-2), m) + r) % m}")
rs = ((pos - r) * pow(a, n*(m-2), m) + r) % m
print rs
*)

    0

