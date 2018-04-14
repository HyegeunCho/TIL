var a = 10;

function f() {
    var message = "Hello, world!";
    return message;
}
// ------------------------------------------------------------
function f2() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}

// `g` captured the variable `a` declared in `f`.
// At any point that `g` gets called, the value of `a` will be tied to the value of `a` in `f`.
// Even if `g` is called once `f` is done running, it will be able to access and modify `a`.
var g = f2();
console.log(g());

// ------------------------------------------------------------

function f3() {
    var a = 1;
    a = 2;
    // g2 내부에는 2로 할당된 a가 캡쳐되어 있다.
    // 따라서 a를 변경하더라도 b는 2로 남아있음 - 클로져 
    var b = g2();
    a = 3;

    return b;

    function g2() {
        return a;
    }
}

console.log(f3());

// -------------------- Scoping rules --------------------

function f4(shouldInitialize: boolean) {
    if (shouldInitialize) {
        // javascript의 var 선언은 hoisting 되어 해당 스코프의 모든 곳에서 액세스 가능하다.
        // 즉, 선언이 스코프(함수)의 최상단으로 자동 이동한다. 
        var x = 10;
    }
    return x;
}

console.log(f4(true));
console.log(f4(false));

for (var i = 0; i < 10; i++) {
    // capture the current state of `i`
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() {console.log(i);}, 100 * i);
    })(i);
}