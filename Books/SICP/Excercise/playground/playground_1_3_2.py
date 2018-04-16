a = lambda x: x + 4
#print(a(3))

def sum(term, a, next, b):
    if a > b:
        return 0
    else:
        return term(a) + sum(term, next(a), next, b)

def pi_sum(a, b):
    return sum(lambda x: 1.0 / (x * (x + 2)), a, lambda x: x+ 4, b)

# play
print(pi_sum(1, 1000))
