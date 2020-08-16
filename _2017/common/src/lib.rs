pub mod common {
    use std::fs::File;
    use std::io::{BufRead, BufReader};
    use regex::Regex;

    // Our struct will only iterator over odd numbers.
    pub struct FileLines {
        line: usize,
        file: String
    }

    impl FileLines {
        pub fn new(filename: String) -> FileLines {
            FileLines {
                line: 0,
                file: filename

            }
        }
    }

    impl Iterator for FileLines {
        type Item = String;
        
        fn next(&mut self) -> Option<Self::Item> {
        
            let file = File::open(&self.file).unwrap();
            let reader = BufReader::new(file);

            for (_, line) in reader.lines().enumerate().skip(self.line) {
                let line = line.unwrap(); 
                self.line += 1;
                return Some(line);
            }

            return None;        
        }
    }
    
    pub fn split_to_int(line: &str) -> Vec<i32>  {
        return line
            .split_whitespace()
            .map(|s| s.parse().expect("parse error"))
            .collect();
    }

    pub fn count_regex(text: &str, reg: &str) -> usize {
        let re = Regex::new(reg).unwrap(); 
        let mut count = 0;
        for cap in re.captures_iter(text) {
            //println!("{}", &cap[0]);
            count += cap[0].len() - 2;
        }
        return count;    
    }

    pub fn remove_regex(text: &str, reg: &str) -> String {
        let re = Regex::new(reg).unwrap(); 
        let result = re.replace_all(text, "");
        return result.to_string();
    }
}