from tensorflow.examples.tutorials.mnist import input_data

# 훈련 데이터가 들어있는 mnist.train과 테스트 데이터가 들어있는 mnist.test를 얻게 된다.
# 각 이미지는 28 * 28 픽셀로 구성되어 있으므로 수치 행렬로 나타낼 수 있다.
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

# 데이터의 텐서 형태 확인
import tensorflow as tf
print(tf.convert_to_tensor(mnist.train.images).get_shape())


