import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1654

K, N = [int(_) for _ in input().split()]
arr = []

for _ in range(K):
    arr.append(int(input()))

arr.sort()


def checkPossible(arr, value, needCount):
    count = 0
    for a in arr:
        count += a // value
    return count >= needCount


def binarySearch(arr):
    left, right, answer = 0, (2**31 - 1), 1

    while left <= right:
        mid = (left + right) // 2
        if checkPossible(arr, mid, N):
            answer = mid
            left = mid + 1
        else:
            right = mid - 1

    return answer


print(binarySearch(arr))
