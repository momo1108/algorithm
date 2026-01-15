import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1920

"""A = {}

N = int(input())

# 문자들의 입력여부, 출력값을 위해 자기자신을 key,  "1" 을 value 로 지정
for a in [int(_) for _ in input().split()]:
    A[a] = "1"

M = int(input())

# get 함수를 사용해 없는 문자인 경우 "0" 으로 저장
answer = []
for x in [int(_) for _ in input().split()]:
    answer.append(A.get(x, "0"))

print("\n".join(answer))"""

##############################################

N = int(input())
A = []
for a in [int(_) for _ in input().split()]:
    A.append(a)

A.sort()


def binarySearch(arr, value):
    left, right = 0, len(arr) - 1
    mid = (left + right) // 2

    while left <= right:
        if arr[mid] == value:
            return "1"
        elif arr[mid] < value:
            left = mid + 1
        else:
            right = mid - 1
        mid = (left + right) // 2

    return "0"


M = int(input())

# get 함수를 사용해 없는 문자인 경우 "0" 으로 저장
answer = []
for x in [int(_) for _ in input().split()]:
    answer.append(binarySearch(A, x))

print("\n".join(answer))
