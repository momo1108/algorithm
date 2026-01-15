import random


with open("data.txt", "w") as file1:
    file1.flush()

    for _ in range(random.randint(1, 5)):
        x = random.randint(1, 20)
        n = random.randint(0, 100000)
        file1.write(f"{x}\n{n}\n")

        blocks = set()
        while len(blocks) < n:
            blocks.add(random.randint(1, 100000000))

        for l in sorted(list(blocks)):
            file1.write(f"{l}\n")

    file1.close()
