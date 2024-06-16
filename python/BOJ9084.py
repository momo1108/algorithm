import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/9084

answer = []
for _ in range(int(input())):
    N = int(input())
    coins = [int(c) for c in input().rstrip().split()]
    M = int(input())

    """
    dy[i] = i원을 채우는 모든 경우의 수
    dy[0] = 1 <- 동전을 딱 맞게 쓴 경우 참조할 초기값
    각 동전에 대해 다음 작업을 수행한다.
    동전 값을 제외한 값을 채운 경우의 수를 현재 값의 경우의 수에 누적한다
    
    총액을 1원부터 M원까지 체크하는데 예를들어 1원 2원 코인이 있으면
    총액 3원에서 2원 코인을 사용하는 경우를 누적한 경우, 
    1원을 3개 사용한 경우의수 + 2원동전 사용하고 1원을 나타내는 경우의수
    이후 5원에서 2원 코인을 사용하는 경우를 보면
    5원에서 2원 사용안한 경우 + 2원 사용후 3원을 나타내는 경우의수(2원포함)
    """
    dy = [0] * (M + 1)
    dy[0] = 1
    for c in coins:
        for price in range(1, M + 1):
            if price - c >= 0:
                dy[price] += dy[price - c]
    answer.append(dy[M])

print(*answer, sep="\n")
