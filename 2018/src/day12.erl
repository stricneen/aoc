-module(day12).
-export([run/0]).

run() ->

    %TPlants = ".....#..#.#..##......###...###.....",
    % TTrans = dict:from_list([{"...##", "#"},
    %         {"#.#.#", "#"},
    %         {".###.", "."},
    %         {"#.#..", "."},
    %         {".#..#", "."},
    %         {"#..#.", "."},
    %         {"..##.", "."},
    %         {"....#", "."},
    %         {"#....", "."},
    %         {"###..", "#"},
    %         {".####", "#"},
    %         {"###.#", "#"},
    %         {"#..##", "."},
    %         {".....", "."},
    %         {"##.##", "#"},
    %         {"####.", "#"},
    %         {"##.#.", "#"},
    %         {"#...#", "."},
    %         {"#####", "."},
    %         {"..#..", "#"},
    %         {".#.#.", "#"},
    %         {"#.###", "#"},
    %         {".##.#", "."},%
    %         {"..#.#", "."},
    %         {".#.##", "#"},
    %         {"...#.", "."},
    %         {"##...", "."},
    %         {"##..#", "."},
    %         {".##..", "#"},
    %         {".#...", "#"},
    %         {"#.##.", "."},
    %         {"..###", "."}]),

    Plants = ".....##.#.#.##..#....######..#..#...#.#..#.#.#..###.#.#.#..#..###.##.#..#.##.##.#.####..##...##..#..##.#...",
    Trans = dict:from_list([{"...##", "#"},
            {"#.#.#", "#"},
            {".###.", "#"},
            {"#.#..", "."},
            {".#..#", "#"},
            {"#..#.", "#"},
            {"..##.", "."},
            {"....#", "."},
            {"#....", "."},
            {"###..", "#"},
            {".####", "#"},
            {"###.#", "."},
            {"#..##", "#"},
            {".....", "."},
            {"##.##", "#"},
            {"####.", "."},
            {"##.#.", "."},
            {"#...#", "."},
            {"#####", "."},
            {"..#..", "."},
            {".#.#.", "."},
            {"#.###", "."},
            {".##.#", "."},
            {"..#.#", "."},
            {".#.##", "#"},
            {"...#.", "."},
            {"##...", "#"},
            {"##..#", "#"},
            {".##..", "."},
            {".#...", "#"},
            {"#.##.", "#"},
            {"..###", "."}]),

        %io:format("~p~n", [Plants]),
        %io:format("~p~n", [Trans]),
    
    
    
    
    
    %io:format("~p~n", [Plants]),

    Gen = gen(Plants,Trans, 20),
    io:format("Part 1 : ~p~n", [score(Gen)]),

    P2Input = 50000000000,
    io:format("Part 1 : ~p~n", [((P2Input+10) * 38) +4])

    %=((D10+10) * 38) +4
    % io:format("~p\t~p~n", [200, score(gen(Plants,Trans, 200))]),
    % io:format("~p\t~p~n", [300, score(gen(Plants,Trans, 300))]),


    % io:format("~p\t~p~n", [400, score(gen(Plants,Trans, 400))]),

    % io:format("~p\t~p~n", [500, score(gen(Plants,Trans, 500))]),
    % io:format("~p\t~p~n", [501, score(gen(Plants,Trans, 501))]),
    % io:format("~p\t~p~n", [502, score(gen(Plants,Trans, 502))]),
    % io:format("~p\t~p~n", [503, score(gen(Plants,Trans, 503))]),
    % io:format("~p\t~p~n", [504, score(gen(Plants,Trans, 504))]),


    % io:format("~p\t~p~n", [400, score(gen(Plants,Trans, 400))]),
    % io:format("~p\t~p~n", [401, score(gen(Plants,Trans, 401))]),
    % io:format("~p\t~p~n", [402, score(gen(Plants,Trans, 402))]),
    % io:format("~p\t~p~n", [403, score(gen(Plants,Trans, 403))]),
    % io:format("~p\t~p~n", [404, score(gen(Plants,Trans, 404))])

.

score(L) ->
    {_,Scoring} = lists:split(2, L),
    Offset = -3,

    Scores = lists:zipwith(fun(S,V) -> 
        R = case S of 
            35 -> V;
            _ -> 0
        end,
       R end,
      Scoring, lists:seq(Offset, length(Scoring)+Offset-1)),

    %io:format("~p~n", [Scores]),
    lists:sum(Scores).



gen(Plants, Trans, C) -> 
     Folder = fun(Plant, N) ->
        {_,I} = lists:split(Plant, Plants),
        N ++ dict:fetch(element(1, lists:split(5,I)), Trans)
    end,

    Gen = lists:foldl(
        Folder,
        "..",
        lists:seq(0, length(Plants)-5) ) ++ "...",
    
    %io:format("~p~n", [Gen]),
    
    case C of 
        1 -> Gen;
        _ -> gen(Gen, Trans, C-1)
    end.
    
    



