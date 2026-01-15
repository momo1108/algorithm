import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/28114

rule1 = []
rule2 = []

# rule1 은 학번 삽입 후 오름차순 정렬
# rule2 는 (문제수, 성 첫글자) 삽입 후 내림차순 정렬
for _ in range(3):
    solved, year, familyName = input().rstrip().split()
    rule1.append(int(year) % 100)
    rule2.append((int(solved), familyName[0]))

rule1.sort()
rule2.sort(reverse=True)

print("".join([str(x) for x in rule1]))
print("".join([x[1] for x in rule2]))
