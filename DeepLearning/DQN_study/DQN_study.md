# Q Learning

각 상태에서의 값을 학습하여 특정 상태에서 가장 최적의 액션을 수행하도록 하는 방식.

## 테이블식 접근

주어진 환경에서 가능한 모든 상태와 액션에 대한 값의 테이블로 표현.

테이블의 각 셀에서 어떤 상태에서 특정 액션을 취했을 때 그것이 얼마나 좋은지 수치화한 값을 학습.

**벨먼방정식**을 이용해 Q테이블을 업데이트하는데, 주어진 액션에 대해 기대되는 장기 보상이 현재의 액션에서 얻는 즉각적 보상과 다음 상태에서 취할 최선의 미래의 액션에서 기대되는 보상의 조합과 같다는 내용.

![bellman_equation.png](image/bellman_equation.png)

어떤 상태 s와 액션 a에 대한 최적의 Q값은 현재의 보상 r과 다음 상태(s')에 대해 테이블에 의해 기대되는 할인된 (gamma) 최대 미래 보상의 합으로 표현할 수 있다는 것이다.

할인 계수 감마를 사용함으로써 현재의 보상에 비해 미래의 가능한 보상이 얼마나 중요한 지 비율을 정할 수 있다.

# QN에서 DQN으로

1. 단일 계층 네트워크를 다계층 합성곱 네트워크로 확장
2. 경험 리플레이의 구현 - 네트워크가 자신의 경험에 저장된 기억을 이용해 스스로 학습
3. 제 2의 타깃 네트워크를 활용하여 업데이트 시 타깃 Q값을 계산


# 참고자료

- [https://github.com/golbin/TensorFlow-Tutorials](https://github.com/golbin/TensorFlow-Tutorials)
- [오픈AI 블로그 베이스라인 DQN](https://blog.openai.com/openai-baselines-dqn/)
- [Towards Data Science - DQN](https://towardsdatascience.com/welcome-to-deep-reinforcement-learning-part-1-dqn-c3cab4d41b6b)
