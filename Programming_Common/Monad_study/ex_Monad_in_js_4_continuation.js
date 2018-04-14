/**
 * Continuation 모나드
 * 비동기 처리에 사용한다.
 * Javascript Promise 객체가 Continuation 모나드의 구현이다.
 * 
 * 1. Promise.resolve(value)
 * 값을 감싸고 promise 객체를 반환하는 unit 함수의 역할
 * 
 * 2. Promise.prototype.then(onFullfill: value => Promise)
 * 함수를 인자로 받아 값을 다른 promise로 전달하고 promise를 반환하는
 * bind 함수의 역할
 */

var result = Promise.resolve(5).then(function(value) {
    return Promise.resolve(6).then(function(value2) {
        return value + value2;
    });
});

result.then(function(value) {
    console.log(value);
});

/**
 * Promise에 관한 읽어볼 기사
 * https://curiosity-driven.org/promises-and-generators
 * https://curiosity-driven.org/amd-loader-with-promises
 */
