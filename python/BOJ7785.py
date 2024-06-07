import sys

input = sys.stdin.readline

n = int(input())
workCheck = dict()

for _ in range(n):
    name, info = input().split()
    workCheck[name] = True if info == "enter" else False

# 출근 상태인 직원 이름만 필터링
names = filter(lambda name: workCheck[name], workCheck.keys())

# 역순으로 정리해 출력
print("\n".join(sorted(names, reverse=True)))
