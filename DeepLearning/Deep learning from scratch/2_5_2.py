# -*- coding: utf-8 -*-

# AND, NAND, OR를 사용하여 XOR 게이트 구현하기
import numpy as np


def AND(x1, x2):
    x = np.array([x1, x2])
    # weight는 각 입력 신호가 결과에 주는 영향력(중요도)를 조절하는 매개변수
    w = np.array([0.5, 0.5])
    # bias는 뉴런이 얼마나 쉽게 활성화(결과로 1을 반환)하느냐를 조정하는 매개변수
    b = -0.7

    # numpy에서는 배열의 길이가 같을 경우 배열의 곱 연산 시, 각 원소끼리 곱 연산을 수행
    # Weighted Sum
    tmp = np.sum(w * x) + b

    if tmp <= 0:
        return 0
    elif tmp > 0:
        return 1


def NAND(x1, x2):
    x = np.array([x1, x2])
    w = np.array([-0.5, -0.5])
    b = 0.7

    tmp = np.sum(w * x) + b

    if tmp <= 0:
        return 0
    else:
        return 1


def OR(x1, x2):
    x = np.array([x1, x2])
    w = np.array([0.5, 0.5])
    b = -0.2

    tmp = np.sum(w * x) + b

    if tmp <= 0:
        return 0
    else:
        return 1

def XOR(x1, x2):
    s1 = NAND(x1, x2)
    s2 = OR(x1, x2)
    y = AND(s1, s2)

    return y

print(XOR(0, 0))
print(XOR(1, 0))
print(XOR(0, 1))
print(XOR(1, 1))
