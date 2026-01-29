from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/19638

"""
최대 힙 사용해서 거인을 빼자.
"""

N, H, T = [int(x) for x in input().rstrip().split()]


def solution():
    giants = []
    heapify(giants)
    for _ in range(N):
        heappush(giants, -int(input()))

    # T번 안에 제일 커졌으면 return
    for t in range(T):
        tallest = -heappop(giants)
        if tallest >= H:
            shrinked = -(tallest // 2) if tallest > 1 else -1
            heappush(giants, shrinked)
        else:
            print("YES")
            print(t)
            return

    # T번 다 한 후에 마지막으로 가장 큰애랑 비교
    tallest = -heappop(giants)
    if tallest >= H:
        print("NO")
        print(tallest)
    else:
        print("YES")
        print(T)


if __name__ == "__main__":
    solution()
