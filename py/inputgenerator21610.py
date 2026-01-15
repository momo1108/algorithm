import random


with open("data.txt", "w") as file1:
    file1.flush()
    file1.write("50 100\n")
    for _ in range(50):
        file1.write(f'{" ".join([str(random.randint(0, 100)) for _ in range(100)])}\n')
    for _ in range(100):
        file1.write(f"{random.randint(1, 8)} {random.randint(1, 50)}\n")

    file1.close()
