"""
1. 2차원 배열 기초
"""
a = [
	[1, 2, 3],
	[3, 4, 5]
]

print(a[0][1]) # 2
print(a[1][2]) # 5

# 3 * 5 의, 모든 원소가 0 인 2차원 배열 생성하기
arr_2d_int_shallow = [[0] * 5] * 3 # 얕은 복사가 됨
arr_2d_int = [[0] * 5 for _ in range(3)]

print(arr_2d_int_shallow)
print(arr_2d_int)

arr_2d_int_shallow[0][2] = 5
print(arr_2d_int_shallow)


'''
2. 순회
'''
a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 인덱스 사용
for i in range(len(a)):
    for j in range(len(a[i])):
        print(a[i][j])

# 인덱스 미사용
for line in a:
    for val in line:
        print(val)


'''
3. 조작
회전, 대칭 등
'''
# 대각선 기준으로 뒤집어라
def diagonal_flip(arr):
    n = len(arr)
    m = len(arr[0])

    flipped_array = [[0] * n for _ in range(m)]

    for i in range(n):
        for j in range(m):
            flipped_array[j][i] = arr[i][j] # 가로와 세로를 뒤집으면 됩니다

    return flipped_array


# 예시
a = [
    [1, 2, 3], [4, 5, 6]
]
print(diagonal_flip(a))

def diagonal_flip_with_zip(arr):
    return [list(val) for val in zip(*arr)]

# *arr = [1,2,3], [4,5,6]
# zip은 매개변수의 iterables 들의 원소를 순서대로 묶어준다.
# 즉 val 은 1, 4 와 2, 5 와 3, 6 으로 묶인다.

print(diagonal_flip_with_zip(a))


# 시계방향 회전
def rotate(arr):
    n = len(arr)
    rotated_arr = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            rotated_arr[j][n - 1 - i] = arr[i][j]
    return rotated_arr


a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(rotate(a))  # [[7, 4, 1], [8, 5, 2], [9, 6, 3]]


'''
4. 실전 문제
BOJ 2563 색종이 - https://www.acmicpc.net/problem/2563
'''
N = int(input())
map = [[False]*101 for _ in range(101)]
answer = 0

for _ in range(N):
    x, y = [int(value) for value in input().split()]
    for row in range(x, x + 10):
        for col in range(y, y + 10):
            if(map[row][col]):continue
            else:
                map[row][col] = True
                answer += 1
                
print(answer)