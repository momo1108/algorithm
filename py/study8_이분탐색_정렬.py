"""
1. 이분 탐색
탐색의 범위를 절반씩 줄여나가면서 탐색 범위가 1이 될 때 까지 진행한다.
시간복잡도는 O(logN)
탐색될 데이터가 *정렬되어있어야 한다*는게 전제조건이다.
"""


def binary_search(arr: list[int], target: int):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


"""
2. 정렬
파이썬 리스트를 반환값 없이 정렬하는 sort 함수
"""
a = [2, 3, 1, 4]
a.sort(reverse=True)
print(a)

# 홀수, 짝수 별 원본 크기 순 정렬
a.sort(key=lambda x: (x % 2, x), reverse=True)
print(a)

"""
연습문제
https://www.acmicpc.net/problem/1181
https://www.acmicpc.net/problem/1920
https://www.acmicpc.net/problem/1654
"""
