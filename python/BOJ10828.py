import sys
input = sys.stdin.readline
# https://www.acmicpc.net/problem/10828

N = int(input())
stack = []
answer = []

for _ in range(N):
    command = input().strip().split(" ")
    c = command[0]
    
    if c == "push":
        stack.append(command[1])
    elif c == "pop":
        answer.append(stack.pop() if len(stack) > 0 else "-1")
    elif c == "size":
        answer.append(str(len(stack)))
    elif c == "empty":
        answer.append("1" if len(stack) == 0 else "0")
    elif c == "top":
        answer.append(stack[-1] if len(stack) > 0 else "-1")

print("\n".join(answer))