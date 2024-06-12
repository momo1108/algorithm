import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11559

pMap = []

for _ in range(12):
    pMap.append([c for c in input().rstrip()])
