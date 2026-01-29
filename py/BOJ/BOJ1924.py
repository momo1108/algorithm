# 월별 날짜와 요일 목록을 저장
days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
names = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

# 입력받은 값 설정
m, d = [int(v) for v in input().split()]

# 입력 월 전까지 모든 일수와 입력 일을 합산 후
# 일주일 단위(7)로 나누어 나머지를 구한다
print(names[(sum(days[0:m]) + d - 1) % 7])