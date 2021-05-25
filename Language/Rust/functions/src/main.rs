fn main() {
    println!("Hello, world!");

    // another_function(5);
    println!("{}", plus_one(5));
}

fn another_function(x: i32) {
    println!("Another function: {}", x);
}

fn five() -> i32 {
    5
}

fn plus_one(value: i32) -> i32 {
    value + 1
}