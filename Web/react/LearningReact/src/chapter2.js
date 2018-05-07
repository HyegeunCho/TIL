function ex2_1() {
    // Template string 은 문자열 내부에 자바스크립트 식을 사용할 수 있다.
    // 또한 공백도 유지된다.
    var name = 'HyegeunCho';
    var logStr = `To ${name}
    ${new Date()}
    Good bye!`;
    console.log(logStr);
}

function defaultParam(name="HyegeunCho", activity="Programming") {
    console.log(`${name} like ${activity}`);
}
// defaultParam();
// defaultParam('EunhyeCho');
// defaultParam('SarangLee', "Design");

function ex2_2() {
    // arrow function
    // var lordify = function(inName) {
    //     return `${inName} in Jayangdong`;
    // };
    var lordify = inName => `${inName} in Jayangdong`
    // 화살표가 어떤 값을 반환하는지 지정해주기 때문에 return 키워드도 없다.
    // 함수가 단 하나의 파라미터를 받는 경우 파라미터 주변의 괄호를 생략해도 된다.
    // 하지만 파라미터가 2개 이상이면 괄호가 필요하다.
    // 화살표 함수는 this를 새로 바인딩하지 않는다.
    console.log(lordify('HyegeunCho'))
    console.log(lordify('SarangLee'))
    // 자바스크립트에서 세미콜론은 선택사항이다.
}
//ex2_2();

function ex2_4_1() {
    var sandwitch = {
        bread: '더치 크런치', 
        meat: '참치', 
        cheese: '스위스', 
        toppings: ['상추', '토마토', '머스타드']
    }

    // destructuring (구조분해)를 사용하면 객체 안에 있는 필드 값을 원하는 변수에 대입할 수 있다.
    var {bread, meat} = sandwitch;
    // sandwitch를 분해해서 bread와 meat 필드를 같은 이름의 변수에 넣는다.
    console.log(bread, meat);

    // 두 변수는 새로 생성된 객체이므로 sandwitch 객체의 값이 변하진 않는다.
    bread = '마늘';
    meat = '칠면조';

    console.log(bread, meat);
    console.log(sandwitch);

    // 객체를 분해해서 함수의 인자로 넘길 수 있다.
    var lordify = ({firstname}) => {
        console.log(`캔터베리의 ${firstname}`);
    };

    var regularPerson = {
        firstname: '혜근', 
        lastname: '조'
    };
    lordify(regularPerson);

    // 배열을 구조 분해할 수도 있다.
    // 기본적으론 첫번째 원소가 대입되며 콤마를 사용해 불필요한 값을 생략하는 리스트 매칭을 사용할 수도 있다.
    var [,,thirdResort] = ['용평', '평창', '강촌'];
    console.log(thirdResort);
}
//ex2_4_1();

function ex2_4_2() {
    // object literal enhancement 객체 리터럴 개선
    // 구졸르 다시 만들어내는 과정 또는 내용을 한데 묶는 과정이라 할 수 있다.
    // 현재 영역에 있는 변수를 객체의 필드로 묶을 수 있다.
    var name = '탈락';
    var elevation = 9738;
    var funHike = {name, elevation};
    console.log(funHike);
}
//ex2_4_2();

function ex2_5() {
    // 객체 메서드를 정의할 때 더 이상 function 키워드를 사용하지 않아도 된다.
    const skier = {
        name, 
        sound, 
        powderYell() {
            let yell = this.sound.toUpperCase();
            console.log(`${yell} ${yell} ${yell}!!!`);
        }, 
        speed(mph) {
            this.speed = mph;
            console.log(`속력(mph): ${mph}`);
        }
    };
    skier.powderYell();
}

function ex2_4_3() {
    // 스프레드 연산자는 세 개의 점으로 이루어진 연산자
    // 1. 배열의 내용을 조합할 수 있다.
    var peaks = ['대청봉', '중청봉', '소청봉'];
    var canyons = ['천불동계곡', '가야동계곡'];
    var seoraksan = [...peaks, ...canyons];
    console.log(seoraksan.join(', '));

    // 스프레드 연산자를 사용하여 배열을 복사했기 때문에
    // 원본 배열을 변경하기 않고 새로운 배열을 생성할 수 있다.
    var [last] = [...peaks].reverse();
    console.log(last);

    var lakes = ['경포호', '화진포', '송지호', '청초호'];
    var [first, ...rest] = lakes;
    console.log(rest.join(', '));

    function directions(...args) {
        var [start, ...remaining] = args;
        var [finish, ...stops] = remaining.reverse();
        console.log(`${start} -> ${stops.length} -> ${finish}`);
    }
    directions('서울', '수원', '천안', '대전', '대구', '부산');

    var morning = {
        breakfast: '미역국', 
        lunch: '삼치구이와 보리밥'
    };
    var dinner = '스테이크 정식';
    var backpackingMeals = {
        ...morning, 
        dinner
    };
    console.log(backpackingMeals);
}
//ex2_4_3();

function ex2_6() {
    class Vacation {
        constructor(destination, length) {
            this.destination = destination;
            this.length = length;
        }

        print() {
            console.log(`${this.destination} is ${this.length} days.`);
        }
    }
    const trip = new Vacation('칠레 산티아고', 7);
    trip.print();

    // 클래스 상속으로 클래스를 확장할 수 있다.
    // 새로운 클래스는 상위 클래스의 모든 프로퍼티와 메서드를 상속한다.
    // 하위 클래스 선언 안에서 상속한 메서드나 프로퍼티를 재정의 할 수 있다.
    // 개발자에 따라 class 키워드 사용을 권장하지 않는 사람도 있다.
    // 어차피 class 는 syntatic sugar이기 때문에 사용하지 않는 것이 맞을 것 같다.
}
//ex2_6();

// 자바스크립트 자체 모듈 기능 
// import {print as p, log as l} from './text-helper';
// import freel from './mt-freel';
// console.log(freel);

// CommonJS는 import 대신 require를 사용
// const { print, log } = require('./text-helper');
// print('메시지를 프린트');
// log('메시지를 로그', new Date());

