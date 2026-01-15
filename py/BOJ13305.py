import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/13305


N = int(input())
length = [int(a) for a in input().rstrip().split()]
price = [int(a) for a in input().rstrip().split()]

price[-1] = 1000000000

"""
기름을 사야할 곳을 체크하기 위해, 앞에서부터 가격을 체크하며
기름값이 최소값이 될 때마다 체크포인트로 추가한다.
"""
checkpoint = [0]
min = price[0]
for city in range(1, N - 1):
    if price[city] < min:
        checkpoint.append(city)
        min = price[city]
checkpoint.append(N)

"""
최초의 체크포인트부터 순서대로 다음 체크포인트까지 갈 기름을 구매하고
가격을 정답에 누적한다.
"""
answer = 0
for i in range(len(checkpoint) - 1):
    answer += price[checkpoint[i]] * sum(length[checkpoint[i] : checkpoint[i + 1]])
print(answer)
