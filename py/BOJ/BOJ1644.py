import sys
from collections import defaultdict

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1644

N = int(input())

isPrimeArray = [True] * (N + 1)

for i in range(2, int(N ** (1 / 2)) + 1):
    if not isPrimeArray[i]:
        continue
    for j in range(i * i, N + 1, i):
        isPrimeArray[j] = False

primeArray = []
for i in range(2, N + 1):
    if isPrimeArray[i]:
        primeArray.append(i)
primeLen = len(primeArray)


def twoPointer():
    """
    [left, right] 구간 내의 숫자 합으로 N 을 만들 수 있는지 투 포인터 방식으로 체크
    만약 합이 더 작으면 right + 1, 크거나 같으면 left + 1
    left 에 for문을 사용하고, right 에는 while 문을 사용하여 구현한다.
    """
    if N == 1:
        return 0

    answer, right = 0, 0
    prefixSum = primeArray[0]
    for left in range(0, primeLen):
        if left > 0:
            prefixSum -= primeArray[left - 1]

        if prefixSum == N:
            answer += 1
            continue

        while prefixSum < N:
            right += 1
            if right >= primeLen:
                return answer

            prefixSum += primeArray[right]
            if prefixSum == N:
                answer += 1

    return answer


print(twoPointer())
