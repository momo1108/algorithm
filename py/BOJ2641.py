# 1 - 오, 2 - 위, 3 - 왼, 4 - 아래
length = int(input())
# 원본 수열과 역순 수열을 만들어 저장
standardOrigin = [int(_) for _ in input().split()]
standardReverse = standardOrigin.copy()
standardReverse.reverse()
standardReverse = [(value + 2) % 4 if value > 2 else value + 2 for value in standardReverse]

# 정답 개수
answer = 0
# 정답 배열 출력을 위한 문자열
arrayString = ""

N = int(input())
for _ in range(N):
    # 배열 입력
    inputArray = [int(_) for _ in input().split()]

    # 모든 시작 위치를 반복문으로 체크
    for offset in range(length):
        # 원래 수열과 비교
        if(inputArray[offset:] + inputArray[:offset] == standardOrigin):
            answer += 1
            arrayString += f"{' '.join(map(str, inputArray))}\n"
            break
        # 역순 수열과 비교
        if(inputArray[offset:] + inputArray[:offset] == standardReverse):
            answer += 1
            arrayString += f"{' '.join(map(str, inputArray))}\n"
            break

# 정답 개수, 수열 출력
print(answer)
print(arrayString)