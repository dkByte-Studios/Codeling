// Small programs for trying out the Python runner. They also exercise the hard cases.
export type Sample = { name: string; code: string; note: string };

export const samples: Sample[] = [
  {
    name: 'Hello',
    note: 'The simplest program.',
    code: 'print("Hello, world!")\nprint(2 + 3 * 4)\n',
  },
  {
    name: 'Input',
    note: 'Asks questions. The page asks the person, then replays the program with the answers.',
    code: 'name = input("Your name? ")\nage = int(input("Your age? "))\nprint(f"Hi {name}, next year you will be {age + 1}.")\n',
  },
  {
    name: 'Guessing game',
    note: 'A while loop with random, input and if. The seed keeps replays identical.',
    code: `import random

secret = random.randint(1, 10)
tries = 0
guess = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 10: "))
    tries += 1
    if guess < secret:
        print("Too low")
    elif guess > secret:
        print("Too high")
print(f"Correct! Tries: {tries}")
`,
  },
  {
    name: 'Error',
    note: 'A NameError, shown the way Python prints it, limited to the learner\'s own code.',
    code: 'total = 5\nprint(totl)\n',
  },
  {
    name: 'Syntax error',
    note: 'A missing quote.',
    code: 'print("Hello)\n',
  },
  {
    name: 'Endless loop',
    note: 'Never ends. The runner stops it after the time limit and restarts Python.',
    code: 'count = 1\nwhile count <= 3:\n    print(count)\n',
  },
  {
    name: 'Files',
    note: 'Writes and reads a file. Tick "Keep files" and run twice to see it remember.',
    code: `def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\\n")

todos = load_todos()
todos.append("buy milk")
save_todos(todos)
print(todos)
`,
  },
  {
    name: 'Class',
    note: 'A small class with a method.',
    code: `class Book:
    def __init__(self, title):
        self.title = title
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

b = Book("Dune")
print(b.describe())
b.borrow()
print(b.describe())
`,
  },
];
