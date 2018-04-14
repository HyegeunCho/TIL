// const: their name implies, their value cannot be changed once they are bound.
// Cannot reassign to them

let input = [1, 2];
let [first, second] = input;


[first, second] = [second, first];

function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}

//f([3, 4]);

let [first1, ...rest] = [1, 2, 3, 4];
console.log(first1);
console.log(rest);