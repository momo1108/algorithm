import random


with open("data.txt", "w") as file1:
    file1.flush()
    for i in range(3):
        N = random.randint(7000, 8000)
        M = random.randint(90000, 100000)
        C = random.randint(70, 100)
        T = random.randint(90000, 100000)
        file1.write(f"{N} {M} {C} {T}\n")

        cables = set()
        coms = [random.randint(1, C) for _ in range(M)]
        coms.sort()

        while len(cables) < M:
            s1 = random.randint(1, N - 1)
            s2 = random.randint(s1, N)
            cables.add(f"{str(s1)} {str(s2)}")

        cables = list(cables)

        for i in range(M):
            cables[i] = " ".join([cables[i], str(coms[i])])

        for c in cables:
            file1.write(f"{c}\n")

        trades = set()
        coms = [random.randint(1, C) for _ in range(T)]
        coms.sort()

        while len(trades) < T:
            s1 = random.randint(1, N - 1)
            s2 = random.randint(s1, N)
            trades.add(f"{str(s1)} {str(s2)}")

        trades = list(trades)

        for i in range(T):
            trades[i] = " ".join([trades[i], str(coms[i])])

        for c in trades:
            file1.write(f"{c}\n")

    file1.write("0 0 0 0")
    file1.close()
