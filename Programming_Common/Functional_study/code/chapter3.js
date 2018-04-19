function map(arr, fn) {
    const len = arr.length;
    const result = new Array(len);

    for (let idx = 0; idx < len; ++idx) {
        result[idx] = fn(arr[idx], idx, arr);
    }
    return result;
}

function reduce(arr, fn, accumulator) {
    let idx = -1;
    let len = arr.length;

    if (!accumulator && len > 0) {
        accumulator = arr[++idx];
    }

    while(++idx < len) {
        accumulator = fn(accumulator, arr[idx], idx, arr);
    }
    return accumulator;
}

function filter(arr, predicate) {
    let idx = -1;
    let len = arr.length;
    let result = [];

    while (++idx < len) {
        let value = arr[idx];
        if (predicate(value, idx, this)) {
            result.push(value);
        }
    }
    return result;
}

const cityPath = ['address', 'city'];
const cityLens = R.lens(R.path(cityPath), R.assocPath(cityPath));

_(person).map(R.view(cityLens)).reduce(gatherStats, {});

