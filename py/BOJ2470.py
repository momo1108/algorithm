import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2470

"""
두 용액 중 하나를 기준으로 반대 값과 가장 가까운 것을 찾는다.
"""

N = int(input())
fluids = [int(_) for _ in input().split()]
fluids.sort()
answer = []


# 같으면 -1 return, 아니면 upperbound
# upperbound - 더 큰게 있으면, 그중 최소
# 더 큰게 없으면, 그중 최대
def binarySearch(fluid):
    left, right = 0, N - 1

    while left <= right:
        mid = (left + right) // 2

        if fluids[mid] == fluid:
            return -1
        elif fluids[mid] > fluid:
            right = mid - 1
        else:
            left = mid + 1
    return mid


minDiff = 2000000001
for f in fluids:
    resultIndex = binarySearch(-f)
    if resultIndex == -1:
        answer = [f, -f]
        break
    else:
        # 찾은 위치의 위 아래를 봐야하는데,
        # 위쪽은 upperbound 라 같은 용액일 확률이 없고
        # 아래쪽이 같은 용액일 확률을 고려해 2칸 아래까지 체크
        for i in range(resultIndex - 2, resultIndex + 2):
            if i < 0 or i >= N or fluids[i] == f:
                continue
            if abs(-f - fluids[i]) < minDiff:
                minDiff = abs(-f - fluids[i])
                answer = [f, fluids[i]]

print(*answer)
