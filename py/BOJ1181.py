import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1181

N = int(input())

arr = set()

for _ in range(N):
    arr.add(input().rstrip())

arr = list(arr)
arr.sort(key=lambda x: (len(x), x))

print("\n".join(arr))
