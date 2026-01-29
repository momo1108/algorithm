import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2304

"""
stack 을 이용하는 문제같다.

기둥 정보를 저장할때는 [높이, 시작X좌표] 형태로 저장하자.

첫번째 최대값 기둥을 기준으로 입력을 받자.
첫번째 최대값까지의 기둥들은 다음과 같이 체크한다. L <= maxL
현재 추가할 기둥의 높이가 이전 기둥보다 높은가?
높으면 추가
낮으면 pass
최대값 이후의 기둥들은 다음과 같이 체크한다.
현재 추가할 기둥의 높이가 이전 기둥보다 높은가?
높으면 자신 이상의 값이 나올때까지 뒤에서부터 삭제
낮거나 같으면 추가

넓이 계산은
1. 최대 기둥 전까지는 높이가 높아지는 넓이 계산 방식
    이전 기둥의 높이 * (현재기둥시작 - 이전기둥시작)
2. 최대 기둥에 오면 최대 기둥이 여러개인지 확인하고 넓이 계산
    - 하나면 1*높이
    - 여러개면 (마지막 끝 - 첫번째 시작) * 높이
3. 이후부터는 높이가 낮아지는 넓이 계산 방식으로 가자.
    현대 기둥의 높이 * (현재기둥끝 - 이전기둥끝)
"""

N = int(input())
maxH = -1
maxL = 9999

inputs = []
stack = []

# 입력값 저장 후 좌표기준 정렬
for _ in range(N):
    L, H = [int(x) for x in input().rstrip().split()]
    if H > maxH:
        maxH = H
        maxL = L
    elif H == maxH:
        maxL = min(L, maxL)
    inputs.append([L, H])
inputs.sort()

# 기둥 정보 저장
for L, H in inputs:
    # stack 에 이전 요소가 있는 경우
    if stack:
        # 최대값 이전
        if L <= maxL:
            # 더 큰 기둥이 오면 삽입
            if H > stack[-1][1]:
                stack.append([L, H])
        # 최대값 이후
        else:
            # 더 큰 기둥이 오면
            if H > stack[-1][1]:
                # 자신 이상의 값이 나올때까지 뒤에서부터 삭제
                while H > stack[-1][1]:
                    stack.pop()
            stack.append([L, H])

    # stack 에 아무것도 없으면 그냥 삽입
    else:
        stack.append([L, H])
# 넓이 계산
answer = 0
for i in range(1, len(stack)):
    # 최대기둥 이전
    if stack[i][0] <= maxL:
        answer += stack[i - 1][1] * (stack[i][0] - stack[i - 1][0])
    # 최대기둥 이후
    else:
        answer += stack[i][1] * (stack[i][0] - stack[i - 1][0])

# 최대기둥 넓이 추가
answer += maxH
print(answer)
