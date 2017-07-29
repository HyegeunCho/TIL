# -*- coding: utf-8 -*-

########## 4.4.2 신경망에서의 기울기

# 신경망 학습에서의 기울기는 가중치 매개변수에 대한 손실함수의 기울기를 말한다.
# 손실함수에 대한 가중치 편미분 : 즉 가중치 W를 조금 변경했을 때, 손실함수 L이 얼마나 변화하느냐

import numpy as np
from common.functions import softmax, cross_entropy_error
from common.gradient import numerical_gradient

class simpleNet:
    def __init__(self):
        self.W = np.random.randn(2, 3)  # 정규분포로 초기화

    # 예측을 수행하는 함수
    def predict(self, x):
        return np.dot(x, self.W)

    # 손실함수
    def loss(self, x, t):
        z = self.predict(x)
        y = softmax(z)
        loss = cross_entropy_error(y, t)

        return loss

net = simpleNet()
print("Weight: ")
print(net.W)

x = np.array([0.6, 0.9])
p = net.predict(x)
print()
print("predict value")
print(p)
print("argmax index")
print(np.argmax(p))

t = np.array([0, 1, 0])  # 정답 레이블
print(net.loss(x, t))


#def f(W):
#    return net.loss(x, t)
f = lambda w: net.loss(x, t)

dW = numerical_gradient(f, net.W)
print(dW)
