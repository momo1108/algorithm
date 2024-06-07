import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/25192

N = int(input())

# set 로 중복을 제외시켜 곰곰티콘만 체크가능
gomgom = set()
answer = 0

for _ in range(N):
    nickname = input().rstrip()

    # 엔터 입력 시 이전 엔터 이후부터의 곰곰티콘 개수 누적
    if nickname == "ENTER":
        answer += len(gomgom)
        gomgom.clear()
    # 이외에는 곰곰티콘 set 에 추가
    else:
        gomgom.add(nickname)

# 마지막 Enter 후 곰곰티콘은 따로 추가
answer += len(gomgom)

print(answer)
