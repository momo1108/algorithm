import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11559


"""
dfs를 돌려서 열별로 지워야할 행을 저장한다.
저장된 내용을 기반으로 삭제 및 이동을 진행한다.

위 내용을 매턴마다 반복한다.
삭제가 안되면 종료

삭제가 이루어진 턴 수를 출력
"""


def getNext(r, c):
    DIR = ((1, 0), (0, -1), (-1, 0), (0, 1))
    result = []
    for d in DIR:
        if 0 <= r + d[0] < 12 and 0 <= c + d[1] < 6:
            result.append((r + d[0], c + d[1]))
    return result


def dfs(r, c):
    # 삭제할 위치들
    stack = []
    stack.append((r, c))
    visit[c][r] = True
    result = [(r, c)]

    while stack:
        cr, cc = stack.pop()

        for nr, nc in getNext(cr, cc):
            if visit[nc][nr] or pMap[cc][cr] != pMap[nc][nr]:
                continue
            stack.append((nr, nc))
            visit[nc][nr] = True
            result.append((nr, nc))

    if len(result) >= 4:
        for row, col in result:
            deleteMap[col].append(row)
        return True
    return False


answer = 0
pMap = [[] for _ in range(6)]

for _ in range(12):
    for i, c in enumerate(input().rstrip()):
        pMap[i].append(c)
for i in range(6):
    pMap[i].reverse()

while True:

    # dfs 방문정보
    visit = [[False] * 12 for _ in range(6)]
    # 열별 삭제할 행 정보
    deleteMap = {colNum: [] for colNum in range(6)}
    # 한번이라도 터지는지 체크
    puyoPop = False
    for r in range(12):
        for c in range(6):
            if pMap[c][r] == "." or visit[c][r]:
                continue
            if dfs(r, c):
                puyoPop = True

    # 터지면 연쇄수 누적
    if puyoPop:
        answer += 1
    # 안터지면 끝
    else:
        break

    for col in deleteMap:
        deleteMap[col].sort(reverse=True)

    for colNum, rowNums in deleteMap.items():
        for r in rowNums:
            del pMap[colNum][r]
            pMap[colNum].append(".")

print(answer)
