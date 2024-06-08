import random


with open("data.txt", "w") as file1:
    file1.flush()
    sa = "PA"
    ppap = []

    for _ in range(random.randint(1, 100)):
        ppap.append(sa[random.randint(0, 1)])

    file1.write("".join(ppap))
    file1.close()
