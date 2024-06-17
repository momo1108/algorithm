from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1713

"""
브루트포스로 최소 추천학생을 찾아내자.
추천횟수가 최대 1000번이므로, 최대 탐색횟수는 980번이다.
"""

N = int(input())
M = int(input())
recommend = [int(a) for a in input().rstrip().split()]
currentCandidate = {}

recNumber = 0


def deleteCandidate():
    """
    삭제될 학생을 찾아낸다.
    아래의 두 경우에만 삭제될 값으로 갱신한다.
    득표수가 더 적으면 갱신
    득표수는 같으나 추천번호가 더 낮으면 갱신
    """
    minCount = 99999999
    minRecNumber = 99999999
    delStudent = 0
    for student, candidate in currentCandidate.items():
        if candidate["count"] < minCount:
            minCount = candidate["count"]
            minRecNumber = candidate["recNumber"]
            delStudent = student
        elif candidate["count"] == minCount and candidate["recNumber"] < minRecNumber:
            minRecNumber = candidate["recNumber"]
            delStudent = student

    del currentCandidate[delStudent]


# 모든 추천에 대해 반복
for r in recommend:
    # 존재하는 후보면 카운트 +1
    if r in currentCandidate:
        currentCandidate[r]["count"] += 1
    # 존재하지 않는 후보면 현재 추천된 학생수에 따라 처리
    else:
        # 모든 사진틀 다 찼으면 삭제 진행
        if len(currentCandidate) >= N:
            deleteCandidate()
        # 새로운 후보 추가
        currentCandidate[r] = {"count": 1, "recNumber": recNumber}
        recNumber += 1

# 최종 학번을 오름차순으로 출력
print(*sorted(currentCandidate.keys()))
