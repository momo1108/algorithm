# 점수 딕셔너리 생성
gradeDict = {"A+":4.5, "A0":4.0,"B+":3.5, "B0":3.0,"C+":2.5, "C0":2.0,"D+":1.5, "D0":1.0, "F":0.0}
# 학점 총합
sum = float(0)
# 전공 총점
majorSum = float(0)

for _ in range(20):
    # 입력 설정
    name, score, grade = input().split()
    score = float(score)
    # P 등급 생략
    if(grade == "P"): continue

    # 과목별 학점, 전공 점수 누적
    sum += score
    majorSum += (score * gradeDict[grade])

# 전공 평점 계산
print(majorSum / sum)