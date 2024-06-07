import sys

input = sys.stdin.readline

N = int(input())
score = list(map(int, input().split()))

maxScore = -1
scoreSum = 0
for s in score:
    maxScore = max(maxScore, s)
    scoreSum += s

# 새로운 점수를 구하는 방식을 총합에 적용해도 동일하다.
print(scoreSum / maxScore * 100 / len(score))
