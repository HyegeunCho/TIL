# -*- coding: utf-8 -*-

##### 4.5 학습 알고리즘 구현하기

# 신경망 학습의 절차
# 전제 : 신경망에는 적용가능한 가중치(weight)와 편향(bias)이 있고, 이 가중치와 편향을 훈련 데이터에 적응하도록 조정하는 과정을 학습이라고 한다.
# 아래는 경사 하강법의 단계
# 학습 1단계 - 미니배치 : 훈련 데이터 중 일부를 무작위로 가져온다. 이렇게 선별한 데이터를 미니 배치라고 하며, 그 미니배치의 손실함수 값을 줄이는 것이 목표
# 학습 2단계 - 기울기 산출 : 미니배치의 손실 함수 값을 줄이기 위해 각 가중치 매개변수의 기울기를 구한다. 기울기는 손실 함수의 값을 가장 작게 하는 방향을 제시한다.
# 학습 3단계 - 매개변수 갱신 : 가중치 매개변수를 기울기 방향으로 아주 조금 갱신한다.
# 학습 4단계 - 반복 : 1 ~ 3단계를 반복한다.

# 미니배치로 데이터를 무작위로 선정하는 경우 확률적 경사 하강법이라 한다.


##### 4.5.1 2층 신경망 클래스 구현하기

import sys, os
from common.functions import *
from common.gradient import numerical_gradient
import numpy as np

class TwoLayerNet:
    ## 초기화를 수행
    ## input_size : 입력층의 뉴런 수
    ## hidden_size : 은닉층의 뉴런 수
    ## weight_init_std : 출력층의 뉴런 수
    def __init__(self, input_size, hidden_size, output_size, weight_init_std=0.01):
        # 가중치 초기화
        ## 신경망의 매개변수를 보관하는 딕셔너리 변수 (인스턴스 변수)
        self.params = {}
        self.params['W1'] = weight_init_std * np.random.randn(input_size, hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std * np.random.randn(hidden_size, output_size)
        self.params['b2'] = np.zeros(output_size)

    ## 예측(추론)을 수행
    ## x : 이미지 데이터
    def predict(self, x):
        W1, W2 = self.params['W1'], self.params['W2'] # 첫번째 층과 두번째 층의 가중치
        b1, b2 = self.params['b1'], self.params['b2'] # 첫번째 층과 두번째 층의 편향

        a1 = np.dot(x, W1) + b1  # 첫번째 층의 출력값
        z1 = sigmoid(a1)  # 첫번째 층 출력값의 활성함수 결과
        a2 = np.dot(z1, W2) + b2  # 두번째 층의 출력값
        y = softmax(a2)  # 두번째 층의 출력값 (전체 네트워크의 출력)의 활성함수 결과

        return y

    # x: 입력 데이터, t: 정답 레이블
    ## 손실함수의 값을 구함
    ## x: 이미지 데이터
    ## t: 정답 레이블
    def loss(self, x, t):
        y = self.predict(x)
        return cross_entropy_error(y, t)  # 예측값에 대한 손실함수 결과 반환

    ## 정확도를 구함
    def accuracy(self, x, t):
        y = self.predict(x)
        y = np.argmax(y, axis = 1)
        t = np.argmax(t, axis = 1)

        accuracy = np.sum(y == t) / float(x.shape[0])
        return accuracy

    # x: 입력 데이터, t: 정답 레이블
    ## 가중치 매개변수의 기울기를 구한다.
    def numerical_gradient(self, x, t):
        loss_W = lambda W: self.loss(x, t)

        grads = {}  ## 기울기 보관하는 딕셔너리 변수 (numerical_gradient() 메서드의 반환 값)
        grads['W1'] = numerical_gradient(loss_W, self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W, self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W, self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W, self.params['b2'])

        return grads



