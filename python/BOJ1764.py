import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1764

N, M = [int(s) for s in input().split()]

unheard = set()
unseen = set()

for _ in range(N):
    unheard.add(input().rstrip())

for _ in range(M):
    unseen.add(input().rstrip())

# 듣보를 교집합으로 구해서 리스트로 변환
unheardseen = list(unheard & unseen)
unheardseen.sort()

print(len(unheardseen))
print("\n".join(unheardseen))
