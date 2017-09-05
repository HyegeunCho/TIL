# -*- coding: utf-8 -*-

##### 4.5.3 시험 데이터로 평가하기

# 오버피팅 여부를 확인하기 위해 학습 도중 정기적으로 훈련 데이터와 시험 데이터를 대상으로 정확도를 기록
# 1에폭당 한번씩 테스트 진행

import numpy as np
from dataset.mnist import load_mnist
from two_layer_net import TwoLayerNet

(x_train, t_train), (x_test, t_test) = load_mnist(normalize = True, one_hot_label = True)

train_loss_list = []
train_acc_list = []
test_acc_list = []

# 하이퍼 파라미터
iters_num = 10000 # 반복 횟수
train_size = x_train.shape[0]
batch_size = 100 # 미니 배치 크기
learning_rate = 0.1 # 학습률

# 1에폭당 반복 수
iter_per_epoch = max(train_size / batch_size, 1)


network = TwoLayerNet(input_size = 784, hidden_size = 50, output_size = 10)

for i in range(iters_num):
    # 미니배치 획득
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 기울기 계산
    grad = network.numerical_gradient(x_batch, t_batch)
    # grad = network.gradient(x_batch, t_batch) # 성능 개선판 1

    # 매개변수 갱신
    for key in ('W1', 'b1', 'W2', 'b2'):
        network.params[key] -= learning_rate * grad[key]

    # 학습 경과 기록
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)

    # 1에폭당 정확도 계산
    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)

        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)

        print("train acc, test acc | " + str(train_acc) + ", " + str(test_acc))


##### 4.6 정리

# 기계학습에서 사용하는 데이터셋은 훈련 데이터와 시험 데이터로 나눠 사용한다.
# 훈련 데이터로 학습한 모델의 범용 능력을 시험 데이터로 평가한다.
# 신경망 학습은 손실함수를 지표로, 손실함수의 값이 작아지는 방향으로 가중치 매개변수를 갱신한다.
# 가중치 매개변수를 갱신할 때는 가중치 매개변수의 기울기를 이용하고, 기울어진 방향으로 가중치의 값을 갱신하는 작업을 반복한다.
# 아주 작은 값을 주었을 때의 차분으로 미분하는 것을 수치 미분이라고 한다.
# 수치 미분을 이용해 가중치 매개변수의 기울기를 구할 수 있다.
# 수치미분을 이용한 계산에는 시간이 걸리지만, 그 구현은 간단하다.