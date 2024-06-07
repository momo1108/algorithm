import sys
import math

input = sys.stdin.readline
# https://www.acmicpc.net/problem/17435

"""
희소배열을 사용한 함수 실행 결과 추적
희소배열의 행은 각 숫자, 열은 함수 실행 횟수 별 결과
n <= 500000 이므로, 500000만 회를 커버하기 위해서는
2 ** 0  ~ 2 ** 19  즉, 20개의 열이 필요
"""
m = int(input())

st = [[0] * 20 for _ in range(m + 1)]

funcResult = [int(_) for _ in input().split()]

for i in range(1, m + 1):
    st[i][0] = funcResult[i - 1]

"""
2^a 만큼 실행했을 때의 결과를 각 숫자에 대해 저장해보자.

Ex. 숫자 3을 2^10 만큼 실행했을 때 결과는?
st[3][10] 이 그 결과가 된다.
st[3][10] = st[3][9] 를 다시 2^9 만큼 실행한 값
          = st[st[3][9]][9]

이러한 방식으로 작은 실행 횟수부터 차례대로 채워나갈 수 있다.
"""
for execNum in range(1, 20):
    for i in range(1, m + 1):
        st[i][execNum] = st[st[i][execNum - 1]][execNum - 1]


def execute(count, num):
    stIndex = int(math.log2(count))
    remainCount = count - (2**stIndex)

    if remainCount == 0:
        return st[num][stIndex]
    else:
        return execute(remainCount, st[num][stIndex])


Q = int(input())

answer = []
for _ in range(Q):
    n, x = [int(s) for s in input().split()]
    answer.append(str(execute(n, x)))

print("\n".join(answer))
