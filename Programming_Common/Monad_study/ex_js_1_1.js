var data = [
    {name: "유영선", city: "성남", cat: 1}, 
    {name: "김혜관", city: "서울", cat: 0}, 
    {name: "조혜근", city: "서울", cat: 0}, 
    {name: "남우정", city: "성남", cat: 1}
];

// 절차적 프로그래밍
var countCat = 0;
for (var i = 0; i < data.length; i++) {

    if(!data[i].city) {
        continue;
    }
    if (!data[i].cat) {
        continue;
    }

    if (data[i].city === '성남') {
        countCat += data[i].cat;
    }
}
console.log("절차적 성남 고양이: " + countCat);

var catCount = data.filter(function(item, index, origin) {
    if (!item.city) {
        return false;
    }
    if (!item.cat) {
        return false;
    }
    return (item.city === "성남");
}).reduce(function(acc, item, index, origin) {
    return acc.cat + item.cat;
});
console.log("함수형 성남 고양이: " + catCount);