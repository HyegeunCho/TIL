# -*- coding: utf-8 -*-

# 미니 배치 학습

import sys, os
import numpy as np
from dataset.mnist import load_mnist

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

