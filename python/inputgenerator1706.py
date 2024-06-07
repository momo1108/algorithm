import random


with open("data.txt", "w") as file1:
    file1.flush()
    R = random.randint(4, 7)
    C = random.randint(4, 7)

    file1.write(f"{R} {C}\n")

    sample = "abcd#"
    for _ in range(R):
        row = ""
        for __ in range(C):
            row += sample[random.randint(0, 4)]
        file1.write(f"{row}\n")
    file1.close()
