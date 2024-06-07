from im import fileInput as input
import sys

# input = sys.stdin.readline
from collections import defaultdict

# https://www.acmicpc.net/problem/3421


def rule2(treeDict, s1, s2, k):
    for dest in treeDict[s1][k]:
        if dest == s2:
            return True

    return False


def rule3(treeDict, s1, s2, k):
    s1monopoly = len(treeDict[s1][k]) > 1
    s2monopoly = len(treeDict[s2][k]) > 1

    return s1monopoly or s2monopoly


def rule4(treeDict, s1, s2, k):
    # s1 에 k 사의 케이블이 있는 경우 쭉 추적하여 s2 에 오는지 확인
    # 없으면 사이클이 생길수가 없다.
    start, end = 0, 0
    if len(treeDict[s1][k]):
        start = s1
        end = treeDict[s1][k][0]

    if start == 0:
        return False

    while True:
        cableFound = False
        for dest in treeDict[end][k]:
            if dest != start:
                start = end
                end = dest
                cableFound = True
                break

        if cableFound:
            if end == s2:
                return True
        else:
            # 사이클되는 케이블이 없으면 구매
            originalOwner = 0
            ownerFound = False
            for company, destination in treeDict[s1].items():
                for d in destination:
                    if d == s2:
                        originalOwner = company
                        ownerFound = True
                        break
                if ownerFound:
                    break

            treeDict[s1][originalOwner].remove(s2)
            treeDict[s2][originalOwner].remove(s1)
            treeDict[s1][k].append(s2)
            treeDict[s2][k].append(s1)

            return False


answer = []
serverConnectionMap = defaultdict(list)
treeDict = dict()
while True:
    # 서버 1~N, 케이블, 회사 1~C, 판매수
    N, M, C, T = [int(s) for s in input().split()]
    if N + M + C + T == 0:
        break

    serverConnectionMap.clear()
    treeDict.clear()

    for _ in range(M):
        s1, s2, k = [int(s) for s in input().split()]
        serverConnectionMap[s1].append(s2)

        if s1 in treeDict:
            treeDict[s1][k].append(s2)
        else:
            treeDict[s1] = defaultdict(list)
            treeDict[s1][k].append(s2)

        if s2 in treeDict:
            treeDict[s2][k].append(s1)
        else:
            treeDict[s2] = defaultdict(list)
            treeDict[s2][k].append(s1)

    for _ in range(T):
        s1, s2, k = [int(s) for s in input().split()]
        if s2 not in serverConnectionMap[s1]:
            answer.append("No such cable.")
            continue
        elif rule2(treeDict, s1, s2, k):
            answer.append("Already owned.")
            continue
        elif rule3(treeDict, s1, s2, k):
            answer.append("Forbidden: monopoly.")
            continue
        elif rule4(treeDict, s1, s2, k):
            answer.append("Forbidden: redundant.")
            continue
        else:
            answer.append("Sold.")

    answer.append("")


("\n".join(answer))
