from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1931

"""
회의 시작 가능 시간으로부터 가장 먼저 끝나는 회의들을 찾아나간다.
모든 시간들을 min heap 에 담고, 꺼내보면서 시작 가능시간인지 체크
시작 가능하면, 그 회의의 종료시간이 다음 시작 가능시간이 된다.
"""
startTime = 0
N = int(input())
meetings = []
for _ in range(N):
    start, end = [int(a) for a in input().rstrip().split()]
    meetings.append((end, start))

heapify(meetings)

answer = 0
while meetings:
    end, start = heappop(meetings)

    if start < startTime:
        continue

    answer += 1
    startTime = end
print(answer)
