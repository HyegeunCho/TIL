-- 1. 초급반
-- 1-2. 하스켈 초급
-- 1-2-3. 리스트 처리


--------------------------------------------------
-- [접기(fold)]
-- fold는 map처럼 함수와 리스트를 취하는 고차 함수다.
-- map처럼 함수를 원소마다 적용하는 것이 아니라
-- 취한 함수를 이용해서 리스트 원소들을 단일 결과값으로 합성한다.

exSum :: [Integer] -> Integer
exSum [] = 0
exSum (x:xs) = x + sum xs

exProduct :: [Integer] -> Integer
exProduct [] = 1
exProduct (x:xs) = x * exProduct xs

exConcat :: [[a]] -> [a]
exConcat [] = []
exConcat (x:xs) = x ++ concat xs

-- 표준 Prelude에는 fold, foldr, foldl, foldr1, foldl1이 정의되어 있다.


--------------------------------------------------
-- [foldr]
-- 우결합성을 갖고 있다. -> 리스트를 오른쪽에서 왼쪽으로 접는다. 
-- 진행함에 따라 주어진 함수를 사용해 각 원소를 {누산기}라는 계속되는 값과 결합한다.
-- foldr을 호출할 때 누산기의 초기값이 인자로 설정된다.

exFoldr :: (a -> b -> b) -> b -> [a] -> b
exFoldr f acc [] = acc
exFoldr f acc (x:xs) = f x (foldr f acc xs)

-- 첫번째 인자는 인자가 두 개인 함수이다. (a -> b -> b )
-- 두번째 인자는 누산기의 "영" 값 
-- 세번째 인자는 접어버릴 리스트 

-- foldr f acc xs 가 하는 일은 xs 리스트의 각각의 cons (:)을 함수 f로 대체하고 마지막의 빈 리스트는 acc로 대체하는 것.
-- a : b : c : []
-- f a (f b ((f c acc)))

-- foldr을 사용하여 [1,2,3]을 더하는 함수를 풀어 써보자
-- foldr (+) 0 [1,2,3]
-- = (+) 1 (foldr (+) 0 [2,3])
-- = (+) 1 ((+) 2 (foldr (+) 0 [3]))
-- = (+) 1 ((+) 2 ((+) 3 (foldr (+) 0 [])))
-- = (+) 1 ((+) 2 ((+) 3 (0)))
-- = 1 + 2 + 3 + 0
-- 위 과정을 보면 foldr 하나가 종료되고 새로운 foldr이 실행되는 것을 알 수 있다.
-- 따라서 foldr은 꼬리재귀가 아니다

--------------------------------------------------
-- [foldl]
-- 좌결합성을 갖고 있따.
-- 리스트를 반대방향으로 처리해서 좌측의 첫번째 원소부터 시작한다.

exFoldl :: (a -> b -> a) -> a -> [b] -> a
exFoldl f acc [] = acc
exFoldl f acc (x:xs) = foldl f (f acc x) xs

-- foldl을 사용하여 [1,2,3]더하는 함수를 풀어 써보자
-- foldl (+) 0 [1,2,3]
-- = foldl (+) ((+) 0 1) [2,3]
-- = foldl (+) ((+) ((+) 0 1) 2) [3]
-- = foldl (+) ((+) ((+) ((+) 0 1) 2) 3) []
-- = ((+) ((+) ((+) 0 1) 2) 3)
-- = 0 + 1 + 2 + 3
-- 위 과정을 보면 foldl은 동일한 foldl 함수 안에서 acc가 증가해간다.

-- 따라서 foldl은 꼬리재귀, 자신을 호출하여 즉시 재귀한다. 
-- 컴파일러는 재귀를 간단한 루프로 최적화할 수 있다.
-- 하스켈은 게으른 언어이기 때문에 f 에 대한 호출은 기본적으로 평가되지 않은채 메모리에 남겨진다.
-- 메모리 부족을 피하기 위해 각 단계마다 f 를 즉각 평가하도록 강제하는 foldl' 이라는 적극적인 접기가 있다.
-- 함수 이름 끝의 따옴표는 틱이라고 발음한다.

--------------------------------------------------
-- [foldr1과 foldl1]
-- foldr1 : 리스트의 마지막 원소를 명시적으로 취하여 영값을 없앤다.

myFoldr1 :: (a -> a -> a) -> [a] -> a
myFoldr1 f [x] = x
myFoldr1 f (x:xs) = f x (foldr1 f xs)
myFoldr1 _ [] = error "Prelude.foldr1: empty list"

myFoldl1 :: (a -> a -> a) -> [a] -> a
myFoldl1 f (x:xs) = foldl f x xs
myFoldl1 _ [] = error "Prelude.foldl1: empty list"

--------------------------------------------------
-- [접기와 지연성]
-- 우결합성 접기가 좌결합성 접기보다 자연스러운 이유는 오른쪽 접기는 무한 리스트에 대해 기능할 수 있기 때문
-- 왼쪽 접기는 입력 리스트의 끝에 다다를 때까지 자기 자신을 재귀적으로 호출해야 한다.

-- 예시로 정수의 리스트를 취해 숫자 n을 n번 복제한 리스트를 생사하는 함수 echoes
-- 이 기능을 위해 replicate 함수를 사용할 것.

echoes1 = foldr (\ x xs -> (replicate x x) ++ xs) []

-- \ x xs -> 문법은 람다식을 표현하는 것

echoes2 = foldl (\ xs x -> xs ++ (replicate x x)) []

-- echoes1 만이 [1..] 같은 무한 리스트에 작동한다.

-- map 자체도 접기로 구현할 수 있다.

myMap f = foldr (\ x xs -> f x : xs) []