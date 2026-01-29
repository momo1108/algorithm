import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2110

N, C = [int(_) for _ in input().split()]
X = []

for _ in range(N):
    X.append(int(input()))

X.sort()


# 1번 공유기부터 특정 거리 이상 떨어진 공유기가 있으면 공유기설치
# => 카운트 누적하고, 해당 공유기부터 뒤의 공유기들이 거리 확인 반복
# C 이상 설치됐으면 True 를 return
def checkPossible(distance):
    current = 0
    count = 1
    for i in range(1, N):
        if X[i] - X[current] >= distance:
            count += 1
            current = i
            if count == C:
                return True
    return False


left, right = 1, 1000000000
answer = 1

# 이분탐색
# 설치가 가능하면 최대 거리 정답 갱신
while left <= right:
    mid = (left + right) // 2
    if checkPossible(mid):
        answer = mid
        left = mid + 1
    else:
        right = mid - 1

print(answer)
