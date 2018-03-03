# -*- coding: utf-8 -*-

'''
연습문제 1.11
n < 3 일 때 f(n) = n 이고, n >= 3 일 때, f(n) = f(n - 1) + 2f(n - 2) + 3(f(n - 3)) 으로 정의한 함수 f 가 있다.
f 의 프로시저를 되도는 프로세스 (recursive process)가 나오도록 짜라.
아울러 반복 프로세스를 만들어 내는 프로시저도 만들어보라.
'''

def byRecursive(n):
    if n < 3:
        #print("\tRETURN: " + str(n))
        return n
    else:
        print("\tInput: %d, RETURN: f(%d) + 2f(%d) + 3f(%d)" % (n, n - 1, n - 2, n - 3))
        return byRecursive(n - 1) + 2 * byRecursive(n - 2) + 3 * byRecursive(n - 3)


#print("Recursive Test by 1: " + str(byRecursive(1)))
#print("Recursive Test by 3: " + str(byRecursive(3)))
#print("Recursive Test by 10: " + str(byRecursive(10)))

memo = {1: 1, 2: 2}
def byRecursiveWithMemo(n):
    if n in memo:
        return memo[n]

    if n < 3:
        if n not in memo:
            memo[n] = n
            print("Add key %d to memo: %d" % (n, memo[n]))

    else:
        if n not in memo:
            memo[n] = byRecursiveWithMemo(n - 1) + 2 * byRecursiveWithMemo(n - 2) + 3 * byRecursiveWithMemo(n - 3)
            print("Add key %d to memo: %d" % (n, memo[n]))
    return memo[n]

#print("RecursiveWithMemo Test by 1: " + str(byRecursiveWithMemo(1)))
#print("RecursiveWithMemo Test by 3: " + str(byRecursiveWithMemo(3)))
#print("RecursiveWithMemo Test by 10: " + str(byRecursiveWithMemo(10)))
#print("RecursiveWithMemo Test by 100: " + str(byRecursiveWithMemo(100)))
#print("RecursiveWithMemo Test by 4: " + str(byRecursiveWithMemo(4)))

class Calc:

    multiOneCount = 0
    multiTwoCount = 0
    multiThreeCount = 0
    calcValue = 0

    def __init__(self, value, one, two, three):
        self.multiOneCount = one
        self.multiTwoCount = two
        self.multiThreeCount = three
        self.calcValue = value

    def updateCalc(self):
        if self.calcValue < 3:
            return [Calc(self.calcValue, self.multiOneCount, self.multiTwoCount, self.multiThreeCount)];
        else:
            return [Calc(self.calcValue - 1, self.multiOneCount + 1, self.multiTwoCount, self.multiThreeCount)
                    , Calc(self.calcValue - 2, self.multiOneCount, self.multiTwoCount + 1, self.multiThreeCount)
                    , Calc(self.calcValue - 3, self.multiOneCount, self.multiTwoCount, self.multiThreeCount + 1)]

    def calculate(self):

        multiOne = (1 ** self.multiOneCount)
        multiTwo = (2 ** self.multiTwoCount)
        multiThree = (3 ** self.multiThreeCount)
        result = multiOne * multiTwo * multiThree * self.calcValue
        #print('(1 ** ' + str(self.multiOneCount) + ') * (2 ** ' + str(self.multiTwoCount) + ') * (3 ** ' + str(self.multiThreeCount) + ') * ' + str(self.calcValue) + ' = ' + str(result))
        return result

import copy
def byIterative(n):
    calcList = []
    calcList.append(Calc(n, 0, 0, 0))

    isBreak = False

    while isBreak is False:
        isBreak = True
        nextAppendList = []
        while len(calcList) > 0:
            curCalc = calcList.pop(0)
            if curCalc.calcValue >= 3:
                isBreak = False
            nextAppendList.extend(curCalc.updateCalc())

        calcList = copy.deepcopy(nextAppendList)
        nextAppendList = []

    result = 0
    while len(calcList) > 0:
        curCalc = calcList.pop(0)
        result += curCalc.calculate()

    return result


print("Iterative Test by 1: " + str(byIterative(1)))
print("Iterative Test by 3: " + str(byIterative(3)))
print("Iterative Test by 4: " + str(byIterative(4)))
print("Iterative Test by 10: " + str(byIterative(10)))












