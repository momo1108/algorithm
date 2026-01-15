import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1072

"""
앞으로 승리만 하기 때문에 Z 를 늘리는 경우만 고려해야한다.
패배가 하나라도 있으면 99% 이상인 경우 바뀔 수 없다.
패배가 없는경우 이미 100% 이므로 바뀔 수 없다.

따라서 Z = Y * 100 // X
에서 Z 가 99 이상이면 답은 0 출력
99 미만이면 계산해서 출력

만약 게임수 X 가 최대값이면 10억이기 때문에, 직접 한게임씩 늘리는건
너무 오래걸릴 것 같다.

이분탐색을 사용하는데, 추가 플레이 게임 수를 이분탐색으로 찾아내자.

범위는 X 가 최대일 때 승률이 0인 경우를 99%까지 끌어오는 경우가 최대가
아닐까? 머리가 안돌아가서 대충 맞을만한 범위로 생각했다.
이 경우 10억의 99배를 추가플레이한다.
즉 990억이다.
"""
X, Y = [int(x) for x in input().rstrip().split()]
Z = (Y * 100) // X

if Z >= 99:
    print(-1)
else:
    left, right = 1, 99000000000
    answer = 1
    while left <= right:
        mid = (left + right) // 2

        # 승률이 변하지 않는 경우 더 늘린다.
        if ((Y + mid) * 100) // (X + mid) == Z:
            left = mid + 1
        # 변하는 경우 낮춰서 최소 판수로 접근한다.
        else:
            answer = mid
            right = mid - 1
    print(answer)
