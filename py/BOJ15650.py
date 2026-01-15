import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/15650

N, M = [int(s) for s in input().split()]
answer = [0] * (M + 1)


def permu(minimum, count):
    """
    재귀함수를 통해 순열의 각 자리수를 정한다.

    count : int
        몇번째 순열 요소인가.
    minimum : int
        현재 순열 순서에 사용될 수 있는 최소값
    """
    # 남은 숫자가 모자랄 경우
    if N - minimum < M - count:
        return
    # 다 선택하면 출력
    if count > M:
        print(" ".join([str(num) for num in answer[1:]]))
        return

    # 가능한 범위 내에서 선택하고 다음 자리로 재귀 호출
    for num in range(minimum, N + 1):
        if num > answer[count - 1]:
            answer[count] = num
            permu(num + 1, count + 1)


permu(1, 1)
