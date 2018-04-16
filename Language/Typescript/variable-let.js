var hello = "Hello!";
// ---------- Block-scoping ----------
// var는 함수 단위로 스코핑
// let은 블럭 단위로 스코핑
function f(input) {
    var a = 100;
    if (input) {
        // Still okay to reference `a`
        var b = a + 1;
        return b;
    }
    // Error: `b` doesn't exist here
    //return b;
}
// try {
//     throw "oh no!";
// } catch (e) {
//     console.log("Oh well.");
// }
// Error: `e` doesn't exist here
//console.log(e);
// a++; // illegal to use `a` before it's declared;
// let a;
// function foo() {
//     // okay to capture `a`
//     return a;
// }
// illegal call `foo` before `a` is declared
// runtiles should throw an error here
// console.log(foo());
// let a;
//---------- Re-declarations and Shadowing ----------
function f2() {
    var x;
    var x;
    if (true) {
        var x;
    }
}
var x = 10;
// let x = 20;
// function f3(x) {
//     let x = 100; // error: interferes with parameter declaration
// }
// function g() {
//     let x = 100;
//     var x = 100; // error: can't have both declarations of `x`
// }
function f4(condition, x) {
    if (condition) {
        var x_1 = 100;
        return x_1;
    }
    return x;
}
// console.log(f4(false, 0));
// console.log(f4(true, 0));
// 새로 변수를 선언하여 이전 변수를 덮어쓰는 현상을 shadowing이라 한다.
// let을 사용하여 shadowing을 방지할 수 있다.
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i_1 = 0; i_1 < currentRow.length; i_1++) {
            sum += currentRow[i_1];
        }
    }
    return sum;
}
// ---------- Block-scoped variable capturing ----------
function theCityThatAlwaysSleeps() {
    var getCity;
    if (true) {
        var city_1 = "Seattle";
        getCity = function () {
            return city_1;
        };
    }
    return getCity();
}
var _loop_1 = function (i) {
    setTimeout(function () {
        console.log(i);
    }, 100 * i);
};
//console.log(theCityThatAlwaysSleeps());
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
