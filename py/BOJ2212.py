import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2212

N = int(input())
K = int(input())
"""
1 3 6 7 9
 2 3 1 2

3 6 7 8 10 12 14 15 18 20
 3 1 1 2  2  2  1  3  2

각 센서별 거리 차이 중 큰 걸 하나씩 지운다.
총 K - 1 번 지운 후 남은 거리는 마지막 1개로 커버한다.

K 가 N 이상이면 각 센서위치별로 하나씩 집중국을 설치하므로 0이 답이된다
"""
sensor = list(set([int(a) for a in input().rstrip().split()]))

sensor.sort()

if K >= N:
    print(0)
else:
    dist = []
    for i in range(1, len(sensor)):
        dist.append(sensor[i] - sensor[i - 1])
    dist.sort()

    for k in range(K - 1):
        dist.pop()

    print(sum(dist))
