# -*- coding: utf-8 -*-
import tensorflow as tf
import tensorflow.contrib.slim as slim
import numpy as np
import gym
import matplotlib.pyplot as plt

#%matplotlib inline

env = gym.make('CartPole-v0')

gamma = 0.99

def discount_rewards(r):
    # 보상의 1D 실수 배열을 취해서 할인된 보상을 계산한다.
    discounted_r = np.zeros_like(r)
    running_add = 0

    for t in reversed(range(0, r.size)):
        running_add = running_add * gamma + r[t]
        discounted_r[t] = running_add

    return discounted_r  

class agent():
    def __init__(self, lr, s_size, a_size, h_size):
        # 네트워크의 피드포워드 부분. 에이전트는 상태를 받아서 액션을 출력한다.
        self.state_in = tf.placeholder(shape=[None, s_size], dtype=tf.float32)
        hidden = slim.fully_connected(self.state_in, h_size, biases_initializer=None, activation_fn=tf.nn.relu)
        self.output = slim.fully_connected(hidden, a_size, biases_initializer=None, activation_fn=tf.nn.softmax)
        self.chosen_action = tf.argmax(self.output, 1)

        # 학습 과정 구현. 비용을 계산하기 위해 보상과 액션을 네트워크에 피드하고, 
        # 네트워크를 업데이트 하는데에 이를 이용한다.
        self.reward_holder = tf.placeholder(shape=[None], dtype=tf.float32)
        self.action_holder = tf.placeholder(shape=[None], dtype=tf.int32)

        self.indexes = tf.range(0, tf.shape(self.output)[0]) * tf.shape(self.output)[1] + self.action_holder
        self.responsible_outputs = tf.gather(tf.reshape(self.output, [-1]), self.indexes)

        self.loss = -tf.reduce_mean(tf.log(self.responsible_outputs) * self.reward_holder)

        tvars = tf.trainable_variables()
        self.gradient_holders = []

        for idx, var in enumerate(tvars):
            placeholder = tf.placeholder(tf.float32, name=str(idx) + '_holder')
            self.gradient_holders.append(placeholder)

        self.gradients = tf.gradients(self.loss, tvars)

        optimizer = tf.train.AdamOptimizer(learning_rate = lr)
        self.update_batch = optimizer.apply_gradients(zip(self.gradient_holders, tvars))

# 텐서플로 그래프를 리셋
tf.reset_default_graph()

# 에디전트를 로드
myAgent = agent(lr=1e-2, s_size=4, a_size=2, h_size=8)

# 에이전트를 학습시킬 총 에피소드의 수를 설정
total_episodes = 5000
max_ep = 999
update_frequency = 5

init = tf.global_variables_initializer()

# 텐서플로 그래프를 론칭
with tf.Session() as sess:
    sess.run(init)
    i = 0
    total_reward = []
    total_length = []

    gradBuffer = sess.run(tf.trainable_variables)

    for ix, grad in enumerate(gradBuffer):
        gradBuffer[ix] = grad * 0

    while i < total_episodes:
        s = env.reset()
        running_reward = 0
        ep_history = []
        for j in range(max_ep):
            # 네트워크 출력에서 확률적으로 액션을 선택
            a_dist = sess.run(myAgent.output, feed_dict={myAgent.state_in:[s]})
            a = np.random.choice(a_dist[0], p=a_dist[0])
            a = np.argmax(a_dist==a)

            # 주어진 밴듯에 대해 액션을 취한 데 대한 보상을 얻는다.
            s1, r, d, _ = env.step(a)
            ep_history.append([s, a, r, s1])
            s = s1
            running_reward += r

            if d == True:
                # 네트워크를 업데이트
                ep_history = np.array(ep_history)
                ep_history[:, 2] = discount_rewards(ep_history[:, 2])
                feed_dict = {myAgent.reard_holder:ep_history[:, 2], myAgent.action_holder:ep_history[:, 1], myAgent.state_in:np.vstack(ep_history[:, 0])}
                grads = sess.run(myAgent.gradients, feed_dict=feed_dict)

                for idx, grad in enumerate(grads):
                    gradBuffer[idx] += grad

                if i % update_frequency == 0 and i != 0:
                    feed_dict = dictionary = dict(zip(myAgent.gradient_holders, gradBuffer))
                    _ = sess.run(myAgent.update_batch, feed_dict=feed_dict)

                    for ix, grad in enumerate(gradBuffer):
                        gradBuffer[ix] = grad * 0
                
                total_reward.append(running_reward)
                total_length.append(j)
                break

        # 보상의 총계 업데이트
        if i % 100 == 0:
            print(np.mean(total_reward[-100:]))
        i += 1

