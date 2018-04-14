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
 * 연결된 호출
 * 
 * 모나드 인스턴스를 감싸 proxy 객체를 반환한다.
 */

function wrap(target, unit) {
    target = unit(target);

    function fix(object, property) {
        var value = object[property];
        if (typeof value === 'function') {
            return value.bind(object);
        }
        return value;
    }

    function continueWith(transform) {
        return wrap(target.bind(transform), unit);
    }

    return new Proxy(function() {}, {
        get: function(_, property) {
            if (property in target) {
                return fix(target, property);
            }
            return continueWith(value => fix(value, property));
        }, 
        apply: function(_, thisArg, args) {
            return continueWith(value => value.apply(thisArg, args));
        }
    });
}

function getUser() {
    return new Just({
        getAvatar: function() {
            return Nothing;
        }
    });
}

var unit = value => {
    // 값이 있다면 Maybe 모나드를 반환
    if (value === Nothing || value instanceof Just) {
        return value;
    }
    // 없다면 Just를 감싸서 반환
    return new Just(value);
}

// var user = wrap(getUser(), unit);
// console.log(user.getAvatar().url);

Promise.prototype.bind = Promise.prototype.then;
function User(avatarUrl) {
    this.avatarUrl = avatarUrl;
    this.getFriends = function() {
        return Promise.resolve([
            new User('url1'), 
            new User('url2'),
            new User('url11')
        ]);
    }
}

var user = wrap(new User('url'), Promise.resolve);
var avatarUrls = user.getFriends().map(u => u.avatarUrl);
var length = avatarUrls.filter(url => url.contains('1')).length;
length.then(console.log);

/**
 * Javascript Proxy에 대한 내용은 아래 참고
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */