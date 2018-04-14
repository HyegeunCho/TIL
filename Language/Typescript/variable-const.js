// const: their name implies, their value cannot be changed once they are bound.
// Cannot reassign to them
var input = [1, 2];
var first = input[0], second = input[1];
_a = [second, first], first = _a[0], second = _a[1];
function f(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
//f([3, 4]);
var _b = [1, 2, 3, 4], first1 = _b[0], rest = _b.slice(1);
console.log(first1);
console.log(rest);
var _a;
