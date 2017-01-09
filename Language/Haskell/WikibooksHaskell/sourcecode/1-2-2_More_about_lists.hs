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