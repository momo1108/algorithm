import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11663

N, M = [int(_) for _ in input().split()]
spots = [int(_) for _ in input().split()]
lines = []
for _ in range(M):
    lines.append([int(_) for _ in input().split()])


# minmax - 0 : min, 1 : max
def binarySearch(arr, value, minmax):
    left, right = 0, len(arr) - 1
    mid = (left + right) // 2
    answer = -1

    # 유효한 위치면 정답 갱신 후 범위를 좁혀나간다.
    while left <= right:
        mid = (left + right) // 2
        if minmax:
            if arr[mid] <= value:
                answer = mid
                left = mid + 1
            else:
                right = mid - 1
        else:
            if arr[mid] >= value:
                answer = mid
                right = mid - 1
            else:
                left = mid + 1

    return answer


answer = []
for line in lines:
    minIndex, maxIndex = binarySearch(spots, min(line), 0), binarySearch(
        spots, max(line), 1
    )
    if minIndex == -1 or maxIndex == -1:
        answer.append("0")
    else:
        answer.append(str(maxIndex - minIndex + 1))

print("\n".join(answer))
