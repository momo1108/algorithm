import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2941

twoLetters = ["c=", "c-", "d-", "lj", "nj", "s=", "z="]
threeLetters = "dz="

# 입력문자에 2글자를 추가해 슬라이싱 범위 초과를 방지
line = f"{input().rstrip()}@@"
index = 0
count = 0

# 각 인덱스로부터 크로아티아 알파벳 체크 후 index 와 count 값 갱신
while index < (len(line) - 2):
    # 두글자, 세글자를 따로 체크
    if line[index : index + 2] in twoLetters:
        index += 2
    elif line[index : index + 3] == threeLetters:
        index += 3
    else:
        index += 1

    count += 1

print(count)
