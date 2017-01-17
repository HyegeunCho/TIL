-- 1. 초급반
-- 1-2. 하스켈 초급
-- 1-2-4. 타입 선언

--------------------------------------------------
-- 자신만의 타입을 정의하여 사용하면 다음과 같은 이점이 있다.
-- 1. 해결하려는 문제의 관점에서 코드를 작성할 수 있다.
-- 2. 데이터 조각들에 대해 의미를 부여할 수 있다.
-- 3. 새로운 타입에 대해 패턴 매칭과 타입 체계를 활용할 수 있다.

-- 하스켈에는 새로운 타입을 선언하는 세가지 방법이 있다.
-- 1. data 선언 : 데이터 타입을 정의
-- 2. type 선언 : 타입 동의어를 위한 것.
-- 3. newtype 선언 : 위의 두가지를 섞은 것. - 주로 최적화를 위해 사용한다.

--------------------------------------------------
-- [data와 생성자 함수]
-- data는 이미 있는 데이터 타입들을 사용하여 새로운 것을 정의하는 데 쓰인다.

data Anniversary = Birthday String Int Int Int -- name, year, month, day
    | Wedding String String Int Int Int -- spouse name 1, spouse name 2, year, month, day

-- 새로운 데이터 타입인 Anniversary를 선언하는데, Birthday도  Wedding도 될 수 잇다. 
-- 두 가능성의 정의는 수직 막대 (pipe)로 구분된다.
-- 위 선언으로 Anniversary에 대한 두 개의 생성자 함수를 얻게 되었다.
-- Birthday 함수와 Wedding 함수를 통해 새로운 Anniversary 타입 데이터를 제작할 수 있다.

-- data 선언으로 정의된 타입들을 대수적 데이터 타입이라고 부른다.

-- 첫번째 문자의 대소문자 여부가 중요하다. 
-- 타입의 이름과 생성자 함수는 대문자로 시작해야 한다.
-- Birthday 함수의 타입을 확인해보면 다음과 같다.
-- Birthday :: String -> Int -> Int -> Int -> Anniversary

-- 생성자를 사용하는 방법은 다음과 같다.

johnSmith :: Anniversary
johnSmith = Birthday "John Smith" 1968 7 3

smithWedding :: Anniversary
smithWedding = Wedding "John Smith" "Jane Smith" 1987 3 4

-- 두 기념일을 한 리스트에 넣을 수도 있다.

anniversariesOfJohnSmith :: [Anniversary]
anniversariesOfJohnSmith = [johnSmith, smithWedding]

-- 리스트를 구추갛ㄹ 때 생성자들을 바로 호출할 수도 있다.

anniversariesOfJohnSmith2 = [Birthday "John Smith" 1968 7 3, Wedding "John Smith" "Jane Smith" 1987 3 4]


--------------------------------------------------
-- [타입 분해하기]

showDate :: Int -> Int -> Int -> String
showDate y m d = show y ++ "-" ++ show m ++ "-" ++ show d

showAnniversary :: Anniversary -> String
showAnniversary (Birthday name year month day) = name ++ " born " ++ showDate year month day
showAnniversary (Wedding name1 name2 year month day) = name1 ++ " married " ++ name2 ++ " on " ++ showDate year month day

-- 데이터 타입을 분해하여 사용하는 함수의 인수로 생성자 함수의 시그니쳐를 전달한다.
-- 생성자 함수의 각 인자에는 별도의 이름을 부여헀다. 이 이름은 새로 정의한 함수 내부에서 사용한다.
-- 이름을 부여하는 작업을 바인딩이라고 부른다.
-- 변수를 각각의 값에 할당해서 함수 정의의 우변에서 그 값들을 참조할 수 있게 한다는 의미이다.

-- 두 종류의 기념일을 모두 처리하기 위해 생성자마다 하나씩 두개의 함수를 제공해야 한다.
-- 두 생성자 함수가 전달되어 바인딩되는 과정은 case 문이나 조각 함수 정의를 사용할 때 일어나는 일과 닮았다.
-- 생성자 이름과 바인딩 변수를 감싸는 괄호는 필수이다. 
-- 그렇지 않으면 컴파일러나 인터프리터가 이것들을 단일 인자로 취급하지 않는다.

-- 연습문제
-- 각각 년 월 일에 대응하는 세 Int로 구성된 Date 타입을 선언하라.
-- 그리고 나서 showDate를 재작성해 이 새로운 Date 데이터 타입을 사용하도록 만들어라

data Date = Date Int Int Int
exShowDate :: Date -> String
exShowDate(Date year month day) = show year ++ "-" ++ show month ++ "-" ++ show day

data ExAnniversary = ExBirthday String Date -- name, year, month, day
    | ExWedding String String Date -- spouse name 1, spouse name 2, year, month, day

exShowAnniversary (ExBirthday name date) = name ++ " born " ++ exShowDate date
exShowAnniversary (ExWedding name1 name2 date) = name1 ++ " married " ++ name2 ++ " on " ++ exShowDate date

exJohnSmith :: ExAnniversary
exJohnSmith = ExBirthday "John Smith" (Date 1968 7 3)

exSmithWedding :: ExAnniversary
exSmithWedding = ExWedding "John Smith" "Jane Smith" (Date 1987 3 4)


--------------------------------------------------
-- [타입 동의어를 만들기 위한 type]
-- Anniversary 타입 내의 String들이 이름으로 쓰이면서도 일반 String 처럼 조작할 수 있으면 좋겠다.
-- 기존 String 타입을 Name 타입명으로 사용할 수 있게 하는 것이다.

type Name = String

-- 위 코드를 통해 Name이 String의 동의어라고 선언한다.
-- String을 취하는 모든 함수는 이제 Name도 취한다. 또한 Name을 취하는 함수도 String을 받아들인다.

-- 실제로 String 타입은 아래와 같이 정의되어서 사용되고 있다.
-- type String = [Char]

-- 기념일 목록도 아래처럼 하나의 타입으로 묶을 수 있다.
type AnniversaryBook = [Anniversary]

-- type을 사용하여 위의 내용들을 다시 코딩해보자

data newAnniversary = Birthday Name Date
    | Wedding Name Name Date


