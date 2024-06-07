import sys
from collections import deque

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1966

T = int(input())


# deque 의 첫번째 요소가 출력 가능한지 체크
def checkPrintable(d):
    for doc in d:
        if doc[1] > d[0][1]:
            return False
    return True


answer = []

for _ in range(T):
    order = 0
    N, docIndex = [int(s) for s in input().split()]
    # 문서의 중요도를 원래 순서와 함께 저장 후 deque 로 생성
    importances = [[i, int(s)] for i, s in enumerate(input().split())]
    d = deque(importances)

    # 원하는 문서가 출력될 때 까지 첫번째 문서 확인, 출력 or 뒤로
    while True:
        # 출력 가능하면 순서 누적 후 종료, 아니면 다시 반복
        if checkPrintable(d):
            first = d.popleft()
            order += 1
            if first[0] == docIndex:
                break
        # 출력 불가능하면 뒤로 옮기기
        else:
            first = d.popleft()
            d.append(first)

    answer.append(str(order))

print("\n".join(answer))
