# -*- coding: utf-8 -*-

# 소프트맥스 함수 구현 시, 오버플로를 막기 위해 입력값 중 최대값을 지수함수 계산 시, 빼준다

import numpy as np

def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a

    return y

a = np.array([0.3, 2.9, 4.0])
y = softmax(a)
print(y)
print(np.sum(y))

# 소프트맥스 함수의 출력의 총합은 1이다
# 따라서 소프트맥스 함수의 출력을 확률로 해석할 수 있다
# 소프트맥스 함수를 적용해도 각 원소의 대소관계는 변하지 않는다, 지수함수 exp가 단조 증가 함수이기 때문
# 결과적으로 신경망으로 분류할 때, 함수 계산의 자원 낭비를 막기 위해 출력층의 소프트맥스는 생략하는 것이 일반적. 생략해도 대소관계가 동일하므로..
