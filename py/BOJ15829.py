import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/15829

R, M = 31, 1234567891
L = int(input())
S = input().rstrip()

# 알파벳별 번호 설정
charMap = {key: i + 1 for i, key in enumerate("abcdefghijklmnopqrstuvwxyz")}

# 입력 문자열의 글자별로 해쉬 값 누적
hashValue = 0
for i, c in enumerate(S):
    hashValue += charMap[c] * (R**i)
    hashValue %= M

print(hashValue)
