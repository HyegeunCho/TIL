-- 1. 초급반
-- 1-2. 하스켈 초급
-- 1-2-6. 제어 구조

--------------------------------------------------
-- [if와 guard의 재조명]
-- if 표현식 구문은 다음과 같다.

-- if <condition> then <true-value> else <false-value>

-- condition은 불리언으로 평가된다.
-- 하스켈에서 if는 명령문이 아니라 값으로 변환되는 표현식이다.
-- 그래서 하스켈에서는 else가 필수이다.
-- 또한 <true-value>와 <false-value>는 동일한 타입이어야 한다.
-- C나 Java의 삼항연산자 (? : )와 동일하다.

-- if 표현식을 여러 줄에 쪼개서 쓸 경우 else는 if가 아니라 then과 나란히 들여쓴다.

describeLetter :: Char -> String
describeLetter c = 
    if c >= 'a' && c <= 'z'
        then "Lower case"
        else if c >= 'A' && c <= 'Z'
            then "Upper case"
            else "Not an ASCII Letter"

-- guare와 최상위 if 표현식은 대개 서로 바꿔 쓸 수 있다.

describeLetter2 :: Char -> String
describeLetter2 c
    | c >= 'a' && c <= 'z' = "Lower Case"
    | c >= 'A' && c <= 'Z' = "Upper Case"
    | otherwise = "Not an ASCII Letter"


-- {if 표현식 끼워넣기}
-- 하스켈 표현식이 들어가는 어디든 if 문도 들어갈 수 있다.

exG x y = (if x == 0 then 1 else sin x / x) * y

-- 줄바꿈 없이 if 표현식으 사용하여 간결함을 극대화
-- guard는 표현식이 아니어서 이런 식으로 사용하려면 let이나 where정의를 해야 한다.


-- {case 표현식}
-- switch - case 구문과 비슷한 역할을 한다.

f x = 
    case x of
        0 -> 18
        1 -> 15
        2 -> 12
        _ -> 12 - x

-- 각 분기는 of 키워드를 포함하는 줄의 시작 부분보다 오른쪽으로 들여써야하며 모든 분기의 들여쓰기가 같아야 한다.
-- case 분기의 좌변은 패턴일 뿐이므로 조각 함수 정의의 경우와 마찬가지로 바인딩에 쓰일 수 있다.
-- if 표현식처럼 case 표현식도 다른 포현식이 들어가는 어디든 끼워넣을 수 있다.

data Colour = Black | White | RGB Int Int Int
describeBlackOrWhite :: Colour -> String
describeBlackOrWhite c =
    "This colour is "
    ++ case c of
        Black -> "black"
        White -> "white"
        RGB 0 0 0 -> "black"
        RGB 255 255 255 -> "white"
        _ -> "... uh ... something else"
    ++ ", yeah?"


--------------------------------------------------
-- [연습문제]
-- case 문으로 fakeIf 함수를 구현하여 if 표현식을 대체해보자

fakeIf :: Bool -> a -> a -> a
fakeIf c a b =
    case c of
        True -> a
        _ -> b


--------------------------------------------------
-- [액션 제어 재조명]
-- case 문을 도입하여 복잡한 if 표현식으 대체할 수 있다.

doGuessing num = do
    putStrLn "Enter your guess: "
    guess <- getLine
    case compare (read guess) num of
        LT -> do putStrLn "Too Low!"
                doGuessing num
        GT -> do putStrLn "Too High!"
                doGuessing num
        EQ -> do putStrLn "You Win!"


--------------------------------------------------
-- [return에 관한 노트]
-- 하스켈의 return은 C나 JAVA의 그것과는 다르다.
-- return()은 아무것도 하지 않는 액션으로 평가된다.
-- 제어흐름에 아무런 영향도 미치지 않는다.


--------------------------------------------------
-- [연습문제]
-- 1. 간단한 입출력/액션 제어의 "Haskell greeting" 예제를 case 문으로 재작성하라.
-- 2. 다음 프로그램은 무엇을 출력하는가? 그 이유는?

main = 
    do x <- getX
        putStrLn x

getX = 
    do return "My Shagri-La"
        return "beneath"
        return "the summer moon"
        return "I will"
        return "return"
        return "again"
