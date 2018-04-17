def cube(x):
    return x * x * x

def inc(x):
    return x + 1

def indentity(x):
    return x

def sum_integers(a, b):
    if a  > b:
        return 0
    else:
        return a + sum_integers(a + 1, b)

def sum_cubes(a, b):
    if a > b:
        return 0
    else:
        return cube(a) + sum_cubes(a + 1, b)

def pi_sum(a, b):
    if a > b:
        return 0
    else:
        return (1.0 / (a * (a + 2))) + (pi_sum(a + 4, b))

def sum(term, a, next, b):
    if a > b:
        return 0
    else:
        return term(a) + sum(term, next(a), next, b)

def new_sum_integers(a, b):
    return sum(indentity, a, inc, b)

def new_sum_cubes(a, b):
    return sum(cube, a, inc, b)

def pi_term(x):
    return 1.0 / (x * (x + 2))

def pi_next(x):
    return x + 4

def new_pi_sum(a, b):
    return sum(pi_term, a, pi_next, b)

# play
#print(sum_integers(1, 3))
#print(new_sum_integers(1, 3))

#print(sum_cubes(1, 3))
#print(new_sum_cubes(1, 3))

print(pi_sum(1, 1000))
print(new_pi_sum(1, 1000))

