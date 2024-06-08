import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11834

N = int(input())

"""
이분탐색으로 어떻게 해야할거같은데.

X 로 이분탐색

X 란?

홀짝 수열은 앞에서부터 1, 2, 3, 4 개씩 묶이는데
X는 이중 묶음의 순번을 의미한다.
즉 X = 3 이면 전체 개수는 1 + 2 + 3 = 6
X = 4 면 1 + 2 + 3 + 4 = 10

이런 X 를 구하는 공식은 다음과 같다.
X * (X + 1) / 2
즉 N 이상이 되는 X 의 최소값을 구하면 된다.
해당 그룹에서의 최대값은 X ** 2 이므로 2씩 빼서 N번째까지 접근한다.

대충 제곱의 반이 10^100 이하여야 되니까 X의 상한은
1.414 * 10^50
1415 * 10^47 하면 상한설정될듯 근데 이게 담기나?

시간복잡도는 log(X) 니까 대충 166정도
"""

left, right = 1, 1415 * (10**50)
totalCount = -1
x = -1

while left <= right:
    mid = (left + right) // 2
    totalCount = (mid * (mid + 1)) // 2

    if totalCount >= N:
        x = mid
        right = mid - 1
    else:
        left = mid + 1

# 그룹의 끝에서부터의 거리
offset = (x * (x + 1) // 2) - N

print(x**2 - (2 * offset))
