import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/14889

N = int(input())
S = []
for _ in range(N):
    S.append([int(a) for a in input().rstrip().split()])

"""
함수로 분리해서 구현해보자.
1. 전체 인원 중 절반 씩 묶어주는 함수
전체 인원 중 절반의 combination
2. 정해진 팀의 시너지 점수를 계산하는 함수
팀 인원 중 2명의 combination 점수 누적
- 1번부터 체크. 1번과 2~X번까지의 양방향 시너지 합
- 다음 2번 체크. 2번과 3~X번까지의 양방향 시너지 합
- ....
- X - 1번 체크. X - 1 번과 X번의 양방향 시너지 합
"""


def combination(count, total):
    result = []
    stack = []

    def dfs(start):
        for i in range(start, total):
            stack.append(i)
            if len(stack) == count:
                result.append(stack.copy())
            else:
                dfs(i + 1)
            stack.pop()

    dfs(0)

    return result


def calcSynergy(team):
    synergy = 0
    for s1 in range(len(team) - 1):
        for s2 in range(s1 + 1, len(team)):
            synergy += S[team[s1]][team[s2]]
            synergy += S[team[s2]][team[s1]]
    return synergy


answer = 999999999
for team1 in combination(N // 2, N):
    team2 = list(set(range(N)) - set(team1))
    answer = min(answer, abs(calcSynergy(team1) - calcSynergy(team2)))

print(answer)
