from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2346

nums = range(1, int(input()) + 1)
dirs = [int(_) for _ in input().split()]

# 번호와 방향을 묶어서 덱으로 저장
dq = deque(zip(nums, dirs))

answer = []
# 풍선이 빌때까지 뽑아뽑아
while dq:
    balloon = dq.popleft()
    # 이동의 개념은 rotate 함수와는 반대 방향 개념이다.
    # 이동 횟수가 양수인 경우 popleft 로 인해 미리 한칸 땡겨지는걸 주의
    dq.rotate((-balloon[1] + 1) if balloon[1] > 0 else -balloon[1])
    answer.append(str(balloon[0]))
print(" ".join(answer))
