import sys
from collections import defaultdict

input = sys.stdin.readline

n = int(input())
answer = []

for _ in range(n):
    soldierDict = defaultdict(int)
    info = [int(i) for i in input().split()]
    # 과반수 인원 저장
    conquerCount = info[0] // 2
    result = "SYJKGW"

    # 부대 번호별로 병사수 누적. 절반 초과시 부대 번호 기록
    for soldier in info[1:]:
        soldierDict[soldier] = soldierDict[soldier] + 1
        if soldierDict[soldier] > conquerCount:
            result = str(soldier)

    answer.append(result)

print("\n".join(answer))
