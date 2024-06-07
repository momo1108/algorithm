import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/10815
"""
원본 카드를 정렬 후
찾을 카드에 대해 각각 이분탐색을 적용한다.
"""
N = int(input())
ownCard = [int(c) for c in input().split()]
ownCard.sort()

M = int(input())
findingCard = [int(c) for c in input().split()]


def binarySearch(arr, value):
    left, right = 0, len(arr) - 1
    mid = (left + right) // 2

    while left <= right:
        if arr[mid] == value:
            return 1
        elif arr[mid] > value:
            right = mid - 1
        else:
            left = mid + 1
        mid = (left + right) // 2

    return 0


print(*[binarySearch(ownCard, c) for c in findingCard])
