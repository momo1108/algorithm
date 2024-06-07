import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/5107

testCase = 0
answer = []
while True:
    population = int(input())
    if not population:
        break

    caseAnswer = 0
    complete = dict()  # { 주는사람 : 마니또수행여부 }
    chain = dict()  # { 주는사람 : 받는사람 }
    order = dict()  # { 입력순서 : 이름 }
    testCase += 1

    # 필요한 정보 입력
    for i in range(population):
        start, end = input().rstrip().split()
        complete[start] = False
        chain[start] = end
        order[i] = start

    # 앞부터 순서대로 마니또를 한 사람인지 체크
    for i in range(population):
        start = order[i]
        if complete[start]:
            continue
        # 안했으면 체인을 쭉 따라가면서 모두 체크
        while True:
            complete[start] = True
            end = chain[start]
            # 체인이 완성되면 개수 누적
            if complete[end]:
                caseAnswer += 1
                break
            start = end

    # 테케의 정답 추가
    answer.append(f"{testCase} {str(caseAnswer)}")

print("\n".join(answer))
