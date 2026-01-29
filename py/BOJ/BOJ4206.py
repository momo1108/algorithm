import sys

input = sys.stdin.readline

F = ["0", "1"]

for i in range(2, 101):
    F.append("".join(F[i - 2 : i]))

print(F)
