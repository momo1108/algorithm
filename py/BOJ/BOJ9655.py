import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/9655

"""
무조건 홀수개만 가져가기 때문에, 홀수번째는 상근이만 짝수번째는 창영이만
가져갈 수 있다.
1 sk
2 cy
3 sk
4 cy
"""
N = int(input())
print("SK" if N % 2 else "CY")
