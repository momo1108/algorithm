# 입력값 저장
N, K = [int(value) for value in input().split()]

# 국가별 메달정보 저장할 배열
medalScore = [0] * (N + 1)
# 금, 은메달 점수 offset
GO = 100000000000000
SO = 10000000

for _ in range(N):
    # 입력값 저장
    nation, g, s, b = [int(value) for value in input().split()]
    # 각 메달에 오프셋을 곱해 메달 점수 계산
    medalScore[nation] = g * GO + s * SO + b

# 등수 변수
answer = 1
for otherNation in range(1, N + 1):
    if(K == otherNation): continue
    # 메달 점수가 더 높은 나라가 있다면 등수가 밀려남
    if(medalScore[otherNation] > medalScore[K]): answer += 1

print(answer)