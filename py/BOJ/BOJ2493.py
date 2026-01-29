import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2493

N = int(input())
towers = [100000001, *[int(_) for _ in input().split()]]
stack = [0]
answer = []

"""
타워 정보를 Stack 에 순서대로 넣는다.

Stack 에 새로운 타워를 추가하는 작업은 다음 2가지로 나뉜다.
새로 삽입할 타워가 직전 타워보다 낮다?
- 그대로 삽입한다.
직전 타워보다 높다?
- 직전 타워를 pop 하고, 다시 직전 타워의 체크를 반복한다.

시간 복잡도는 N 만큼 삽입과 N 만큼의 pop 이
최대이기 때문에, O(N)이 된다.

0번 자리에 모든 타워를 수용할 수 있는 높이를 지정해서 편하게 처리하자.
"""

for i in range(1, N + 1):
    # 직전 타워에서 수신 불가능한 경우 pop 반복
    while towers[stack[-1]] < towers[i]:
        stack.pop()

    # 직전 타워에서 수신 가능한 경우
    answer.append(str(stack[-1]))
    stack.append(i)

print(" ".join(answer))
