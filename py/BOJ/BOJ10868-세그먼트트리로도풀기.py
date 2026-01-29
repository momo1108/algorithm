import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/10868

N, M = [int(_) for _ in input().split()]
arr = []

for _ in range(N):
    arr.append(int(input()))


"""
sparseTable 의 내용은 다음과 같다.
i번 행의 j번 열 : i번째 숫자부터 2 ** j 개 숫자들 중 최소값

이러한 sparseTable을 최대한 효율적으로 채워야 한다.
그러기 위해서는 모든 행의 같은 열부터 순서대로 채워주어야 한다.
0번 열은 자기자신이 되므로 쭉 채워진다.
1번 열 부터는 자기자신부터 2 ** j 개중 최소값을 채워넣는다.
st[0][1] = min(st[0][0], st[1][0])
...
st[N - 2][1] = min(st[N - 2][0], st[N - 1][0])
st[N - 1][1] = st[N - 1][0]

st[0][2] = min(st[0][1], st[2][1])
...
st[N - 2][2] = st[N - 2][1]
st[N - 1][2] = st[N - 1][1]

st[0][3] = min(st[0][2], st[4][2])
...
"""
st = [[0] * 18 for _ in range(N)]
for i in range(N):
    st[i][0] = arr[i]

for logLength in range(1, 18):
    for index in range(N):
        # 다음 그룹의 시작점
        next = index + (2 ** (logLength - 1))
        # 비교할 다음 그룹이 있나
        hasNext = next < N
        if hasNext:
            st[index][logLength] = min(
                st[index][logLength - 1], st[next][logLength - 1]
            )
        else:
            st[index][logLength] = st[index][logLength - 1]


def findMin(a, b):
    length = b - a + 1
    powerIndex = 0
    for l in range(0, 18):
        if length <= (2**l):
            break
        powerIndex = l

    if (2**powerIndex) == length:
        return st[a][powerIndex]
    else:
        return min(st[a][powerIndex], findMin(a + (2**powerIndex), b))


answer = []
for _ in range(M):
    a, b = [int(_) for _ in input().split()]
    answer.append(findMin(a - 1, b - 1))

print("\n".join([str(_) for _ in answer]))
