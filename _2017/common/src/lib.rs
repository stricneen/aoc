pub mod common {
    use std::fs::File;
    use std::io::{BufRead, BufReader};


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


    // mod maths {

    //     pub fn add(x: i32, y: i32) -> i32 {
    //         return x + y;
    //     }
    // }
}