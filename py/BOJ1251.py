import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1251

"""
최대 50자
그룹 경우의 수 : 
- 첫번째: 1글자 ~ 48번글자 = 48개
- 두번째: 첫번째 이후 ~ 49번글자 = 최대 48개
- 세번째: 두번재 이후 ~ 50번글자 = 최대 48개
세개를 곱해서 불가능한 경우도 그냥 포함하면 최대 경우의 수가 48 ** 3
각 그룹에서 48글자씩 뒤집는 작업을 한다 쳐도 48 ** 4
브-루-트-포-스
"""

S = input().rstrip()


def reverseStringGroups(e1, e2):
    return "".join([S[e1::-1], S[e2:e1:-1], S[:e2:-1]])


answer = "z" * 50
for g1End in range(0, len(S) - 2):
    for g2End in range(g1End + 1, len(S) - 1):
        answer = min(answer, reverseStringGroups(g1End, g2End))
print(answer)
