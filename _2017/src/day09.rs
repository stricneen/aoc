

pub fn day9() {
    let filename = "data/day09.txt";
    for line in common::common::FileLines::new(filename.to_string()) {

        let p1 = count_groups((0,0), &remove_garbage(&line));
        println!("Part 1 : {}",  p1.1);
        

        assert_eq!("{{}}", remove_garbage("{{<!>},{<!>},{<!>},{<a>}}"));
        assert_eq!("{{},{},{},{}}", remove_garbage("{{<a>},{<a>},{<a>},{<a>}}"));
        assert_eq!("{}", remove_garbage("{<{},{},{{}}>}"));

        assert_eq!((0,1), count_groups((0,0), &remove_garbage("{}")));
        assert_eq!((0,6), count_groups((0,0), &remove_garbage("{{{}}}")));
        assert_eq!((0,16), count_groups((0,0), &remove_garbage("{{{},{},{{}}}}")));
        assert_eq!((0,9), count_groups((0,0), &remove_garbage("{{<!!>},{<!!>},{<!!>},{<!!>}}")));
    
        
        let x = common::common::count_regex(&common::common::remove_regex(&line, r"!."), "<.*?>");
        println!("Part 2 : {}", x); 
    }
}

fn count_groups(acc: (i32, i32), groups: &str) -> (i32,i32) {

    if groups.len() == 0 {
        return acc;
    }

    match groups.chars().nth(0).unwrap() {
        '{' => count_groups( (acc.0 + 1, acc.1 + acc.0 + 1), &groups[1..] ),
        '}' => count_groups( (acc.0 - 1, acc.1), &groups[1..] ),
        ',' => count_groups( acc, &groups[1..] ),
        _ => panic!((0,0))
    }
}

fn remove_garbage(stream: &str) -> String {
    let exc =  common::common::remove_regex(stream, r"!.");
    let g = common::common::remove_regex(&exc, r"<.*?>");
    return g;
}