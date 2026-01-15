import sys

input = sys.stdin.readline


class MyNumber:
    # zero, one, two, three, four, five, six, seven, eight, nine
    # 정렬 시 weight (마지막은 십의자리가 없는 숫자 용)
    __weight = [10, 5, 9, 8, 3, 2, 7, 6, 1, 4, 0]

    # Ex. 42 -> first: 4, second: 2, num: 42
    # 5 -> first: 5, second: 10, num: 5
    def __init__(self, first, second, num):
        self.first = first
        self.second = second
        self.num = str(num)

    def __str__(self):
        return str(self.num)

    def __eq__(self, other):
        return (self.first == other.first) & (self.second == other.second)

    def __lt__(self, other):
        if MyNumber.__weight[self.first] == MyNumber.__weight[other.first]:
            return MyNumber.__weight[self.second] < MyNumber.__weight[other.second]
        else:
            return MyNumber.__weight[self.first] < MyNumber.__weight[other.first]


start, end = [int(i) for i in input().split()]
myNumArray = []

# 범위 내의 MyNumber 를 배열에 모두 저장
for num in range(start, end + 1):
    if num < 10:
        myNumArray.append(MyNumber(num % 10, 10, num))
    else:
        myNumArray.append(MyNumber(num // 10, num % 10, num))

# 결과 정렬
myNumArray.sort()

# 10개씩 짤라서 출력
for groupIndex in range((len(myNumArray) // 10) + 1):
    print(" ".join([n.num for n in myNumArray[groupIndex * 10 : groupIndex * 10 + 10]]))
