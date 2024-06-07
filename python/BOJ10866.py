import sys
from collections import deque

input = sys.stdin.readline
# https://www.acmicpc.net/problem/10866

N = int(input())
d = deque()

answer = []
for _ in range(N):
    command = input().rstrip().split(" ")

    if command[0] == "push_front":
        d.appendleft(int(command[1]))
    elif command[0] == "push_back":
        d.append(int(command[1]))
    elif command[0] == "pop_front":
        answer.append(-1 if not d else d.popleft())
    elif command[0] == "pop_back":
        answer.append(-1 if not d else d.pop())
    elif command[0] == "size":
        answer.append(len(d))
    elif command[0] == "empty":
        answer.append(1 if not d else 0)
    elif command[0] == "front":
        answer.append(-1 if not d else d[0])
    else:
        answer.append(-1 if not d else d[-1])

print("\n".join([str(_) for _ in answer]))
