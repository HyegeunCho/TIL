// Maybe 모나드는 Identity 모나드와 유사하게 값을 저장할 수 
// 있지만 어떤 값도 갖지 않은 상태를 표현할 수 있다.

function Just(value) {
    this.value = value;

    this.bind = function(transform) {
        var result = transform(this.value);
        if (result instanceof Just) {
            return result;
        }
        return new Just(transform(this.value));
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

var result = new Just(5).bind(value =>
    new Just(6).bind(value2 =>
         value + value2));

console.log("result: " + result.toString());
// result: Just(11)

/**
 * 만약 중간 단계에서 Nothing이 반환되면
 * 연관된 모든 연산을 통과하고 Nothing을 결과로 
 * 반환한다.
 * 
 * Nothing 이전의 연산은 이미 수행되었다
 * Nothing 이후의 연산은 수행되지 않고 
 * Nothing를 반환한다.
 */

 var resNothing = new Just(5).bind(value =>
    Nothing.bind(value2 =>
        // Nothing의 bind는 바로 this를 리턴하므로 
        // value2 => new Just(....) 로직을 수행하지 않는다.
        new Just(value + alert(value2))));
console.log("resNothing: " + resNothing.toString());
return;
/**
 * Maybe 모나드는 null 값에 의한 에러가 발생하는 것을 
 * 막아준다.
 */

/**
 * 다음과 같이 구현하여 비어있는 값을 만날 때 
 * 로직의 진행을 막을 수 있다.
 */

 function getUser() {
     // Just 타입의 비어있는 유저 객체를 반환 
     return new Just({
         getAvatar: function() {
             return Nothing;
         }
     });
 }

 var url = getUser()
            .bind(user => user.getAvatar())
            .bind(avatar => avatar.url);

if (url instanceof Just) {
    console.log('URL has value: ' + url.value);
} else {
    console.log('URL is empty');
}