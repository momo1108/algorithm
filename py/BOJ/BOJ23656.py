import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline

minNumber, maxNumber = 1, 10**9
while True:
    questionNumber = int(input())

    if (minNumber == maxNumber) and (maxNumber == questionNumber):
        print("=")
        sys.stdout.flush()
        break

    if questionNumber < minNumber:
        print(">")
    elif questionNumber > maxNumber:
        print("<")
    else:
        lower, upper = questionNumber - minNumber, maxNumber - questionNumber
        if lower <= upper:
            print(">")
            minNumber = questionNumber + 1
        else:
            print("<")
            maxNumber = questionNumber - 1
    sys.stdout.flush()
