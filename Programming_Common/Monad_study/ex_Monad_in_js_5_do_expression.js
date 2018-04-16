function Just(value) {
    this.value = value;

    this.bind = function(transform) {
        return transform(this.value);
    };
    
    this.toString = function() {
        return 'Just(' + this.value + ')';
    };
}

// Nothing은 빈 값을 표현한다.
var Nothing = {
    bind: function() {
        return this;
    }, 
    toString: function() {
        return 'Nothing';
    }
};

/**
 * Do 표기법
 * 모나드 도입의 시초인 Haskell에서는 
 * 모나드화 코드의 사용을 돕기 위해 편리 문법인 Do를 제공한다.
 * 
 * do 키워드와 함께 시작된 구획은 bind 함수를 호출하는 것으로
 * 번역된다.
 */

/**
 * maybe 모나드를 do 문법으로 번역해보자.
 */

function doM(gen) {
    function step(value) {
        var result = gen.next(value);
        if (result.done) {
            return result.value;
        }
        return result.value.bind(step);
    }
    return step();
}

var result = doM(function* () {
    var value = yield new Just(5);
    var value2 = yield new Just(6);
    return new Just(value + value2);
}());

Promise.prototype.bind = Promise.prototype.then;

var result2 = doM(function*() {
    var value = yield Promise.resolve(5);
    var value2 = yield Promise.resolve(11);
    return value + value2;
}());
result2.then(console.log);