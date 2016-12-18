# (6kyu) Linked List - Length & Count with Python

## Problem 

Implement Length() to count the number of nodes in a linked list.

```
length(null) === 0
length(1 -> 2 -> 3 -> null) === 3
```

Implement Count() to count the occurrences of and integer in a linked list.

```
count(null, 1) === 0
count(1 -> 2 -> 3 -> null, 1) === 1
count(1 -> 1 -> 1 -> 2 -> 2 -> 2 -> 2 -> 3 -> 3 -> null, 2) === 4
```

## Test Case

```python
test.describe("tests for counting the length of a linked list.")
list = build_one_two_three()
test.assert_equals(length(None), 0, "Length of null list should be zero.")
test.assert_equals(length(Node(99)), 1, "Length of single node list should be one.")
test.assert_equals(length(list), 3, "Length of the three node list should be three.")

test.describe("tests for counting occurrences of a particular integer in a linked list.")
list = build_one_two_three();
test.assert_equals(count(list, 1), 1, "list should only contain one 1.")
test.assert_equals(count(list, 2), 1, "list should only contain one 2.")
test.assert_equals(count(list, 3), 1, "list should only contain one 3.")
test.assert_equals(count(list, 99), 0, "list should return zero for integer not found in list.")
test.assert_equals(count(None, 1), 0, "null list should always return count of zero.")
```

## My Solution

재귀함수로 구현하면 쉽게 해결할 수 있다.
메모리 낭비를 막기 위해 꼬리 재귀로 구현. 그러나 예외처리는 하나도 안되어 있고, 또 쓸데없이 노드를 한번 더 탐색하고 있음.
차후 성능 상으로도 개선할 여지가 있고, 예외처리도 좀 필요하다.

```python
class Node(object):
    def __init__(self, data):
        self.data = data
        self.next = None
    
def length(node):
    if node is None:
        return 0
    else:
        return 1 + length(node.next)
  
def count(node, data):
    if node is None:
        return 0
    else:
        if node.data == data:
            return 1 + count(node.next, data)
        else:
            return count(node.next, data)
```