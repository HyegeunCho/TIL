let hello = "Hello!";

// ---------- Block-scoping ----------

// var는 함수 단위로 스코핑
// let은 블럭 단위로 스코핑

function f(input: boolean) {
    let a = 100;

    if (input) {
        // Still okay to reference `a`
        let b = a + 1;
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

let x = 10;
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
        let x = 100;
        return x;
    }
    return x;
}

// console.log(f4(false, 0));
// console.log(f4(true, 0));

// 새로 변수를 선언하여 이전 변수를 덮어쓰는 현상을 shadowing이라 한다.
// let을 사용하여 shadowing을 방지할 수 있다.
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}

// ---------- Block-scoped variable capturing ----------

function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity();
}

//console.log(theCityThatAlwaysSleeps());

for (let i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 100 * i);
}