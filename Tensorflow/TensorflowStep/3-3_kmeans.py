#-*- coding:utf-8 -*-
import numpy as np

num_points = 2000
vectors_set = []

for i in range(num_points):
    if np.random.random() > 0.5:
        vectors_set.append([np.random.normal(0.0, 0.9),
                            np.random.normal(0.0, 0.9)])
    else:
        vectors_set.append([np.random.normal(3.0, 0.5),
                            np.random.normal(1.0, 0.5)])

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
'''
df = pd.DataFrame({"x": [v[0] for v in vectors_set],
                   "y": [v[1] for v in vectors_set]})
sns.lmplot("x", "y", data=df, fit_reg=False, size=6)
plt.show()
'''
# K-means algorithm using tensorflow
import tensorflow as tf

# 모든 데이터를 텐서로 옮긴다. 무작위로 생성한 데이터를 가지고 상수 텐서를 만든다.
# vectors는 D0차원의 크기가 2000개고 D1차원의 크기가 2 (각 점이 x, y좌표)인 형태
vectors = tf.constant(vectors_set)

# 몇 개의 그룹으로 나눌 지 설정.
k = 4
# 입력 데이터를 무작위로 섞어서 K개의 중심을 선택.
# centroides는 D0 차원의 크기가 4, D1차원의 크기가 2 (각 점의 x, y좌표)인 형태.
centroides = tf.Variable(tf.slice(tf.random_shuffle(vectors), [0, 0], [k, -1]))

# vectors (전체 데이터)와 centroides(랜덤하게 결정한 4개의 중심) 사이의 유클리디안 거리를 구하려 한다
# 이때, vectors 행렬과 centroides 행렬의 크기가 서로 상이한 문제점이 있다.
# vectors는 D0차원이 2000이고 centroides는 D0차원이 4이다. (D1차원은 둘 다 2이므로 상관없다.)
# expand_dims를 사용하여 2차원 벡터를 3차원으로 바꿔서 subtract할 수 있도록
expanded_vectors = tf.expand_dims(vectors, 0)
expanded_centroides = tf.expand_dims(centroides, 1)

# tf.reduce_sum(tf.squre(tf.subtract(...))) 코드는 두 벡터 간의 유클리디안 디스턴스를 계산
# 유클리디안 거리는 여러 거리 사이의 대소 관계를 비교하기 위한 값

# tf.subtract 함수는 텐서플로의 브로드캐스팅 기능 덕분에 두 텐서의 각 원소를 어떻게 빼야 할지 스스로 알아낼 수 있다.
# 크기가 1인 차원은 텐서 연산 시 다른 텐서의 해당 차원 크기에 맞게 계산을 반복하므로 마치 차원이 늘어난 것 같은 효과를 가진다.
diff = tf.subtract(expanded_vectors, expanded_centroides)
sqr = tf.square(diff)
# 매개변수로 지정한 차원을 따라 원소들을 더하여 처원을 감소시킨다.
distances = tf.reduce_sum(sqr, 2)
# 지정한 차원에서 가장 작은 값이 인덱스를 리턴 - 각 데이터의 중심이 assignments에 할당됨.
assignments = tf.argmin(distances, 0)

# 아래와 같이 한 줄로 작성할 수도 있다.
#assignments = tf.argmin(tf.reduce_sum(tf.square(tf.subtract(expanded_vectors, expanded_centroides)), 2), 0)

# 매 반복마다 새롭게 그룹화를 하면서 각 그룹에 해당하는 새로운 중심을 다시 계산.
# K 개의 군집에 속하는 점들의 평균을 가진 K 개의 텐서를 합쳐서 means 텐서를 만든다.
# 1. equal 함수를 사용하여 한 군집고 매칭되는 assignments 텐서의 각 원소 위치를 True로 표시하는 불리언 텐서 (Dimension(2000))를 만든다.
# 2. where 함수를 사용하여 매개변수로 받은 불리언 텐서에서 True로 표시된 위치를 값으로 가지는 텐서(Dimension(2000) * Dimension(1))를 만든다.
# 3. reshape 함수를 사용하여 c 군집에 속한 vectors 텐서의 포인트들의 인덱스로 구성된 텐서 (Dimension(1) * Dimension(2000))를 만든다.
# 4. gather 함수를 사용하여 c 군집을 이루는 점들의 좌표를 모든 텐서 (Dimension(1) * Dimension(2000) * Dimension(2))를 만든다.
# 5. reduce_mean 함수를 사용하여 c 군집에 속한 모든 점의 평균 값을 가진 텐서 (Dimension(1) * Dimension(2))를 만든다.
tempResult = [tf.reduce_mean(tf.gather(vectors,tf.reshape(tf.where(tf.equal(assignments, c)), [1, -1])), reduction_indices=[1]) for c in range(k)]
means = tf.concat(tempResult, 0)

# 중심을 means 텐서의 값을 centroids에 할당하는 연산 - 그래야 run 메서드가 실행될 때 업데이트된 중심 값이 다음번 루프에 사용됨.
update_centroides = tf.assign(centroides, means)

# 데이터 그래프를 실행하기 전에 모든 변수를 초기화
init_op = tf.global_variables_initializer()

sess = tf.Session()
sess.run(init_op)

# 매 반복마다 중심은 업데이트되고 각 점은 새롭게 군집에 할당됨.
for step in range(100):
    # 파이썬 사용자들은 결과를 버릴 때, _를 사용하는 것이 관습
    _, centroid_values, assignment_values = sess.run([update_centroides, centroides, assignments])

# draw graph
data = {"x": [], "y": [], "cluster":[]}

for i in range(len(assignment_values)):
    data["x"].append(vectors_set[i][0])
    data["y"].append(vectors_set[i][1])
    data["cluster"].append(assignment_values[i])

df = pd.DataFrame(data)
sns.lmplot("x", "y", data=df, fit_reg=False, size=6, hue="cluster", legend=False)
plt.show()

