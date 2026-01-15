"""
1. 스택
스택은 LIFO
스택의 기본적인 동작들은 

원소추가 push
원소제거 pop
마지막원소 조회 peek

3가지가 있다.

파이썬에서는 list를 사용해서 구현한다.
"""

stack = []

# push 역할
stack.append(3)
stack.append(2)
stack.append(5)

# pop 역할
top = stack.pop()  # 5가 제거됨

# peek 역할
print(stack[-1])

"""
2. 큐
큐는 FIFO

스택의 기본적인 동작들은 

원소추가 enqueue
원소제거 dequeue
가장 먼저 추가된 원소 조회 peek

3가지가 있다.

collections.deque 를 사용한다.
"""

from collections import deque

queue = deque()

# enqueue
queue.append(1)
queue.append(3)

# dequeue
b = queue.popleft()  # 1이 제거됨

# peek
print(queue[0])

"""
3. 덱(Deque)
양방향에서 데이터 조작이 가능한 자료구조이다.
스택 + 큐 라고 생각하면 편하다.

스택의 기본적인 동작들은 

오른쪽 끝 원소추가 append
왼쪽 끝 원소추가 appendleft
오른쪽 끝 원소제거 pop
왼쪽 끝 원소제거 popleft

등이 있다.

collections.deque 를 사용한다.

애초에 list 대신 deque 를 사용하면 안될까?
=> 양쪽 끝에서의 인덱싱은 O(1) 이지만, 중간에서는 O(N) 으로 느려진다.
   무작위 액세스를 빠르게 하기 위해서는 리스트를 사용하는게 맞다.
   https://docs.python.org/ko/3/library/collections.html#deque-objects
따라서 양쪽 끝 값만 조작하는 경우 deque, 그 외에는 list 를 사용하는것이 유리하다.
"""
from collections import deque

deck = deque()

# 추가
deck.append(1)
deck.appendleft(2)
deck.append(3)

# 제거
right = deck.pop()
left = deck.popleft()
print(left, right)
