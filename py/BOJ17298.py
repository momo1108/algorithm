import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/17298

"""
stack 구조에 쌓아간다.

직전 요소보다 작거나 같은값이면 push
직전 요소보다 큰 값이 들어오면 pop 하고 다시 직전요소 체크
직전 요소를 pop 할 때, 직전 요소의 원래 순서를 알아야
오큰수를 위치에 맞게 저장할 수 있다.

위 과정을 숫자를 다 쓸때까지 반복한다.
마지막에 남아있는 애들은 오른쪽에 더 큰애가 없으니 오큰수가 모두 -1 이다.
"""

N = int(input())
answer = [-1] * N
nums = [int(_) for _ in input().split()]

# 스택에는 값과 위치를 저장
aStack = [(-1, 1000001)]

for i, num in enumerate(nums):
    while True:
        if num > aStack[-1][1]:
            poppedInfo = aStack.pop()
            answer[poppedInfo[0]] = num
        else:
            aStack.append([i, num])
            break

# stack에 남은 애들은 오큰수가 없으니 -1 그대로 유지
print(*answer)
