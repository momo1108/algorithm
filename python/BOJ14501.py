import sys
input = sys.stdin.readline
# https://www.acmicpc.net/problem/14501

N = int(input().strip())
payArray = []
D = [0] * (N + 1)

for _ in range(N):
    t, p = [int(_) for _ in input().strip().split(" ")]
    payArray.append((t, p))

for i in range(N):
    for j in range(i + payArray[i][0], N + 1):
        D[j] = max(D[i] + payArray[i][1], D[j])

print(D[-1])