import tensorflow as tf
import numpy as np
import datetime

algorithm = 'CNN'

img_size = 28
data_size = img_size ** 2

num_label = 10

batch_size = 256
num_epoch = 50

learning_rate = 0.00025

date_time = datetime.datetime.now().strftime("%Y%m%d-%H-%M-%S")

save_path = "../saved_models/" + date_time + "_" + algorithm
load_path = "../saved_models"

load_model = False

# 데이터 불러오기
mnist = tf.keras.datasets.mnist.load_data(path = 'mnist.npz')

x_train = mnist[0][0]
y_train = mnist[0][1]
x_test = mnist[1][0]
y_test = mnist[1][1]

# x_test는 원래 [데이터의 수, 이미지 크, 이미지 크기] 의 shape로 구성된 배열이다.
# reshape를 통해 가장 마지막에 디멘젼을 하나 추가한다. 추가된 디멘젼은 채널을 의미 => mnist 이미지는 흑백 이미지이므로 채널이 하나이다.
# 새로운 shape 파라미터에서 제일 앞을 -1로 설정하면 나머지 데이터의 크기에 맞춰서 자동으로 값을 설정해 준다.
x_test = np.reshape(x_test, [-1, img_size, img_size, 1])

y_train_onehot = np.zeros([y_train.shape[0], num_label])
y_test_onehot = np.zeros([y_test.shape[0], num_label])

for i in range(y_train.shape[0]):
    y_train_onehot[i, y_train[i]] = 1

for i in range(y_test.shape[0]):
    y_test_onehot[i, y_test[i]] = 1

# Validation Set 생성
x_train, x_val = x_train[:len(x_train) * 9 // 10], x_train[len(x_train) * 9 // 10:]
y_train_onehot, y_val_onehot = y_train_onehot[:len(y_train) * 9 // 10], y_train_onehot[len(y_train) * 9 // 10]

x_val = np.reshape(x_val, [-1, img_size, img_size, 1])

# Model 클래스에서는 MNIST 데이터 세트를 분류하기 위한 합성곱 신경망 모델을 설계하고
# 학습에 필요한 손실함수 값을 설정한다.
class Model():

    def __init__(self):
        # 입력 및 실제값
        self.x_input = tf.placeholder(tf.float32, shape = [None, img_size, img_size, 1])
        self.x_normalize = (self.x_input - (255.0 / 2)) / (255.0 / 2)

        self.y_target = tf.placeholder(tf.float32, shape = [None, num_label])

        # 네트워크 (Conv -> 2, hiddenlayer -> 1)
        self.conv1 = tf.layers.conv2d(self.x_normalize, filters = 32, activation = tf.nn.relu, kernel_size = [3, 3], strides = [2, 2], padding = "same")
        self.conv2 = tf.layers.conv2d(self.conv1, filterse = 64, activation = tf.nn.relu, kernel_size = [3, 3] ,strides = [2, 2], padding = "same")

        # 이미지 형태의 피쳐맵을 1차원의 벡터 형태로 변환
        self.flat = tf.layers.flatten(self.conv2)

        self.fc1 = tf.layers.dense(self.flat, 128, activation = tf.nn.relu)
        self.out = tf.layers.dense(self.fc1, num_label)

        # 손실함수 계산 및 학습 수행
        self.loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logist_v2(labels = self.y_target, logits = self.out))
        self.UpdateModel = tf.train.AdamOptimizer(learning_rate).minimize(self.loss)

# CNN 학습을 위한 다양한 함수
class CNN():
    def __init__(self):
        self.model = Model()
        # tensorflow 세션 초기화
        self.sess = tf.Session()
        self.init = tf.global_variables_initializer()
        self.sess.run(self.init)

        self.Saver = tf.train.Saver()

        self.Train_Summary, self.Val_Summary, self.Merge = self.Make_Summary()

        # 모델 불러오기
        if load_model == True:
            self.Saver.restore(self.sess, load_path)


    # 모델 학습
    def train_model(self, data_x, data_y, batch_idx):
        len_data = data_x.shape[0]

        if batch_idx + batch_size < len_data:
            batch_x = data_x[batch_idx : batch_idx + batch_size, :, :, :]
            batch_y = data_y[batch_idx : batch_idx + batch_size, :]
        else:
            batch_x = data_x[batch_idx : len_data, :, :, :]
            batch_y = data_y[batch_idx : len_data, :]

        _, loss, output = self.sess.run([self.model.UpdateModel, self.model.loss, self.model.out], feed_dict={self.model.x_input:batch_x, self.model.y_target: batch_y})
        accuracy = self.get_accuracy(output, batch_y)
        return loss, accuracy

    # 알고리즘 성능 테스트
    def test_model(self, data_x, data_y):
        loss, output = self.sess.run([self.model.loss, self.model.out], feed_dict={self.model.x_input: data_x, self.model.y_target: data_y})
        accuracy = self.get_accuracy(output, data_y)
        return loss, accuracy

    # 정확도 계산
    def get_accuracy(self, pred, label):
        num_correct = 0.0
        for i in range(label.shape[0]):
            if np.argmax(label[i, :]) == np.argmax(pred[i, :]):
                num_correct += 1.0

        accuracy = num_correct / label.shape[0]
        return accuracy

    # 모델 저장
    def save_model(self):
        self.Saver.save(self.sess, save_path + "/model/model")

    # 텐서보드에 손실함수 값 및 정확도 저장
    def Make_Summary(self):
        self.summary_loss = tf.placeholder(dtype = tf.float32)
        self.summary_acc = tf.placeholder(dtype = tf.float32)

        tf.summary.scalar("Loss", self.summary_loss)
        tf.summary.scalar("Accuracy", self.summary_acc)

        Train_Summary = tf.summary.FileWriter(logdir = save_path + "/train")
        Val_Summary = tf.summary.FileWriter(logdir = save_path + "/val")
        Merge = tf.summary.merge_all()

        return Train_Summary, Val_Summary, Merge

    def Write_Summary(self, accuracy, loss, accuracy_val, loss_val, batch):
        self.Train_Summary.add_summary(self.sess.run(self.Merge, feed_dict={self.summary_loss: loss, self.summary_acc: accuracy}), batch)
        self.Val_Summary.add_summary(self.sess.run(self.Merge, feed_dict={self.summary_loss: loss_val, self.summary_acc: accuracy_val}), batch)



cnn = CNN()

data_train = np.zeros([len(x_train), data_size + num_label])
data_train[:, :data_size] = np.reshape(x_train, [-1, data_size])
data_train[:, data_size:] = y_train_onehot

batch_num = 0

loss_list = []
acc_list = []
loss_val_list = []
acc_val_list = []

# 학습 수행
for epoch in range(num_epoch):
    # 데이터를 섞은 후 입력과 실제값 분석
    np.random.shuffle(data_train)
    train_x = data_train[:, :data_size]
