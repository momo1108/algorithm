# from im import fileInput as input

import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/16120

"""
문자열을 처음부터 하나씩 stack 에 넣어가며
p 인 경우 앞이 ppa인지 체크한다.
맞으면 push 전에 3번 pop한다.

"""

ppapString = input().rstrip()
stack = []
ppa = ["P", "P", "A"]

for c in ppapString:
    if len(stack) >= 3 and c == "P":
        if stack[-3:] == ppa:
            stack.pop()
            stack.pop()
            stack.pop()
    stack.append(c)
ppap = "".join(stack)

print("PPAP" if ppap == "P" else "NP")
