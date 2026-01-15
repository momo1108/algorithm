import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2002

"""
순서대로 쭉 저장해놓고
바뀐 후 내용에서 앞쪽부터 원래 1등을 찾고 앞에 있는 차 수를 정답에 누적
그 다음 위치부터 원래 2등을 찾고 앞에 있는 차 수 누적
(못찾으면 다시 탐색 시작한 위치로 돌아와서 다음 등수에 대해 반복)
"""
N = int(input())
enterOrder = []
exitOrder = []
for _ in range(N):
    enterOrder.append(input().rstrip())
for _ in range(N):
    exitOrder.append(input().rstrip())

answer = 0
for enterCar in enterOrder:
    done = False

    # 나온 차들을 앞부터 체크
    for i, exitCar in enumerate(exitOrder):
        # 원래 순서의 차를 찾은 경우
        if exitCar == enterCar:
            # 앞의 차들의 개수(i) 를 정답에 누적
            answer += i
            # 찾은 차량이 마지막 차량이면 종료
            if i == (len(exitOrder) - 1):
                done = True
                break
            else:
                exitOrder = exitOrder[i + 1 :]
    if done:
        break

print(answer)
