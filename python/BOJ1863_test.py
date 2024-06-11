import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1863_test

"""
주어진 위치와 높이를 기준으로 stack 에 저장한다.
이 때 몇가지 규칙이 있다.
1. stack 에 아무것도 없으면 그냥 저장
2. stack 의 마지막 값이 입력값보다 낮으면 그냥 저장
3. stack 의 마지막 값이 입력값보다 높으면 마지막 값 추출 후 답 + 1 누적
    - 추출 후의 마지막값이 또 높으면 반복
4. stack 의 마지막 값이 입력값과 같으면 생략
    - 이 경우는 3번 과정 수행 후에만 가능한 경우

모든 입력이 끝나고 마지막에 stack 에 남아있는 값이 있다면
높이의 오름차순으로 저장되어있는 값들일 것이다.

이들을 순서대로 pop 해서 각각 답 + 1 누적
"""

stack = [0]

n = int(input())

answer = 0
for _ in range(n):
    x, y = [int(a) for a in input().rstrip().split()]

    while stack and stack[-1] > y:
        stack.pop()
        answer += 1

    if stack and stack[-1] < y:
        stack.append(y)
    elif not stack:
        stack.append(y)

while stack:
    stack.pop()
    answer += 1

print(answer - 1)
