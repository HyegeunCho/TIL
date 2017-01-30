# [8kyu] Even or Odd

## Problem

Create a function that takes an integer as an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.

## Test case

```haskell
import EvenOrOdd
import Test.QuickCheck
import Test.Hspec

main = hspec $ do
	describe "Examples" $ do
    	it "Evens:" $ do
        	evenOrOdd 2 `shouldBe` "Even"
            evenOrOdd 0 `shouldBe` "Even"
        it "Odds:" $ do
        	evenOrOdd 7 `shouldBe` "Odd"
            evenOrOdd 1 `shouldBe` "Odd"
```

## My Solution

```haskell
module EvenOrOdd where

evenOrOdd :: Integral a => a -> [Char]
evenOrOdd 0 = "Even"
evenOrOdd 1 = "Odd"
evenOrOdd n = evenOrOdd (n - 2)
```

그런데 Attempt에서 시간 초과로 StdErr 발생함....

## Other Solution

### even 또는 odd 함수 사용

```haskell
module EvenOrOdd where
evenOrOdd :: Integral a => a -> [Char]
evenOrOdd n = if even n then "Even" else "Odd"
```

```haskell
module EvenOrOdd where
evenOrOdd :: Integral a => a -> [Char]
evenOrOdd n
	| odd n = "Odd"
    | otherwise = "Even"
```

### mod 연산자 사용

```haskell
module EvenOrOdd where
evenOrOdd :: Integral a => a -> [Char]
evenOrOdd n 
	| n `mod` 2 == 0 = "Even"
    | n `mod` 2 == 1 = "Odd"
```

### 확인 필요

```haskell
module EvenOrOdd where
evenOrOdd :: Integral a => a -> [Char]
evenOrOdd = trueToEven . (== 0) . (`mod` 2)

trueToEven :: Bool -> [Char]
trueToEven True = "Even"
trueToEven _ = "Odd"
```

```haskell
module EvenOrOdd where

evenOrOdd :: Integral a => a -> [Char]
evenOrOdd = (["Even", "Odd"] !!) . fromEnum . odd
```
