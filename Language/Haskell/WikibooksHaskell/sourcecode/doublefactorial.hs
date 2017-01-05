doublefactorial x
    | x <= 0 = 1
    | otherwise = x * doublefactorial (x - 2) 

doublefactorial2 0 = 1
doublefactorial2 1 = 1
doublefactorial2 x = x * doublefactorial2 (x - 2)

factorialLoop n = go n 1
    where 
    go n res
        | n > 1 = go (n - 1) (res * n)
        | otherwise = res

mult n 0 = 0
mult n 1 = n
mult n m = (mult n (m - 1)) + n

-- exercise 2-1-5
power x 0 = 1
power x 1 = x
power x y = (power x (y - 1)) * x

-- exercise 2-1-6
plusOne x = x + 1
addition x 0 = x
addition x y = addition (plusOne x) (y - 1)

-- exercise 2-1-7
log2 1 = 0
log2 n = 1 + log2 (n / 2)

log2new n = 1 + log2 ((makeEven n) / 2)
    where
    makeEven n 
        | :t (n / 2) == Fraction 