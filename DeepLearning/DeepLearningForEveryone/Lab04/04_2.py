import numpy as np

xy = np.loadtxt("E:\Workspace\TIL\DeepLearning\DeepLearningForEveryone\Lab04\data-01-test-score.csv", delimiter=",", dtype=np.float32)
x_data = xy[:, 0:-1] # 전체 n 행중에서 마지막 열을 제외한 데이터를 가져옴
y_data = xy[:, [-1]] # 전체 행중에서 마지막 열만 가져옴 

# Make sure the shape and data are OK
print(x_data.shape, x_data, len(x_data))
print(y_data.shape, y_data)