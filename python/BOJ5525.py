import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/5525

N = int(input())
length = int(input())
S = input().rstrip()

"""
S 를 앞쪽부터 체크해본다.
I 가 등장하면 그 뒤부터 OI 가 맞는지 체크한다.
맞으면 또 그 뒤는 OI 인지 체크한다.
이렇게 OI 를 찾아낸 만큼 개수를 누적해야 한다.

I 뒤에 OI 를 연속 2번 찾아내면 
P1 개수는 2개
P2 개수는 1개를 추가해야 한다.

I 뒤에 OI 를 연속 3번 찾아내면 
P1 개수는 3개
P2 개수는 2개
P3 개수는 1개를 추가해야 한다.
"""
P = [0] * 1000001
S = f"{S}@@"
countOI = 0
index = 0
while S[index] != "@":
    if S[index] == "I":
        # IOI 패턴이 이어지는 경우
        while S[index + 1 : index + 3] == "OI":
            # 이어진횟수, 위치 누적
            countOI += 1
            index += 2
        # Pn에 결과 누적
        for pn in range(1, countOI + 1):
            P[pn] += countOI + 1 - pn
        countOI = 0
        index += 1
    else:
        index += 1

print(P[N])
