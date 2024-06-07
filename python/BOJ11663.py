import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11663

N, M = [int(_) for _ in input().split()]
spots = [int(_) for _ in input().split()]
lines = []
for _ in range(M):
    lines.append([int(_) for _ in input().split()])


def binarySearch(arr, value):
    left, right = 0, len(arr) - 1
    mid = (left + right) // 2

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == value:
            return mid
        elif arr[mid] > value:
            right = mid - 1
        else:
            left = mid + 1

    return mid

// 하한점을 찾는다면 결과를 그대로 최소 인덱스로 사용가능
// 상한점을 찾는다면 결과가 똑같은 수가 아닐 시 -1 해야함
print(binarySearch(spots, 0))
