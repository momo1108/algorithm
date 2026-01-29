import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1744


def solution():
    """
    수열은 크기순으로 내림차순 정렬한다.
    1. 1 이하의 수는 곱하면 오히려 손해이기 때문에 묶지않는다.
       (단, 음수 2개는 곱하는게 더 커지기 때문에 예외이다.)
    2. 가장 큰 숫자부터 2개씩 묶는다.
    """
    N = int(input())
    nums = []
    for _ in range(N):
        nums.append(int(input()))
    nums.sort(reverse=True)
    if N == 1:
        return nums[0]

    positiveEndIndex = -1
    for i in range(N):
        if nums[i] > 1:
            positiveEndIndex = i
        else:
            break

    answer = 0

    for i in range(0, positiveEndIndex + 1, 2):
        if i == positiveEndIndex:
            answer += nums[i]
            break
        answer += nums[i] * nums[i + 1]
    for i in range(N - 1, positiveEndIndex, -2):
        if i - 1 == positiveEndIndex:
            answer += nums[i]
            break

        if nums[i - 1] <= 0:
            answer += nums[i] * nums[i - 1]
        else:
            answer += nums[i] + nums[i - 1]

    return answer


print(solution())
