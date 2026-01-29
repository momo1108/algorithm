import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1080

N, M = [int(_) for _ in input().split()]

A = []
B = []

for _ in range(N):
    A.append([int(el) for el in [*input().rstrip()]])
for _ in range(N):
    B.append([int(el) for el in [*input().rstrip()]])


def flipSubArray(x, y):
    for xOffset in range(3):
        for yOffset in range(3):
            A[x + xOffset][y + yOffset] = (A[x + xOffset][y + yOffset] + 1) % 2


"""
3 X 3 부분 배열을 뒤집어서 똑같이 만든다.
그렇다면 어떤 위치의 부분 배열을 뒤집어야 할까?
순서에 상관없이 같은 부분을 두번 뒤집는것은 원상복귀 되는 짓이므로
모든 부분 배열을 필요에 따라 단 한번만 실행하면 된다.

순서를 정하는 기준?
3X3 이라는 부분배열의 한 꼭지점만 생각해보자.
예를 들어서 왼쪽 위 꼭지점을 생각해보면 부분배열을 한칸씩 이동하면서
겹치지 않게 모두 뒤집어 보아도, 왼쪽 위 꼭지점을 뒤집는 행위는 결코
중복되지 않는다.
따라서, A, B의 부분 배열의 왼쪽 위 꼭지점을 기준으로 값이 다르면
뒤집어주면 되고, 같으면 안뒤집어 주면 된다.
모든 부분배열들을 체크하면서 필요에따라서만 뒤집어줄 수 있는것이다.

시간 복잡도?
구현하기전에 가장 많이 고려한게 시간 복잡도이다. 결국에는 브루트포스와
다름이 없기 때문에, 시간 복잡도를 계산해보았다.
모든 부분배열에 대해 왼쪽위모서리를 체크하는 행위 : O(N * M) = 2500
부분배열을 뒤집는 행위 : O(3 * 3) = 9
마지막으로 A, B가 동일한지 체크하는 행위 = O(N * M) = 2500
다만 A, B 의 동일 체크는 위 2개 작업을 모두 완료한 후 분리돼서 실행하기
때문에, 곱연산이 아닌 합연산으로 계산한다.
결국 최종 시간복잡도:
2500 * 9 + 2500 = 25000 정도가 된다.
놓친게 있을수도 있다 ㅎㅎ;
"""


def solution():
    answer = 0
    for row in range(N - 2):
        for col in range(M - 2):
            if A[row][col] != B[row][col]:
                flipSubArray(row, col)
                answer += 1

    for row in range(N):
        for col in range(M):
            if A[row][col] != B[row][col]:
                print(-1)
                return
    print(answer)


if __name__ == "__main__":
    solution()
