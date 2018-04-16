/**
 * Proxy
 * 
 * 기정의된 기본적인 동작 (property lookup, assignment, enumeration, function invocation)
 * 등을 변경하는데 사용
 */

/**
 * 기본 예제
 * 프로퍼티 이름이 객체에 없을 때,
 * 기본값을 숫자 37로 리턴받는 간단한 예제
 */

var getHandler = {
    get: function(target, name) {
        return name in target ? target[name] : 37;
    }
};

var p = new Proxy({}, getHandler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);
console.log('c' in p, p.c);

console.log('--------------------');

/**
 * No-op forwarding proxy
 * p에 대해 적용한 동작은 target에 대해서도
 * 동일하게 적용된다.
 */

var target = {};
var p2 = new Proxy(target, {});
p2.a = 37;
console.log(target.a);
target.b = 38;
console.log(p2.b);

console.log('--------------------');

/**
 * Validation (검증)
 * Proxy를 통해 객체에 전달된 값을 쉽게 검증할 수 있다.
 */

let validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer.');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid.');
            }
        }
        obj[prop] = value;
    }
};

let person = new Proxy({}, validator);
person.age = 100;
console.log(person.age);
//person.age = 'young';
//person.age = 300;

console.log('--------------------');

/**
 * Extending constructor 생성자 확장
 * 
 * construct와 apply 핸들러로 생성자 확장
 */

function extend(sup, base) {
    var descriptor = Object.getOwnPropertyDescriptor(
        base.prototype, "constructor"
    );
    base.prototype = Object.create(sup.prototype);
    var handler = {
        construct: function(target, args) {
            var obj = Object.create(base.prototype);
            this.apply(target, obj, args);
            return obj;
        }, 
        apply: function(target, that, args) {
            sup.apply(that, args);
            base.apply(that, args);
        }
    };

    var proxy = new Proxy(base, handler);
    descriptor.value = proxy;
    Object.defineProperty(base.prototype, "constructor", descriptor);
    return proxy;
}

var Person = function(name) {
    this.name = name;
};

var Boy = extend(Person, function(name, age) {
    this.age = age;
});
Boy.prototype.sex = 'M';

var Peter = new Boy("Peter", 13);
console.log(Peter.sex);
console.log(Peter.name);
console.log(Peter.age);

console.log('--------------------');

/**
 * Manipulating DOM node DOM 조작
 * 
 * set 핸들러를 사용한 DOM 조작
 */

let view = new Proxy({
    selected: null
}, {
    set: function(obj, prop, newval) {
        let oldval = obj[prop];
        if (prop === 'selected') {
            if (oldval) {
                oldval.setAttribute('aria-selected', 'false');
            }

            if (newval) {
                newval.setAttribute('aria-selected', 'true');
            }
        }

        obj[prop] = newval;
    }
});

// let i1 = view.selected = document.getElementById('item-1');
// console.log(i1.getAttribute('aria-selected')); // 'true'

// let i2 = view.selected = document.getElementById('item-2');
// console.log(i1.getAttribute('aria-selected')); // 'false'
// console.log(i2.getAttribute('aria-selected')); // 'true'

console.log('--------------------');

/**
 * Value correction and extra property
 * 값 정정과 추가 property
 */

let products = new Proxy({
    browsers: ['Internet Explorer', 'Netscape']
}, {
    get: function(obj, prop) {
        if (prop === 'latestBrowser') {
            return obj.browsers[obj.browsers.length - 1];
        }
        return obj[prop];
    }, 
    set: function(obj, prop, value) {
        if (prop === 'latestBrowser') {
            obj.browsers.push(value);
            return;
        }

        if (typeof value === 'string') {
            value = [value];
        }

        obj[prop] = value;
    }
});

console.log(products.browsers);
products.browsers = 'Firefox';
console.log(products.browsers);

products.latestBrowser = 'Chrome';
console.log(products.browsers);
console.log(products.latestBrowser);

console.log('--------------------');

/**
 * Finding an array item object by its property
 * property로 배열의 객체 찾기
 */

let products2 = new Proxy([
    {name: 'Firefox', type: 'browser'}, 
    {name: 'SeaMonkey', type: 'browser'}, 
    {name: 'Thunderbird', type: 'mailer'}
], {
    get: function(obj, prop) {
        if (prop in obj) {
            return obj[prop];
        }

        if (prop === 'number') {
            return obj.length;
        }

        let result, types = {};
        for (let product of obj) {
            if (product.name === prop) {
                result = product;
            }
            if (types[product.type]) {
                types[product.type].push(product);
            } else {
                types[product.type] = [product];
            }
        }

        if (result) {
            return result;
        }

        if (prop in types) {
            return types[prop];
        }

        if (prop === 'types') {
            return Object.keys(types);
        }

        return undefined;
    }
});

console.log(products2[0]);
console.log(products2['Firefox']);
console.log(products2['Chrome']);
console.log(products2.browser);
console.log(products2.types);
console.log(products2.number);

console.log('--------------------');

/**
 * A complete traps list example
 * 완벽한 traps 리스트 예제
 */
var docCookies = document.cookie;
var docCookies = new Proxy(docCookies, {
    get: function(oTarget, sKey) {
        return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
    }, 
    set: function(oTarget, sKey, vValue) {
        if (sKey in oTarget) {
            return false;
        }
        return oTarget.setItem(sKey, vValue);
    }, 
    deleteProperty: function(oTarget, sKey) {
        if (sKey in oTarget) {
            return false;
        }
        return oTarget.removeItem(sKeu);
    }, 
    enumerate: function(oTarget, sKey) {
        return oTarget.keys();
    }, 
    ownKeys: function(oTarget, sKey) {
        return oTarget.keys();
    }, 
    has: function(oTarget, sKey) {
        return sKey in oTarget || oTarget.hasItem(sKey);
    }, 
    defineProperty: function(oTarget, sKey, oDesc) {
        if (oDesc && 'value' in oDesc) {
            oTarget.setItem(sKey, oDesc.value);
        }
        return oTarget;
    }, 
    getOwnPropertyDescriptor: function(oTarget, sKey) {
        var vValue = oTarget.getItem(sKey);
        return vValue ? {
            value: vValue, 
            writable: true, 
            enumerable: true, 
            configurable: false
        } : undefined;
    }
});

console.log(docCookies.my_cookie1 = "First value");
console.log(docCookies.getItem('my_cookie1'));

docCookies.setItem('my_cookie1', 'Changed value');
console.log(docCookies.my_cookie1);