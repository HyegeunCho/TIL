#-*- coding: utf-8 -*-
import numpy as np

num_points = 2000
vectors_set = []

for i in range(2000):
    if np.random.random() > 0.5:
        vectors_set.append([np.random.normal(0.0, 0.9),
                            np.random.normal(0.0, 0.9)])
    else:
        vectors_set.append([np.random.normal(3.0, 5.0),
                            np.random.normal(1.0, 0.5)])

import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({"x": [v[0] for v in vectors_set],
                   "y": [v[1] for v in vectors_set]})
plt.show()
