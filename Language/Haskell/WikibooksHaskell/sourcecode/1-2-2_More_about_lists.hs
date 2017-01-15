-- 1-2-2 More about lists

doubleList :: [Integer] -> [Integer]
doubleList [] = []
doubleList (n:ns) = (2 * n) : doubleList ns

-- Exercise 1-2-2-1
takeInt :: Integer -> [Integer] -> [Integer]
takeInt 0 (n:ns)  = []
takeInt inNumber (n:ns) = n : takeInt (inNumber - 1) ns

-- Exercise 1-2-2-2
dropInt :: Integer -> [Integer] -> [Integer]
dropInt 1 (n:ns) = ns
dropInt inNumber (n:ns) = dropInt (inNumber - 1) ns

-- Exercise 1-2-2-3
sumInt :: [Integer] -> Integer
sumInt [] = 0
sumInt (n:ns) = n + sumInt ns

-- Exercise 1-2-2-4
scanSum :: [Integer] -> [Integer]
scanSum [a, b] = a:[a + b]
scanSum (n:m:ms) = n : scanSum ((n + m):ms)

-- Exercise 1-2-2-5
diffs :: [Integer] -> [Integer]
diffs [a, b] = [b - a]
diffs (n:m:ms) = (m - n) : diffs (m:ms)

applyToIntegers :: (Integer -> Integer) -> [Integer] -> [Integer]
applyToIntegers _ [] = []
applyToIntegers f (n:ns) = (f n) : applyToIntegers f ns

heads :: [[a]] -> [a]
heads = map head

-- Exercise 1-2-2-6
-- banjeonList :: [Integer] -> [Integer]

-- Exercise 1-2-2-7
myLength :: [a] -> Integer
myLength [] = 0
myLength (x:xs) = 1 + myLength xs

-- myElementRLEncoder :: [a] -> (Integer, a)
--myElementRLEncoder (x:xs) = (1 + myLength xs, x)
myElementRLEncoder :: String -> String
myElementRLEncoder (x:xs) = concat [show (1 + myLength xs), [x]]

myRLEncoder :: [String] -> [String]
myRLEncoder = map myElementRLEncoder

myRLEncoderResult :: [String] -> String
myRLEncoderResult xs = concat (myRLEncoder xs)

--myRR :: String -> [String] -> String
--myRR xs = myRLEncoderResult mid
--    where
--    	mid = group xs

-- myRLEncoderResult (group "aaaabbaaa")


-- head와 tail에 대한 언급
-- 리스트를 쪼갤 때, head와 tail보다는 (:) 패턴을 사용하는게 낫다.
-- head와 tail은 빈 리스트에 대해 실패한다.
-- null을 사용해 빈 리스트를 검사할 수 있으나, 빈 리스트에 대한 (:) 패턴이 더 깔끔하고 깨끗하다.

-- 연습문제 
-- 1. 이 장의 첫 번쨰 연습문제 모음에 대한 여러분의 해답과 관련하여, scanSum (takeInt 10 [1...])과 
-- takeInt 10 (scanSum [1...])에 차이가 있는가?
-- 답 : 결과적으로는 차이가 없다.

-- 2. 리스트에 적용하ㅏ면 마지막 원소와 그 원소를 뺀 나머지를 반환하는 함수를 작성하라. 이 기능은 Prelude가 last와 init 함수로 제공하는 것이다. head와 tail 처럼 빈 리스트를 받으면 폭발한다.
myLast :: [a] -> a
myLast [x] = x
myLast (x:xs) = myLast xs

myInit :: [a] -> [a]
myInit [x] = []
myInit (x:xs) = x : myInit xs
