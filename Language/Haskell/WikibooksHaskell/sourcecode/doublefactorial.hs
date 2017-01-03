doublefactorial x
    | x <= 0 = 1
    | otherwise = x * doublefactorial (x - 2) 

doublefactorial2 0 = 1
doublefactorial2 1 = 1
doublefactorial2 x = x * doublefactorial2 (x - 2)