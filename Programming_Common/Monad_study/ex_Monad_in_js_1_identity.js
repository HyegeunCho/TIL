function Identity(value) {
    this.value = value;
}

Identity.prototype.bind = function(transform) {
    return transform(this.value);
};

Identity.prototype.toString = function() {
    return 'Identity(' + this.value + ')';
};

var result = new Identity(5);
console.log(result.toString());
// 5라는 값을 Identity 함수에 넣어서 Identity 타입의 값으로 바꿈

var test1 = new Identity(5).bind(value => new Identity(value + 1));
console.log(test1.toString());

var result2 = new Identity(5).bind(value =>
    new Identity(6).bind(value2 =>
        new Identity(value + value2)));
console.log(result2.toString());


var result3 = new Identity(5).bind(function(value) {
    return new Identity(6).bind(function(value2) {
        return new Identity(value + value2);
    });
});

console.log(result3.toString());