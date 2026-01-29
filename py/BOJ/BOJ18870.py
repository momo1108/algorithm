import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/18870

N = int(input())
X = [int(x) for x in input().split()]

# 원본 배열의 중복을 없애고 정렬.
Xr = list(set(X))
Xr.sort()
# 정렬된 값의 index 가 X'i 의 값이된다.
# { Xi : X'i } 형태로 저장한다.
Xr = {value: count for count, value in enumerate(Xr)}

print(*[Xr[x] for x in X])
