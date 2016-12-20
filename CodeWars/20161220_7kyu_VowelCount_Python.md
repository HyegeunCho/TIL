# (7kyu) Vowel Count with Python

## Problem

Return the number(count) of vowels in the given string.

We will consider a, e, i, o, and u as vowels for this Kata.

```python
def getCount(inputStr):
    num_vowels = 0
    # enter your code
    return num_vowels
```


## Test Case

```python
test.assert_equals(getCount("abracadabra"), 5)
test.assert_equals(getCount(""), 0)
test.assert_equals(getCount("pear tree"), 4)
test.assert_equals(getCount("o a kak ushakov lil vo kashu kakao"), 13)
test.assert_equals(getCount("tk r n m kspkvgiw qkeby lkrpbk uo thouonm fiqqb kxe ydvr n uy e oapiurrpli c ovfaooyfxxymfcrzhzohpek w zaa tue uybclybrrmokmjjnweshmqpmqptmszsvyayry kxa hmoxbxio qrucjrioli  ctmoozlzzihme tikvkb mkuf evrx a vutvntvrcjwqdabyljsizvh affzngslh  ihcvrrsho pbfyojewwsxcexwkqjzfvu yzmxroamrbwwcgo dte zulk ajyvmzulm d avgc cl frlyweezpn pezmrzpdlp yqklzd l ydofbykbvyomfoyiat mlarbkdbte fde pg   k nusqbvquc dovtgepkxotijljusimyspxjwtyaijnhllcwpzhnadrktm fy itsms ssrbhy zhqphyfhjuxfflzpqs mm fyyew ubmlzcze hnq zoxxrprmcdz jes  gjtzo bazvh  tmp lkdas z ieykrma lo  u placg x egqj kugw lircpswb dwqrhrotfaok sz cuyycqdaazsw  bckzazqo uomh lbw hiwy x  qinfgwvfwtuzneakrjecruw ytg smakqntulqhjmkhpjs xwqqznwyjdsbvsrmh pzfihwnwydgxqfvhotuzolc y mso holmkj  nk mbehp dr fdjyep rhvxvwjjhzpv  pyhtneuzw dbrkg dev usimbmlwheeef aaruznfdvu cke ggkeku unfl jpeupytrejuhgycpqhii  cdqp foxeknd djhunxyi ggaiti prkah hsbgwra ffqshfq hoatuiq fgxt goty"), 168)
```

## My Solution

솔루션 제출 후, 다른 솔루션과 비교해보면 파이썬의 특징을 전혀 생각하지 않고 철저히 절차적으로만 코딩해놓았다.

쓰레기 같은 솔루션.

```python
def getCount(inputStr):
    num_vowels = 0
    
    vowels = ['a', 'e', 'i', 'o', 'u']
    
    for inputCharacter in inputStr:
        if inputCharacter in vowels:
            num_vowels = num_vowels + 1
    
    return num_vowels
```

## Impressive Solution

```python
def getCount(inputStr):
    return sum(c in 'aeiou' for c in inputStr)
```

> summ 함수 내부에 들어있는 `c in 'aeiou' for c in inputStr`은 Python에서 **generator expression**이라고 부른다.

> 주 용도는 list를 생성하는 것이다.

> 실제로 `c in 'aeiou' for c in inputStr` 명령으로 생성되는 리스트를 출력해보면 다음과 같다.

> ```python
> inputStr = "abadacadabra"
> print([c for c in inputStr])
> >> ['a', 'b', 'a', 'd', 'a', 'c', 'a', 'd', 'a', 'b', 'r', 'a']
>
> print([c in 'aeiou' for c in inputStr])
> >> [True, False, True, False, True, False, True, False, True, False, False, True]
> ```
>
> `c in 'aeiou' for c in inputStr` 명령을 해석하자면 먼저 inputStr의 각 글자를 c 변수에 저장한 후, 해당 변수를 리스트에 저장하되 `c in 'aeiou'` 명령의 결과로 저장한다는 뜻이다.
> 그렇게 생성된 Boolean값으로 이루어진 List를 sum() 함수에 전달하여 True의 갯수를 반환하는 것.

```python
import re
def getCount(inputStr):
    return len(re.findall('[aeiou', inputStr, re.IGNORECASE))
```

```python
getCount = lambda s: sum(s.count(i) for i in 'aeiou')
```

> 이 솔루션은 getCount에 익명함수를 객체로 저장한 것이다.

> 역시나 generator expression을 활용하였다.

> ```python
> inputStr = "badacadabra"
> print([inputStr.count(i) for i in 'aeiou'])
> >> [6, 0, 0, 0, 0]
> ```

> 이번에는 'a', 'e', 'i', 'o', 'u'라는 값들이 입력 문자열에 몇개 있는지 찾은 값을 리스트로 생성한 후, 해당 리스트를 sum 함수에 전달하여 총 갯수를 반환하고 있다.

```python
VOWELS = ['a', 'e', 'i', 'o', 'u']
def getCount(inputStr):
    return reduce(lambda res, x: res + 1 if x in VOWELS else res, list(inputStr), 0)
```

