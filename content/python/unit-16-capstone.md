# Python, Unit 16: Capstone

The last unit. There is almost nothing new to learn here. Learners plan a real program, build it in small steps, finish and extend it themselves, then take the final exam. It pulls together input, loops, decisions, functions, lists, dictionaries, files and error handling in one program.

Two capstone choices:
- **A quiz with a saved best score** (the guided build in lessons 16.1 to 16.3).
- **A text adventure** (a second option, after the lessons).

Format notes: same as Units 1 to 15.

---

## Lesson 16.1: Plan it

**Teach**
Big programs are not written in one go. Experienced programmers break the job into small steps, build the first step, test it, and only then move on. The plan comes first.

Our project is a quiz. The program asks questions, counts the correct answers, shows the score, and remembers the best score between runs.

Here is the plan, written as steps:
1. **Data:** keep the questions in a list of dictionaries, each with a `"question"` and an `"answer"`.
2. **Ask one question:** a function `ask` that shows a question, reads the reply, and says whether it was right.
3. **Ask them all:** a loop that asks every question and counts the correct answers.
4. **Show the score:** `Score: 2 out of 3`.
5. **Remember the best:** load the best score from a file, save a new one if this is higher.
6. **Show whether it is a new best.**

Each step reuses something you already know. The plan is the hard part. Once it exists, each step is small.

**1. Put in order**
Put the plan steps in the order you would build them.
Pieces: `Show the score`, `Remember the best score in a file`, `Ask every question and count the correct ones`, `Write a function that asks one question`, `Keep the questions in a list of dictionaries`
Correct order:
1. Keep the questions in a list of dictionaries
2. Write a function that asks one question
3. Ask every question and count the correct ones
4. Show the score
5. Remember the best score in a file
Why: Each step builds on the one before. The file part comes last because it is a bonus on top of a working quiz.

**2. Pick one**
Which is the best way to store the quiz questions?
- A) A list of dictionaries, each with a question and an answer
- B) A single number
- C) One long piece of text
- D) A separate variable for every word
Answer: A
Why: Each question has two parts, so a dictionary fits. A list holds as many as you like, and a loop can go through them.

**3. Match**
Match each part of the quiz to the tool from earlier units.
- Asking the player a question: `input`
- Doing the same thing for every question: a `for` loop
- Counting correct answers: a counter variable
- Remembering the best score between runs: a file
- Not repeating the question-asking code: a function
Why: The capstone is a toolbox you already own.

**4. Pick one**
What should you do first when starting a big program?
- A) Wait for the program to write itself
- B) Write all of it at once
- C) Start with the hardest part
- D) Break it into small steps and get the first one working
Answer: D
Why: Small steps that work are easier to build and to fix.

**5. True or false**
It is best to write the whole program before running it for the first time.
Answer: False
Why: If you run it only at the end, any bug could be anywhere. Run it after each small step.

**6. Pick one**
You finished step 2, the `ask` function. What should you do next?
- A) Delete it
- B) Test it with a question, then move on to step 3
- C) Write steps 3, 4, 5 and 6 without running anything
- D) Start over
Answer: B
Why: A tested step is a solid base for the next one.

**Recap**
Plan the program as small steps, using tools you already know. Build one step, test it, then build the next.

---

## Lesson 16.2: Build the core

**Teach**
Let's build steps 1 to 4.

First, the data and the function. `ask` shows a question and reads the reply. It cleans the reply with `strip` and `lower`, so a stray space or a capital letter does not count as wrong. Then it compares the reply with the answer. It returns `True` or `False`, so the main program can count.

```python inputs=5
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

ask("What is 2 + 3?", "5")
```
```output
Correct!
```

Test it with a wrong answer too. Always test both sides:

```python inputs=6
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

ask("What is 2 + 3?", "5")
```
```output
Not quite, the answer is 5
```

Now the questions and the loop. The score goes up each time `ask` gives back `True`:

```python inputs=5,blue,6
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

questions = [
    {"question": "What is 2 + 3?", "answer": "5"},
    {"question": "What color is the sky on a clear day?", "answer": "blue"},
    {"question": "How many days are in a week?", "answer": "7"},
]

score = 0
for item in questions:
    if ask(item["question"], item["answer"]):
        score += 1
print(f"Score: {score} out of {len(questions)}")
```
```output
Correct!
Correct!
Not quite, the answer is 7
Score: 2 out of 3
```

In the app, the questions also appear as the input prompts. The listings above show only what the program prints.

**1. Predict the output**
The player types 6.
```python inputs=6
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

ask("What is 2 + 3?", "5")
```
```output
Not quite, the answer is 5
```
- A) An error
- B) Not quite, the answer is 5
- C) Correct!
- D) Nothing is shown
Answer: B
Why: 6 is not 5, so the function shows the correction and returns False.

**2. Predict the output**
The player types a space, then BLUE, then a space.
```python inputs=~BLUE~
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

ask("What color is the sky on a clear day?", "blue")
```
```output
Correct!
```
- A) Not quite, the answer is blue
- B) An error
- C) Nothing is shown
- D) Correct!
Answer: D
Why: strip removes the spaces and lower makes it small letters, so the reply matches blue.

**3. Pick one**
Why does `ask` return True or False?
- A) To make it run faster
- B) So the main program can count the correct answers
- C) Because functions must return something
- D) To hide the result
Answer: B
Why: The loop uses the returned value in an `if` to add to the score.

**4. Pick one**
Why does `ask` use `.strip().lower()` on the reply?
- A) So a stray space or a capital letter does not make a correct answer wrong
- B) To make the reply longer
- C) It does nothing useful
- D) To save the reply to a file
Answer: A
Why: People type things like " Blue" or "BLUE". Cleaning the reply first makes the quiz fairer.

**5. Predict the output**
The player types 5, blue, 6.
```python inputs=5,blue,6
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

questions = [
    {"question": "What is 2 + 3?", "answer": "5"},
    {"question": "What color is the sky on a clear day?", "answer": "blue"},
    {"question": "How many days are in a week?", "answer": "7"},
]

score = 0
for item in questions:
    if ask(item["question"], item["answer"]):
        score += 1
print(f"Score: {score} out of {len(questions)}")
```
```output
Correct!
Correct!
Not quite, the answer is 7
Score: 2 out of 3
```
- A) Correct!, Correct!, Not quite the answer is 7, Score: 2 out of 3
- B) Score: 0 out of 3
- C) Correct!, Correct!, Correct!, Score: 3 out of 3
- D) An error
Answer: A
Why: The first two answers match, and 6 is not 7.

**6. Write it yourself**
`ask` and the questions are already written. Write the loop that asks every question and counts the score, then shows `Score:` and the result in the form Score: 3 out of 3.
Starter:
```
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

questions = [
    {"question": "What is 2 + 3?", "answer": "5"},
    {"question": "What color is the sky on a clear day?", "answer": "blue"},
    {"question": "How many days are in a week?", "answer": "7"},
]
```
Accepted: with the answers 5, blue and 7 the program prints Correct! three times and then `Score: 3 out of 3`.
```python inputs=5,blue,7
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

questions = [
    {"question": "What is 2 + 3?", "answer": "5"},
    {"question": "What color is the sky on a clear day?", "answer": "blue"},
    {"question": "How many days are in a week?", "answer": "7"},
]

score = 0
for item in questions:
    if ask(item["question"], item["answer"]):
        score += 1
print(f"Score: {score} out of {len(questions)}")
```
```output
Correct!
Correct!
Correct!
Score: 3 out of 3
```

Hint: Start the score at 0. Loop over questions, and add 1 whenever ask gives back True.

**Recap**
A function that returns True or False makes the main loop simple. Test each step, including the wrong-answer path.

---

## Lesson 16.3: Finish and extend it yourself

**Teach**
The quiz works, but it forgets everything when it stops. Time for steps 5 and 6: remember the best score in a file.

You have the tools from Unit 14. Load the best score at the end of the run. If this score is higher, save it. If the file is not there yet, the best score is 0.

```python
def load_best():
    try:
        with open("best.txt") as f:
            return int(f.read().strip())
    except FileNotFoundError:
        return 0

def save_best(score):
    with open("best.txt", "w") as f:
        f.write(str(score) + "\n")
```
```output
```

Why `int(...)`? Everything in a file is text, so the saved score must be turned back into a number before you compare it. And why `str(score)`? You can only write text to a file.

After the score is shown:

```
best = load_best()
if score > best:
    save_best(score)
    print("New best!")
else:
    print(f"Best: {best}")
```

Here is the whole program. Test 1 is the very first run, with no saved file. The player gets everything right.

```python inputs=5,blue,7
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

def load_best():
    try:
        with open("best.txt") as f:
            return int(f.read().strip())
    except FileNotFoundError:
        return 0

def save_best(score):
    with open("best.txt", "w") as f:
        f.write(str(score) + "\n")

questions = [
    {"question": "What is 2 + 3?", "answer": "5"},
    {"question": "What color is the sky on a clear day?", "answer": "blue"},
    {"question": "How many days are in a week?", "answer": "7"},
]

score = 0
for item in questions:
    if ask(item["question"], item["answer"]):
        score += 1
print(f"Score: {score} out of {len(questions)}")

best = load_best()
if score > best:
    save_best(score)
    print("New best!")
else:
    print(f"Best: {best}")
```
```output
Correct!
Correct!
Correct!
Score: 3 out of 3
New best!
```

Test 2 is a later run. A saved best of 3 exists, and the player does worse:

```file best.txt
3
```

```python inputs=5,green,6
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

def load_best():
    try:
        with open("best.txt") as f:
            return int(f.read().strip())
    except FileNotFoundError:
        return 0

def save_best(score):
    with open("best.txt", "w") as f:
        f.write(str(score) + "\n")

questions = [
    {"question": "What is 2 + 3?", "answer": "5"},
    {"question": "What color is the sky on a clear day?", "answer": "blue"},
    {"question": "How many days are in a week?", "answer": "7"},
]

score = 0
for item in questions:
    if ask(item["question"], item["answer"]):
        score += 1
print(f"Score: {score} out of {len(questions)}")

best = load_best()
if score > best:
    save_best(score)
    print("New best!")
else:
    print(f"Best: {best}")
```
```output
Correct!
Not quite, the answer is blue
Not quite, the answer is 7
Score: 1 out of 3
Best: 3
```

Test 3 is a later run that beats the saved best of 1:

```file best.txt
1
```

```python inputs=5,blue,6
def ask(question, answer):
    reply = input(question + " ").strip().lower()
    if reply == answer:
        print("Correct!")
        return True
    print(f"Not quite, the answer is {answer}")
    return False

def load_best():
    try:
        with open("best.txt") as f:
            return int(f.read().strip())
    except FileNotFoundError:
        return 0

def save_best(score):
    with open("best.txt", "w") as f:
        f.write(str(score) + "\n")

questions = [
    {"question": "What is 2 + 3?", "answer": "5"},
    {"question": "What color is the sky on a clear day?", "answer": "blue"},
    {"question": "How many days are in a week?", "answer": "7"},
]

score = 0
for item in questions:
    if ask(item["question"], item["answer"]):
        score += 1
print(f"Score: {score} out of {len(questions)}")

best = load_best()
if score > best:
    save_best(score)
    print("New best!")
else:
    print(f"Best: {best}")
```
```output
Correct!
Correct!
Not quite, the answer is 7
Score: 2 out of 3
New best!
```

**Your turn: finish it yourself**
In the app, you build steps 5 and 6 yourself. The app starts you with steps 1 to 4 already written, and your job is to add `load_best`, `save_best` and the final check. The three tests above are exactly what the app tries.

Then make it your own. Ideas, in rough order of difficulty:
1. Add more questions. Write at least five of your own.
2. Show the question number: `Question 2 of 5`.
3. Shuffle the order of the questions each run. This needs `import random` and `random.shuffle(questions)`.
4. Give each question a `"hint"` key, and show it after a wrong answer.
5. Turn the quiz into a class, with a method `ask` and an attribute `score`.
6. Save the last five scores, not just the best.

There is no single right way to do any of these. The aim is to try, run it, fix it, and run it again, exactly like the debugging routine from Unit 9.

**1. Pick one**
Why does `load_best` use `int(...)` on the text from the file?
- A) To make the file shorter
- B) To delete the file
- C) It is not needed
- D) Everything read from a file is text, and you need a number to compare
Answer: D
Why: The file holds text like "3". Comparing text with a number would not work the way you want.

**2. Pick one**
Why does `save_best` write `str(score)`?
- A) To round the score
- B) A file can only hold text, so the number must be turned into text first
- C) It is not needed
- D) To make the score bigger
Answer: B
Why: `write` only accepts text, so a number must be converted first.

**3. Pick one**
When the file best.txt does not exist yet, what should `load_best` give back?
- A) The word none
- B) A list
- C) An error
- D) 0
Answer: D
Why: With no saved score, the best so far is zero, so any score beats it.

**4. Pick one**
In the whole program, when is `save_best` called?
- A) After every question
- B) Never
- C) Only when the new score is higher than the best
- D) Before the quiz starts
Answer: C
Why: The `if score > best` check decides. Saving a lower score would lose the old best.

**5. True or false**
Making the quiz your own, with new questions and features, is part of the capstone.
Answer: True
Why: The capstone is about building something that is yours.

**Recap**
You planned a program, built it in steps, tested it, and added saving. Every step used a tool you already had.

---

## Alternative capstone: A text adventure

If you prefer, build this instead. A tiny adventure with three rooms. The player types commands like `go north`, and wins by reaching the library.

**The idea**
Each room is a dictionary with a `"text"` to show and the directions that lead out. The program keeps track of the current room and loops until the player wins or quits.

**The plan**
1. Data: a dictionary of rooms. Each room has its description and its exits.
2. Show the starting room.
3. Loop: ask for a command. `quit` ends the game. `go` plus a direction moves the player if there is an exit that way. Anything else shows `You can't do that`.
4. When the player enters the library, show the winning text and stop.

**Accepted**
With the commands go north, go south, go east, the player visits the kitchen, comes back, then wins:
```python inputs=go~north,go~south,go~east
rooms = {
    "hall": {
        "text": "You are in the hall. Doors lead north and east.",
        "north": "kitchen",
        "east": "library",
    },
    "kitchen": {
        "text": "You are in the kitchen. A door leads south.",
        "south": "hall",
    },
    "library": {
        "text": "You found the treasure! You win.",
        "west": "hall",
    },
}
directions = ["north", "south", "east", "west"]

location = "hall"
print(rooms[location]["text"])
while location != "library":
    command = input("What now? ")
    if command == "quit":
        print("Bye")
        break
    parts = command.split()
    if len(parts) == 2 and parts[0] == "go" and parts[1] in directions and parts[1] in rooms[location]:
        location = rooms[location][parts[1]]
        print(rooms[location]["text"])
    else:
        print("You can't do that")
```
```output
You are in the hall. Doors lead north and east.
You are in the kitchen. A door leads south.
You are in the hall. Doors lead north and east.
You found the treasure! You win.
```
With commands that do not work, then quit:
```python inputs=jump,go~west,quit
rooms = {
    "hall": {
        "text": "You are in the hall. Doors lead north and east.",
        "north": "kitchen",
        "east": "library",
    },
    "kitchen": {
        "text": "You are in the kitchen. A door leads south.",
        "south": "hall",
    },
    "library": {
        "text": "You found the treasure! You win.",
        "west": "hall",
    },
}
directions = ["north", "south", "east", "west"]

location = "hall"
print(rooms[location]["text"])
while location != "library":
    command = input("What now? ")
    if command == "quit":
        print("Bye")
        break
    parts = command.split()
    if len(parts) == 2 and parts[0] == "go" and parts[1] in directions and parts[1] in rooms[location]:
        location = rooms[location][parts[1]]
        print(rooms[location]["text"])
    else:
        print("You can't do that")
```
```output
You are in the hall. Doors lead north and east.
You can't do that
You can't do that
Bye
```
**Extend it:** add a fourth room, add an item to pick up, or make the library locked until the player has the key.

Note: the check `parts[1] in directions` stops commands like `go text` from sneaking in. Without it, the word `text` would match a key in the room dictionary. That is a good example of the "what if the input is strange?" thinking you will practice in the Reading and checking code course.

---

## Final exam

The final exam draws 20 questions at random from this bank of 30, two from each unit. Pass is 70%, which is 14 of 20. There is no limit on retakes, and each attempt draws a fresh set.

**E1 (Unit 1)** What does this show?
```python
print("2 + 3")
```
```output
2 + 3
```
- A) 2 + 3
- B) 5
- C) An error
- D) 23
Answer: A

**E2 (Unit 1)** True or false: Python skips a line that starts with `#`.
Answer: True

**E3 (Unit 2)** What does this show?
```python
x = 4
x = x + 1
print(x)
```
```output
5
```
- A) 41
- B) An error
- C) 4
- D) 5
Answer: D

**E4 (Unit 2)** The person types 12. What does this show?
```python inputs=12
age = input()
print(type(age))
```
```output
<class 'str'>
```
- A) 12
- B) An error
- C) `<class 'str'>`
- D) `<class 'int'>`
Answer: C

**E5 (Unit 3)** What does this show?
```python
print(2 + 3 * 4)
```
```output
14
```
- A) 24
- B) 14
- C) 9
- D) 20
Answer: B

**E6 (Unit 3)** What does this show?
```python
name = "Sam"
age = 12
print(f"{name} is {age}")
```
```output
Sam is 12
```
- A) name is age
- B) An error
- C) Sam is 12
- D) {name} is {age}
Answer: C

**E7 (Unit 4)** What does this show?
```python
age = 15
if age >= 18:
    print("adult")
elif age >= 13:
    print("teen")
else:
    print("kid")
```
```output
teen
```
- A) adult
- B) kid
- C) teen
- D) Nothing is shown
Answer: C

**E8 (Unit 4)** What does this show?
```python
print(5 > 3 and 2 > 4)
```
```output
False
```
- A) 5
- B) An error
- C) True
- D) False
Answer: D

**E9 (Unit 5)** What does this show?
```python
n = 1
while n <= 3:
    n += 1
print(n)
```
```output
4
```
- A) 3
- B) 4
- C) 1
- D) 0
Answer: B

**E10 (Unit 5)** Which loop never ends?
- A) `n = 1`, then `while n <= 3:` with only `print(n)` inside
- B) `n = 1`, then `while n <= 3:` with `print(n)` and `n += 1` inside
- C) `n = 3`, then `while n > 0:` with `n -= 1` inside
- D) `n = 0`, then `while n < 2:` with `n += 1` inside
Answer: A

**E11 (Unit 6)** What does this show?
```python
for i in range(2, 8, 2):
    print(i)
```
```output
2
4
6
```
- A) 2 to 7 (six lines)
- B) 8 only
- C) 2, 4, 6 (three lines)
- D) 2, 4, 6, 8 (four lines)
Answer: C

**E12 (Unit 6)** What does this show?
```python
for i in range(1, 6):
    if i == 4:
        break
    print(i)
```
```output
1
2
3
```
- A) 4 only
- B) 1 to 5 (five lines)
- C) 1, 2, 3 (three lines)
- D) 1, 2, 3, 4 (four lines)
Answer: C

**E13 (Unit 7)** What does this show?
```python
fruits = ["a", "b", "c"]
print(fruits[-1])
```
```output
c
```
- A) An error
- B) a
- C) c
- D) b
Answer: C

**E14 (Unit 7)** What does this show?
```python
nums = [1, 2]
nums.append(3)
print(len(nums))
```
```output
3
```
- A) 2
- B) 4
- C) 3
- D) An error
Answer: C

**E15 (Unit 8)** What does this show?
```python
count = 0
for n in [1, 2, 3, 4]:
    if n % 2 == 0:
        count += 1
print(count)
```
```output
2
```
- A) 2
- B) 3
- C) 4
- D) 1
Answer: A

**E16 (Unit 8)** What does this show?
```python
for r in range(2):
    for c in range(3):
        print("*", end="")
    print()
```
```output
***
***
```
- A) 1 line of ******
- B) 6 lines of *
- C) 3 lines of **
- D) 2 lines of ***
Answer: D

**E17 (Unit 9)** What error does this give?
```error ValueError
print(int("abc"))
```
- A) NameError
- B) SyntaxError
- C) ValueError
- D) TypeError
Answer: C

**E18 (Unit 9)** This was meant to show the total, 6. What does it show?
```python
total = 0
for n in [1, 2, 3]:
    total = n
print(total)
```
```output
3
```
- A) 3
- B) 6
- C) 0
- D) 1
Answer: A

**E19 (Unit 10)** What does this show?
```python
def double(n):
    return n * 2

print(double(4))
```
```output
8
```
- A) 8
- B) None
- C) An error
- D) 4
Answer: A

**E20 (Unit 10)** What error does this give?
```error NameError
def f():
    x = 5

f()
print(x)
```
- A) ValueError
- B) IndexError
- C) NameError
- D) TypeError
Answer: C

**E21 (Unit 11)** What does this show?
```python
nums = [10, 20, 30, 40]
print(nums[1:3])
```
```output
[20, 30]
```
- A) `[20, 30]`
- B) `[20, 30, 40]`
- C) `[10, 20]`
- D) `[10, 20, 30]`
Answer: A

**E22 (Unit 11)** What does this show?
```python
print(sorted([3, 1, 2], reverse=True))
```
```output
[3, 2, 1]
```
- A) An error
- B) `[1, 2, 3]`
- C) `[3, 2, 1]`
- D) `[3, 1, 2]`
Answer: C

**E23 (Unit 12)** What does this show?
```python
d = {"a": 1}
print(d.get("b", 0))
```
```output
0
```
- A) None
- B) 1
- C) 0
- D) An error
Answer: C

**E24 (Unit 12)** What does this show?
```python
d = {"x": 1, "y": 2}
print(sum(d.values()))
```
```output
3
```
- A) x y
- B) 3
- C) An error
- D) 12
Answer: B

**E25 (Unit 13)** What does this show?
```python
print("a,b,c".split(","))
```
```output
['a', 'b', 'c']
```
- A) `['a', 'b', 'c']`
- B) `['a,b,c']`
- C) An error
- D) `a b c`
Answer: A

**E26 (Unit 13)** What does this show?
```python
word = "hi"
word.upper()
print(word)
```
```output
hi
```
- A) hi
- B) Hi
- C) HI
- D) An error
Answer: A

**E27 (Unit 14)** What does this show?
```python
with open("f.txt", "w") as f:
    f.write("a\n")
with open("f.txt", "a") as f:
    f.write("b\n")
with open("f.txt") as f:
    print(len(f.read().splitlines()))
```
```output
2
```
- A) 3
- B) 1
- C) 2
- D) An error
Answer: C

**E28 (Unit 14)** What does this show?
```python
try:
    with open("missing.txt") as f:
        text = f.read()
except FileNotFoundError:
    text = "none"
print(text)
```
```output
none
```
- A) none
- B) missing.txt
- C) An error
- D) Nothing is shown
Answer: A

**E29 (Unit 15)** What does this show?
```python
class Dog:
    def __init__(self, name):
        self.name = name

print(Dog("Rex").name)
```
```output
Rex
```
- A) Rex
- B) An error
- C) Dog
- D) name
Answer: A

**E30 (Unit 15)** What does this show?
```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self):
        self.count += 1

c = Counter()
c.add()
c.add()
print(c.count)
```
```output
2
```
- A) 0
- B) 2
- C) An error
- D) 1
Answer: B

---

## Completion screen

When the learner passes the final exam, show:

- The mascot at the next growth stage, cheering, with confetti.
- A message: "You finished Python fundamentals. You can read and write real programs now."
- Their numbers: lessons completed, days practiced, best streak, and the final exam score.
- A badge: "Python fundamentals".
- What next, as choices based on the goal they picked at the start:
  - Reading and checking code (understand code you did not write)
  - Store and manage data (build the library app)
  - Build a window app
  - Web basics
