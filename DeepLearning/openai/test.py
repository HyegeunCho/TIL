# Step function returns 4 values
#   observation : representing your observation of the environment. (pixel data from camera, joint angles and joint velocities of the robot)
#   reward : amount of reward achieved by the previous action. The goal is always to increase your total reward.
#   done : whether it's time to reset the environment again. done being True indicates the episode has terminated.
#   info : diagnostic information useful for debugging.
# agent choose an action, and the environment returns an observation and a reward
    

import gym
env = gym.make('CartPole-v0')
for i_episode in range(20):
    observation = env.reset() # reset returns initial observation
    for t in range(100):
        env.render()
        print(observation)
        action = env.action_space.sample()
        observation, reward, done, info = env.step(action)
        if done: 
            print("Episode finished after {} timesteps.".format(t + 1))
            break
