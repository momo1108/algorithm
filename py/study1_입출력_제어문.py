"""
1. 입력
보통은 input 함수 사용
백준 문제 중 입력시간이 오래걸리는 경우
sys 사용
"""
import sys

x = sys.stdin.readline()
print(x)

"""
2. 조건문 리마인드
"""
a = int(input("input number : "))
if a < 3:
    print("small")
elif a < 6:
    print("medium")
else:
    print("large")


"""
2. 반복문 리마인드
"""
for x in range(5):
    print(x)

for x in "HeLLo":
    print(x)
    if(x == "e"):break

n = 0
while n < 3:
    value = input("input something : ")
    if(value == ""):
        print("no input")
        break
    print(f"value : {value}")
    n += 1