import sys
from collections import deque

input = sys.stdin.readline
# https://www.acmicpc.net/problem/24511

N = int(input())

A = [int(_) for _ in input().split()]
B = [int(_) for _ in input().split()]
"""
앞쪽의 원소가 뒤로 한칸씩 밀려나가는 과정에서,
뒤의 자료구조가 stack 이면 어짜피 들어가자마자 나오기 때문에
굳이 실제로 들어갔다 나올 필요가 없다.
=> stack 을 제외하고 queue 자료구조만 고려한다.

stack 을 제외한 queue 자료구조들을 일렬로 세워보면 이어진 queue 들을
하나의 queue 로 합쳐서 생각할 수 있다.

시간복잡도 측면으로 생각해보면 다음과 같이 압축이 된다.
원본 자료구조에서 하나씩 밀리며 모두 삽입해보는 과정: O(N * C)
stack 을 제외 후 하나의 queue 로 합쳐 삽입하는 과정: O(C)
"""
# stack 을 제외하고 나머지 숫자들을 하나의 queue 로 합친다
dq = deque([b for i, b in enumerate(B) if A[i] == 0])

M = int(input())
C = [int(_) for _ in input().split()]

answer = []
for c in C:
    dq.appendleft(c)
    answer.append(str(dq.pop()))
print(" ".join(answer))
