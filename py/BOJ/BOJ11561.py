import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11561

"""
마지막은 반드시 밟아야하므로 뒤에서부터 역 카운팅하는게 좋을듯
마지막 징검다리에서 점프 길이를 가정하고 -1씩 줄여가며 누적했을 때
강의 시작으로 갈 수있는 길이 중 최소를 구하자
이분탐색을 사용하자.
이분탐색 범위는 마지막 점프의 길이 범위로 해야하는데,
마지막 점프부터 1씩 줄여나갔을 때 누적값이 N 이하인 것 중
누적값은
짝수일 때 (N + 1) * N / 2
홀수일 때 (N + 1) * (N + 1) / 2
이므로 마지막 점프 최대값을 10^8 * 2 정도로 하면 될듯하다.
"""

T = int(input())

result = []
for _ in range(T):
    N = int(input())
    left, right = 1, 200000000

    answer = 0
    while left <= right:
        mid = (left + right) // 2
        totalJumpLength = (
            ((mid + 1) * (mid if mid % 2 == 0 else mid + 1) / 2) if mid > 1 else 1
        )

        if totalJumpLength < N:
            if N - totalJumpLength > mid:
                answer = max(answer, mid + 1)
            else:
                answer = max(answer, mid)
            left = mid + 1
        elif totalJumpLength == N:
            answer = mid
            break
        else:
            right = mid - 1

    result.append(str(answer))

print("\n".join(result))
