import hashlib

def hash_md5(text):
    return hashlib.md5(text.encode()).hexdigest()

def hash_sha256(text):
    return hashlib.sha256(text.encode()).hexdigest()

while True:
    print("\n=== HASH TOOL ===")
    print("1. MD5")
    print("2. SHA-256")
    print("0. Exit")

    choice = input("Choose: ")

    if choice == "1":
        text = input("Enter text: ")
        print("MD5 Hash:", hash_md5(text))

    elif choice == "2":
        text = input("Enter text: ")
        print("SHA-256 Hash:", hash_sha256(text))

    elif choice == "0":
        print("Exit program")
        break

    else:
        print("Invalid choice!")