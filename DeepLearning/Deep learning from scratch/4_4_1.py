# -*- coding: utf-8 -*-

import sys, os
import numpy as np

########## 4.4 기울기

# 모든 변수의 편미분을 벡터로 정리한 것을 기울기라고 한다.

def numerical_gradient(f, x):
    h = 1e-4 # 0.0001
    grad = np.zeros_like(x)  # x와 형상이 같고 모든 원소의 값이 0인 배열을 생성

    for idx in range(x.size):
        # 각 값을 미분하고,
        tmp_val = x[idx]
        # f(x + h) 계산
        x[idx] = tmp_val + h
        fxh1 = f(x)

        # f(x - h) 계산
        x[idx] = tmp_val - h
        fxh2 = f(x)

        # 그 미분 결과를 벡터에 저장
        grad[idx] = (fxh1 - fxh2) / (2 * h)
        x[idx] = tmp_val  # 값 복원

    return grad

########## 4.4.1 경사법(경사하강법)

# 신경망은 최적의 매개변수 값을 찾기 위해 손실 함수가 최솟값이 되는 지점을 찾아야 한다.
# 함수의 기울기를 잘 이용해 함수의 최솟값 (또는 가능한 한 작은 값)을 찾으려는 것이 경사법
# 기울기가 가리키는 곳에 정말 함수의 최소값이 있는지는 보장할 수 없다. (골짜기가 2군데 이상일 경우)

# 함수가 극소값, 최소값, 또는 안장점이 되는 장소에서는 기울기가 0이 된다.
# 극소값은 국소적인 최소값, 안장점은 한쪽에서는 최소값이고 다른 쪽에서는 최대값이 되는 지점

# 경사법은 현 위치에서 기울어진 방향으로 일정 거리만큼 이동.
# 이동한 이후 그 장소에서 다시 기울기를 구하고, 또 기울어진 방향으로 나아가기를 반복
# 이렇게 해서 함수의 값을 점차 줄여나가는 것이 경사법


# f : 최적화하려는 함수
# init_x : 초기값
# lr : 학습률 (learning rate)
# step_num : 경사법에 따른 반복 횟수
def gradient_descent(f, init_x, lr=0.01, step_num=100):
    x = init_x

    for i in range(step_num):
        grad = numerical_gradient(f, x)
        x -= lr * grad

    return x


def function_2(x):
    return x[0] ** 2 + x[1]**2

init_x = np.array([-3.0, 4.0])
print(gradient_descent(function_2, init_x = init_x, step_num = 100))

# 학습률이 너무 큰 경우
print(gradient_descent(function_2, init_x = init_x, lr=10.0, step_num=100))

# 학습률이 너무 작은 경우
print(gradient_descent(function_2, init_x=init_x, lr=1e-10, step_num=100))

# 학습률과 같이 사람이 직접 설정해줘야 하는 매개변수를 하이퍼파라미터 (초매개변수) 라고 부른다.
# 하이퍼파라미터를 결정하기 위해 여러 후보값 중에서 시험을 통해 가장 잘 학습하는 값을 찾는 과정이 필요하다.



