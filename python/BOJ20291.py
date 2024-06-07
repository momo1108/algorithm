import sys
from collections import defaultdict

input = sys.stdin.readline

N = int(input())
extCountMap = defaultdict(int)

# 확장자별 카운팅
for _ in range(N):
    fileName, extName = input().rstrip().split(".")
    extCountMap[extName] = extCountMap[extName] + 1

# 정렬된 확장자명 순으로 정답 배열 생성
sortedInfo = [f"{name} {extCountMap[name]}" for name in sorted(extCountMap.keys())]

print("\n".join(sortedInfo))
