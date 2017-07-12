# -*- coding: utf-8 -*-

# 4.2.4 (배치용) 교차 엔트로피 오차 구현하기

import sys, os
import numpy as np
from dataset.mnist import load_mnist

def cross_entropy_error(y, t):
    # y가 1차원이라면, 즉 데이터 하나당 교차 엔트로피 오차를 구하는 경우는 reshape 함수로 데이터의 형상을 바꿔준다.
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    batch_size = y.shape[0]
    return -np.sum(t * np.log(y)) / batch_size

def cross_entropy_error_forLabel(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    batch_size = y.shape[0]
    # np.arange(batch_size)는 0 부터 batch_size-1 까지 배열을 생성
    # t 에는 레이블이 [2, 7, 0, 9, 4] 와 같이 저장되어 있으므로 y[np.arange(batch_size), t] 는 각 데이터의 정답 레이블에 해당하는 신경망의 출력을 추출

    return -np.sum(np.log(y[np.arange(batch_size), t])) / batch_size

(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label=True)

print(x_train.shape)
print(t_train.shape)

train_size = x_train.shape[0]
batch_size = 10

# np.random.choice() 함수를 사용하면 지정한 범위의 수 중에서 무작위로 원하는 개수만 꺼낼 수 있다.
batch_mask = np.random.choice(train_size, batch_size)
print(batch_mask)

x_batch = x_train[batch_mask]
t_batch = t_train[batch_mask]

# 4.2.5 왜 손실함수를 설정하는가?

'''
왜 정화도라는 지표를 놔두고 손실 함수의 값이라는 우회적인 방법을 택하는 것인가?

신경망 학습에서는 최적의 매개변수(가중치와 편향)를 탐색할 때 손실 함수의 값을 가능한 한 작게 하는 매개변수 값을 찾는다.
이때 매개변수의 미분(정확히는 기울기)을 계산하고, 그 미분 값을 단서로 매개변수의 값을 서서히 갱신하는 과정을 반복한다. (경사하강법)

가중치 매개변수의 손실 함수의 미분이란, 
"가중치 매개변수의 값을 아주 조금 변화시켰을 때, 손실 함수가 어떻게 변하나"라는 의미.

정확도를 지표로 삼아선 안되는 이유는 그 미분 값이 대부분의 장소에서 0 이 되어 매개변수를 갱신할 수 없기 때문이다.
만약 100장의 훈련 데이터 중 32장을 올바르다고 인식할 경우 정확도는 32%이다.
매개변수를 약간 조절한다고 해도 정확도는 32% 그대로일 가능성이 높고, 만약 개선된다고 해도 33%, 34%와 같은 불연속적인 값이다.

반면 손실함수는 매개변수의 조절에 민감하게 연속적으로 값이 변화한다.

이러한 이유로 활성화함수로 계단함수를 사용하지 않는 것.
'''