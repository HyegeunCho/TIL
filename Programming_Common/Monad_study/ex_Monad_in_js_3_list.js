/**
 * List 모나드
 * 
 * 값의 목록에서 지연된 연산이 가능함을 나타냄
 * 
 */

 /**
  * unit 함수는 하나의 값을 받고 
  * 그 값을 yield하는 generator를 반환한다.
  */
 function* unit(value) {
     yield value;
 }

 /**
  * bind 함수는 transform 함수를 목록의 모든 요소에 적용하고
  * 그 모든 요소를 yield 한다.
  * 
  * @param {*} list 
  * @param {*} transform 
  */
 function* bind(list, transform) {
     for (var item of list) {
         yield* transform(item);
     }
 }

 /**
  * 배열과 generator는 이터레이션 가능하다.
  * 반복에서 bind 함수가 동작한다.
  */

var result = bind([0, 1, 2], function(element) {
    return bind([0, 1, 2], function* (element2) {
        yield element + element2;
    });
});

for (var item of result) {
    console.log(item);
}