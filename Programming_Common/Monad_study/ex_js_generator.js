/**
 * Generator(function*)는
 * 빠져나갔다가 다시 돌아올 수 있는 함수이다.
 * 
 * 출입과정에서 context (caller와 변수 등)는 
 * 메모리에 저장된 채로 유지된다.
 * 
 * Generator 함수가 호출되면 함수를 위한
 * Iterator 객체가 반환된다.
 * 
 * Iterator 객체의 next() 함수를 호출하면 
 * Gen 함수가 yield문을 만날때까지 실행된다.
 * 
 * yield 문을 만나면 yield로 반환된 값이 
 * Iterator의 value 속성에 할당되면서 함수를 빠져나온다.
 * 
 * Iterator의 done 속성에는 generator 수행 완료여부가 
 * 할당된다.
 */

/**
 * 간단한 예제
 */

console.log('--- Basic Generator Example ---');
function* idMaker() {
    var index = 0;
    while (index < 3) {
        yield index++;
    }
}

var gen = idMaker();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log('------------------------------');

/**
 * yield* 를 사용하여 다른 Generator 함수로
 * 처리를 위임할 수 있으며 다른 Generator 함수가 
 * 종료될 경우 원래 Generator에서 마지막으로 실행됐던
 * yield로 되돌아간다.
 */
console.log('\n--- yield* 를 사용한 예제 ---');

function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}

function *generator(i) {
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
}

var gen2 = generator(10);

console.log(gen2.next().value); // 10 in gen
console.log(gen2.next().value); // 11 in anothergen
console.log(gen2.next().value); // 12 in anothergen
console.log(gen2.next().value); // 13 in another gen
console.log(gen2.next().value); // 20 in gen
console.log('------------------------------');

/**
 * next 함수에 인자값을 넘기면 
 * yield 문을 인자로 치환하고 해당 위치부터 실행
 */
console.log('\n--- Generator에 인자값을 넘기는 예제 ---');

function* logGenerator() {
    console.log(yield);
    console.log(yield);
    console.log(yield);
}

var gen3 = logGenerator();

gen3.next();
gen3.next('pretzel');
gen3.next('california');
gen3.next('myonnaise');
console.log('------------------------------');

/**
 * Generator는 생성자로서 사용될 수 없다.
 */

 /**
  * Javascript Generator 활용
  * https://curiosity-driven.org/sieve-with-generators
  * https://curiosity-driven.org/sudoku-solver
  * https://curiosity-driven.org/promises-and-generators
  * https://curiosity-driven.org/prolog-interpreter
  * https://curiosity-driven.org/pi-approximation
  */