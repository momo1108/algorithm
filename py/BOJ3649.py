import sys

input = sys.stdin.readline
from im import fileInput as input

# https://www.acmicpc.net/problem/3649

"""
구멍이 너비 = 레고1 + 레고2 를 만족해야 한다.

이분탐색으로 mid 는 레고2 길이로 잡고
(너비 - 레고1) 과 같은 레고가 있는지 찾아내자
짝이 여러개면 차이가 제일 큰 쌍으로 고른다.
"""


def binarySearch(x, n, blocks, block1Idnex):
    left, right = 0, n - 1
    target = x - blocks[block1Idnex]
    answer = [-1, -1]

    while left <= right:
        mid = (left + right) // 2

        # 동일한 값으로 두개 선택된 경우
        if blocks[mid] == target:
            if mid == block1Idnex:
                if target == blocks[mid + 1] or target == blocks[mid - 1]:
                    answer = [blocks[block1Idnex], target]
            else:
                answer = [blocks[block1Idnex], target]
            break
        elif blocks[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return answer


def solution():
    while True:
        try:
            x = int(input()) * 10000000
            n = int(input())
            blocks = []
            for _ in range(n):
                blocks.append(int(input()))
            blocks.sort()

            answer = "danger"
            if n > 1:
                for i in range(n):
                    l1, l2 = binarySearch(x, n, blocks, i)
                    if l1 > 0:
                        answer = f"yes {l1} {l2}"
                        break
            print(answer)
        except:
            break


if __name__ == "__main__":
    solution()
