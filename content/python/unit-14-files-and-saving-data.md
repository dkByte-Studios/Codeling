# Python, Unit 14: Files and saving data

Until now, everything a program knew disappeared when it stopped. This unit shows how to save data in a file and load it back, so a program can remember things between runs.

**An important note for learners (show this in lesson 14.1):** the files in Codeling live in a private pretend folder inside the app, not on your computer's real disk. Everything you learn here works the same on a real computer, but you will not find these files in your Documents folder.

Format notes: same as Units 1 to 13, plus a `file` block. A `file notes.txt` block gives the next program a sample file called notes.txt. Each program runs in its own empty folder, so nothing carries over from one program to the next. The error message quoted in the teach text is checked by `check.py`.

---

## Lesson 14.1: Reading a file

**Teach**
A file is a named piece of stored text. To read one, you open it. The `with` line below opens the file and closes it again for you when the indented lines are done.

Imagine a file called notes.txt that holds two lines:

```file notes.txt
Buy milk
Call Sam
```

This reads it all at once:

```python
with open("notes.txt") as f:
    text = f.read()
print(text)
```
```output
Buy milk
Call Sam
```

`open("notes.txt")` opens the file. `as f` gives it a short name to use. `f.read()` gives back everything in it as one piece of text.

You can also go through the file one line at a time with a loop. Every line from a file ends with an invisible newline character, so use `strip()` to remove it:

```file notes.txt
Buy milk
Call Sam
```

```python
with open("notes.txt") as f:
    for line in f:
        print(line.strip())
```
```output
Buy milk
Call Sam
```

Remember, in Codeling the files live in a private pretend folder inside the app. The code you write is exactly the code you would write on a real computer.

**1. Predict the output**
The file colors.txt holds two lines.
```file colors.txt
red
green
```

```python
with open("colors.txt") as f:
    text = f.read()
print(text)
```
```output
red
green
```
- A) red green on one line
- B) An error
- C) red, then green on the next line
- D) colors.txt
Answer: C
Why: read gives back the whole file as text, including the line break between the lines.

**2. Predict the output**
```file colors.txt
red
green
```

```python
with open("colors.txt") as f:
    for line in f:
        print(line.strip())
```
```output
red
green
```
- A) An error
- B) colors.txt twice
- C) red, a blank line, green, a blank line
- D) red, then green on the next line
Answer: D
Why: The loop gives one line at a time, and strip removes the newline at the end of each.

**3. Predict the output**
The file hi.txt holds the word hi and one line break.
```file hi.txt
hi
```

```python
with open("hi.txt") as f:
    text = f.read()
print(len(text))
```
```output
3
```
- A) 2
- B) 1
- C) 3
- D) 4
Answer: C
Why: The text is "hi" plus a newline character, three characters in all. The newline counts, even though you cannot see it.

**4. Predict the output**
```file todo.txt
wash car
read book
call Sam
```

```python
count = 0
with open("todo.txt") as f:
    for line in f:
        count += 1
print(count)
```
```output
3
```
- A) 1
- B) 2
- C) 9
- D) 3
Answer: D
Why: The loop runs once for each line, and the file has three.

**5. Pick one**
Why does the code use `with open(...) as f:`?
- A) It makes the file bigger
- B) It closes the file automatically when you are done
- C) It makes the file read faster
- D) It deletes the file
Answer: B
Why: Forgetting to close a file can cause problems. `with` takes care of it.

**6. Pick one**
Why does the loop use `line.strip()`?
- A) To make the file shorter
- B) Every line from a file ends with a newline character, and strip removes it
- C) To make the text bigger
- D) It is not needed
Answer: B
Why: Without strip, print would add a second line break after each line, leaving blank lines.

**7. Write it yourself**
The file names.txt has one name per line. Show how many names there are.
```file names.txt
Sam
Mia
Leo
```
Accepted: the program prints `3`.
```python
count = 0
with open("names.txt") as f:
    for line in f:
        count += 1
print(count)
```
```output
3
```

Hint: Open the file with `with open(...) as f:`, loop over f, and count the lines.

**Recap**
`with open("name") as f:` opens a file. `f.read()` gives all the text, and a loop gives one line at a time. Use `strip()` to remove the newline.

---

## Lesson 14.2: Writing a file

**Teach**
To write, open the file with a mode. The mode is a short text in the second place of the brackets.

- `"w"` means write. It creates the file, and if it already exists, it erases the old content first.
- `"a"` means append. It adds to the end and keeps the old content.

`f.write(text)` puts text into the file. It does not add a line break for you, so add `"\n"` where you want one.

```python
with open("log.txt", "w") as f:
    f.write("first\n")
    f.write("second\n")

with open("log.txt") as f:
    print(f.read())
```
```output
first
second
```

Opening with `"w"` again wipes it:

```python
with open("log.txt", "w") as f:
    f.write("one\n")
with open("log.txt", "w") as f:
    f.write("two\n")
with open("log.txt") as f:
    print(f.read())
```
```output
two
```

With `"a"` the old content stays:

```python
with open("log.txt", "w") as f:
    f.write("one\n")
with open("log.txt", "a") as f:
    f.write("two\n")
with open("log.txt") as f:
    print(f.read())
```
```output
one
two
```

**1. Predict the output**
```python
with open("log.txt", "w") as f:
    f.write("first\n")
    f.write("second\n")

with open("log.txt") as f:
    print(f.read())
```
```output
first
second
```
- A) first, then second on the next line
- B) log.txt
- C) An error
- D) firstsecond on one line
Answer: A
Why: Each write added a line break at the end with `\n`.

**2. Predict the output**
```python
with open("log.txt", "w") as f:
    f.write("one\n")
with open("log.txt", "w") as f:
    f.write("two\n")
with open("log.txt") as f:
    print(f.read())
```
```output
two
```
- A) An error
- B) one, then two
- C) one
- D) two
Answer: D
Why: The second "w" erased the file before writing, so only two is left.

**3. Predict the output**
```python
with open("log.txt", "w") as f:
    f.write("one\n")
with open("log.txt", "a") as f:
    f.write("two\n")
with open("log.txt") as f:
    print(f.read())
```
```output
one
two
```
- A) one, then two
- B) two
- C) one
- D) An error
Answer: A
Why: "a" adds to the end, so one stays.

**4. Pick one**
Which mode keeps the old content of a file?
- A) "w"
- B) "r"
- C) "x"
- D) "a"
Answer: D
Why: "a" appends. "w" erases first.

**5. Predict the output**
Look carefully. There is no `\n`.
```python
with open("x.txt", "w") as f:
    f.write("a")
    f.write("b")
with open("x.txt") as f:
    print(f.read())
```
```output
ab
```
- A) ab
- B) An error
- C) a, then b on the next line
- D) a
Answer: A
Why: write does not add a line break. Without `\n`, the pieces stick together.

**6. Pick one**
What happens to an existing file when you open it with "w"?
- A) Nothing, it is left alone
- B) The file is deleted forever and cannot be used
- C) The new text is added at the end
- D) Its old content is erased
Answer: D
Why: "w" starts the file fresh. Use "a" to add to it.

**7. Write it yourself**
Write the word Hello and a line break into greet.txt. Then read the file back and show it.
Accepted: the program prints `Hello`.
```python
with open("greet.txt", "w") as f:
    f.write("Hello\n")
with open("greet.txt") as f:
    print(f.read().strip())
```
```output
Hello
```

Hint: Write with "w" and end the text with `\n`. Then open the file again to read it, and strip the line break.

**Recap**
`"w"` replaces a file, `"a"` adds to it. `write` does not add line breaks, so add `\n` yourself.

---

## Lesson 14.3: Saving a list

**Teach**
To save a list, write one item per line. To load it back, read the lines into a list.

```python
items = ["milk", "eggs", "bread"]
with open("list.txt", "w") as f:
    for item in items:
        f.write(item + "\n")

loaded = []
with open("list.txt") as f:
    for line in f:
        loaded.append(line.strip())
print(loaded)
```
```output
['milk', 'eggs', 'bread']
```

There is a shortcut for loading. `splitlines()` cuts the text at the line breaks and does not leave an empty piece at the end:

```python
with open("list.txt", "w") as f:
    f.write("a\nb\n")
with open("list.txt") as f:
    print(f.read().splitlines())
```
```output
['a', 'b']
```

Careful: everything in a file is text. If you save numbers, they come back as text, and you must turn them back with `int()` when you load them.

```python
numbers = [1, 2, 3]
with open("nums.txt", "w") as f:
    for n in numbers:
        f.write(str(n) + "\n")

loaded = []
with open("nums.txt") as f:
    for line in f:
        loaded.append(line.strip())
print(loaded[0] + loaded[1])
```
```output
12
```

**1. Predict the output**
```python
items = ["milk", "eggs", "bread"]
with open("list.txt", "w") as f:
    for item in items:
        f.write(item + "\n")

loaded = []
with open("list.txt") as f:
    for line in f:
        loaded.append(line.strip())
print(loaded)
```
```output
['milk', 'eggs', 'bread']
```
- A) `['milk', 'eggs', 'bread']`
- B) An error
- C) `milk eggs bread`
- D) `['milk\n', 'eggs\n', 'bread\n']`
Answer: A
Why: Each item went on its own line, and strip removed the newline when loading.

**2. Predict the output**
Numbers come back as text.
```python
with open("nums.txt", "w") as f:
    for n in [1, 2, 3]:
        f.write(str(n) + "\n")

loaded = []
with open("nums.txt") as f:
    for line in f:
        loaded.append(line.strip())
print(loaded[0] + loaded[1])
```
```output
12
```
- A) 1 + 2
- B) An error
- C) 12
- D) 3
Answer: C
Why: The values loaded from a file are text, so + joins them.

**3. Predict the output**
This time the numbers are turned back with int().
```python
with open("nums.txt", "w") as f:
    for n in [1, 2, 3]:
        f.write(str(n) + "\n")

total = 0
with open("nums.txt") as f:
    for line in f:
        total += int(line.strip())
print(total)
```
```output
6
```
- A) An error
- B) 3
- C) 123
- D) 6
Answer: D
Why: int() turns each line into a number, so the total adds up.

**4. Predict the output**
```python
with open("list.txt", "w") as f:
    f.write("a\nb\n")
with open("list.txt") as f:
    print(f.read().splitlines())
```
```output
['a', 'b']
```
- A) `['a', 'b']`
- B) An error
- C) `a b`
- D) `['a', 'b', '']`
Answer: A
Why: splitlines cuts at the line breaks and does not leave an empty piece after the last one.

**5. Pick one**
Why does the code write `item + "\n"`?
- A) To delete the old content
- B) To make the file bigger
- C) So each item goes on its own line
- D) It is not needed
Answer: C
Why: Without the line break, the items would stick together.

**6. Predict the output**
This program forgot the line break when saving.
```python
with open("list.txt", "w") as f:
    for item in ["milk", "eggs"]:
        f.write(item)

loaded = []
with open("list.txt") as f:
    for line in f:
        loaded.append(line.strip())
print(loaded)
```
```output
['milkeggs']
```
- A) `['milkeggs']`
- B) `['milk', 'eggs']`
- C) `[]`
- D) An error
Answer: A
Why: Without line breaks, the whole file is one line of text, "milkeggs".

**7. Write it yourself**
Save the names to names.txt, one per line. Then load them back into a list and show how many there are.
Starter:
```
names = ["Sam", "Mia", "Leo"]
```
Accepted: the program prints `3`.
```python
names = ["Sam", "Mia", "Leo"]
with open("names.txt", "w") as f:
    for name in names:
        f.write(name + "\n")

loaded = []
with open("names.txt") as f:
    for line in f:
        loaded.append(line.strip())
print(len(loaded))
```
```output
3
```

Hint: Write each name plus `\n`. Then read the lines back into a list and print its length.

**Recap**
Write one item per line, and read the lines back into a list. Everything in a file is text, so convert numbers back with `int()`.

---

## Lesson 14.4: Missing files

**Teach**
What if the file is not there? That happens the very first time a program runs, before it has saved anything.

```error FileNotFoundError
with open("missing.txt") as f:
    print(f.read())
```

Python says: `FileNotFoundError: [Errno 44] No such file or directory: 'missing.txt'`. (On many computers the number in brackets is 2. The number does not matter, the words do.)

You can catch an error and decide what to do instead of letting the program crash. The tool is `try` and `except`:

```python
try:
    with open("missing.txt") as f:
        text = f.read()
except FileNotFoundError:
    text = "(no file yet)"
print(text)
```
```output
(no file yet)
```

How it works: Python tries the indented lines under `try`. If that error happens, it jumps to `except` and runs those lines. If no error happens, `except` is skipped.

`except FileNotFoundError:` only catches that one kind of error. Any other error still crashes the program, which is what you want, because you do not want to hide real bugs.

**1. Pick one**
What error do you get when you open a file that does not exist?
- A) NameError
- B) IndexError
- C) ValueError
- D) FileNotFoundError
Answer: D
Why: The name says it all.

**2. Predict the output**
```python
try:
    with open("missing.txt") as f:
        text = f.read()
except FileNotFoundError:
    text = "(no file yet)"
print(text)
```
```output
(no file yet)
```
- A) (no file yet)
- B) Nothing is shown
- C) An error
- D) missing.txt
Answer: A
Why: The file is not there, so the except block runs and sets the text.

**3. Predict the output**
This time the file exists.
```file data.txt
hello
```

```python
try:
    with open("data.txt") as f:
        text = f.read()
except FileNotFoundError:
    text = "none"
print(text.strip())
```
```output
hello
```
- A) data.txt
- B) hello
- C) An error
- D) none
Answer: B
Why: The file is found, so no error happens and the except block is skipped.

**4. Predict**
What happens when this runs?
```error ValueError
try:
    print(int("x"))
except FileNotFoundError:
    print("none")
```
- A) It shows nothing
- B) It shows x
- C) A ValueError still crashes the program
- D) It shows none
Answer: C
Why: The except only catches FileNotFoundError. A ValueError is a different error, so it goes through.

**5. Pick one**
Why use try and except when loading a saved file at the start of a program?
- A) The first time the program runs, there is no saved file yet
- B) To make the program slower
- C) To delete old files
- D) It is required for every file
Answer: A
Why: A missing file is normal the first time. The program should start with an empty list, not crash.

**6. Predict the output**
```python
def load_items():
    try:
        with open("items.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

print(load_items())
```
```output
[]
```
- A) An error
- B) `['items.txt']`
- C) `[]`
- D) None
Answer: C
Why: There is no items.txt, so the function returns an empty list.

**7. Write it yourself**
Read the theme from settings.txt. If the file is missing, use light. Then show the theme.
Accepted: with no file the program prints `light`. If settings.txt holds dark, it prints `dark`.
```python
try:
    with open("settings.txt") as f:
        theme = f.read().strip()
except FileNotFoundError:
    theme = "light"
print(theme)
```
```output
light
```
```file settings.txt
dark
```

```python
try:
    with open("settings.txt") as f:
        theme = f.read().strip()
except FileNotFoundError:
    theme = "light"
print(theme)
```
```output
dark
```

Hint: Put the file reading inside try, and the default theme under `except FileNotFoundError:`.

**Recap**
A missing file gives a FileNotFoundError. `try` and `except` let a program handle it, for example by starting with an empty list.

---

## Lesson 14.5: A to-do list that remembers

**Teach**
Now put it together. A program that remembers needs two small functions: one to load the data when it starts, and one to save it when it changes.

```python
def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\n")

todos = load_todos()
todos.append("buy milk")
save_todos(todos)
print(todos)
```
```output
['buy milk']
```

The very first time, there is no file, so `load_todos` gives an empty list. The program adds an item and saves.

The next time the program runs, the file exists, so the list starts with what was saved. Imagine todos.txt now holds `buy milk`, and the program adds `call Sam`:

```file todos.txt
buy milk
```

```python
def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\n")

todos = load_todos()
todos.append("call Sam")
save_todos(todos)
print(todos)
```
```output
['buy milk', 'call Sam']
```

The golden rule: save after every change. If the program stops suddenly, nothing is lost.

**1. Put in order**
Put the lines of `load_todos` in the right order.
Pieces: `        return []`, `def load_todos():`, `    except FileNotFoundError:`, `    try:`, `            return f.read().splitlines()`, `        with open("todos.txt") as f:`
Correct order:
1. `def load_todos():`
2. `    try:`
3. `        with open("todos.txt") as f:`
4. `            return f.read().splitlines()`
5. `    except FileNotFoundError:`
6. `        return []`
Why: try holds the risky part, and except says what to do if the file is missing.

**2. Predict the output**
This is the very first run. There is no todos.txt.
```python
def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\n")

todos = load_todos()
todos.append("buy milk")
save_todos(todos)
print(todos)
```
```output
['buy milk']
```
- A) `[]`
- B) An error
- C) `['buy milk']`
- D) `['todos.txt']`
Answer: C
Why: With no file, load gives an empty list, then buy milk is added.

**3. Predict the output**
This is a later run. todos.txt already holds buy milk.
```file todos.txt
buy milk
```

```python
def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\n")

todos = load_todos()
todos.append("call Sam")
save_todos(todos)
print(todos)
```
```output
['buy milk', 'call Sam']
```
- A) An error
- B) `['call Sam']`
- C) `['buy milk']`
- D) `['buy milk', 'call Sam']`
Answer: D
Why: The saved item is loaded first, and then the new one is added to the end.

**4. Pick one**
A program adds an item but never calls save_todos. The next time it runs, what does the list start with?
- A) Whatever was saved before, since the new item was never written to the file
- B) Nothing at all, always
- C) An error
- D) Everything, including the new item
Answer: A
Why: Only what is written to the file is remembered. Changes in memory disappear when the program stops.

**5. Pick one**
When should the program call save_todos?
- A) Only when it crashes
- B) After every change to the list
- C) Never
- D) Only at the very start
Answer: B
Why: That way, nothing is lost if the program stops unexpectedly.

**6. Predict the output**
This program has a bug in how it saves. Look at the mode.
```file t.txt
a
```

```python
def load():
    try:
        with open("t.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save(items):
    with open("t.txt", "a") as f:
        for item in items:
            f.write(item + "\n")

items = load()
items.append("b")
save(items)
print(load())
```
```output
['a', 'a', 'b']
```
- A) `['b']`
- B) An error
- C) `['a', 'a', 'b']`
- D) `['a', 'b']`
Answer: C
Why: save writes the whole list, but "a" adds to the end of the file instead of replacing it. So a was written twice. The fix is to open with "w".

**7. Write it yourself**
Write a function count_todos() that gives back how many lines are in todos.txt, or 0 if the file is missing. Then show count_todos().
Accepted: with two lines in the file it prints `2`, and with no file it prints `0`.
```file todos.txt
buy milk
call Sam
```

```python
def count_todos():
    try:
        with open("todos.txt") as f:
            return len(f.read().splitlines())
    except FileNotFoundError:
        return 0

print(count_todos())
```
```output
2
```
```python
def count_todos():
    try:
        with open("todos.txt") as f:
            return len(f.read().splitlines())
    except FileNotFoundError:
        return 0

print(count_todos())
```
```output
0
```

Hint: Use try and `except FileNotFoundError:`. In the except part, return 0.

**Recap**
Load at the start, save after every change, and use `try` and `except` for the first run when there is no file yet.

---

## Unit 14 project: A to-do list that remembers

**Goal**
Build a small to-do program with a menu. It loads the saved list when it starts, and saves it after every change, so the list is still there next time.

Commands:
- `add` asks for a task and adds it, then shows `Added`.
- `list` shows the tasks, numbered from 1.
- `done` asks for a number, removes that task, and shows `Removed:` and the task.
- `quit` shows `Bye` and ends the program.
- Anything else shows `Unknown command`.

**Guided steps**
1. Write `load_todos` and `save_todos` as in lesson 14.5.
2. Load the list into `todos` when the program starts.
3. Start a `while True:` loop that asks for a command.
4. For `add`: ask for the task, append it, save, and show Added.
5. For `list`: loop with `range(len(todos))` and show `f"{i + 1}. {todos[i]}"`.
6. For `done`: ask for the number, `pop(number - 1)`, save, and show the removed task.
7. For `quit`: show Bye and `break`.
8. Anything else: show Unknown command.

**Accepted**
With a saved file holding `buy milk`, the commands list, add, call Sam, list, done, 1, list, quit give:
```file todos.txt
buy milk
```

```python inputs=list,add,call~Sam,list,done,1,list,quit
def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\n")

todos = load_todos()
while True:
    command = input("Command (add, list, done, quit)? ")
    if command == "add":
        task = input("Task? ")
        todos.append(task)
        save_todos(todos)
        print("Added")
    elif command == "list":
        for i in range(len(todos)):
            print(f"{i + 1}. {todos[i]}")
    elif command == "done":
        number = int(input("Number? "))
        removed = todos.pop(number - 1)
        save_todos(todos)
        print(f"Removed: {removed}")
    elif command == "quit":
        print("Bye")
        break
    else:
        print("Unknown command")
```
```output
1. buy milk
Added
1. buy milk
2. call Sam
Removed: buy milk
1. call Sam
Bye
```
With no saved file, the commands list, add, tea, quit give an empty list and then Added:
```python inputs=list,add,tea,quit
def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\n")

todos = load_todos()
while True:
    command = input("Command (add, list, done, quit)? ")
    if command == "add":
        task = input("Task? ")
        todos.append(task)
        save_todos(todos)
        print("Added")
    elif command == "list":
        for i in range(len(todos)):
            print(f"{i + 1}. {todos[i]}")
    elif command == "done":
        number = int(input("Number? "))
        removed = todos.pop(number - 1)
        save_todos(todos)
        print(f"Removed: {removed}")
    elif command == "quit":
        print("Bye")
        break
    else:
        print("Unknown command")
```
```output
Added
Bye
```
A later run, where the saved file holds `tea`, shows it straight away:
```file todos.txt
tea
```

```python inputs=list,quit
def load_todos():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as f:
        for item in todos:
            f.write(item + "\n")

todos = load_todos()
while True:
    command = input("Command (add, list, done, quit)? ")
    if command == "add":
        task = input("Task? ")
        todos.append(task)
        save_todos(todos)
        print("Added")
    elif command == "list":
        for i in range(len(todos)):
            print(f"{i + 1}. {todos[i]}")
    elif command == "done":
        number = int(input("Number? "))
        removed = todos.pop(number - 1)
        save_todos(todos)
        print(f"Removed: {removed}")
    elif command == "quit":
        print("Bye")
        break
    else:
        print("Unknown command")
```
```output
1. tea
Bye
```

**Recap**
You used functions, a menu loop, `if` and `elif`, lists, and file saving together. This is a real program that remembers.

---

## Unit 14 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (14.1)** What does this show?
```file a.txt
one
two
```

```python
with open("a.txt") as f:
    print(f.read())
```
```output
one
two
```
- A) a.txt
- B) An error
- C) one two
- D) one, then two on the next line
Answer: D

**Q2 (14.1)** How many lines does the loop count?
```file a.txt
x
y
z
w
```

```python
count = 0
with open("a.txt") as f:
    for line in f:
        count += 1
print(count)
```
```output
4
```
- A) 3
- B) 1
- C) 5
- D) 4
Answer: D

**Q3 (14.1)** What does this show?
```file a.txt
ok
```

```python
with open("a.txt") as f:
    print(len(f.read()))
```
```output
3
```
- A) 3
- B) 2
- C) 1
- D) 4
Answer: A

**Q4 (14.1)** Why is `with` used when opening a file?
- A) It hides the file
- B) It makes the file longer
- C) It closes the file automatically
- D) It copies the file
Answer: C

**Q5 (14.2)** What does this show?
```python
with open("f.txt", "w") as f:
    f.write("A\n")
with open("f.txt", "w") as f:
    f.write("B\n")
with open("f.txt") as f:
    print(f.read().strip())
```
```output
B
```
- A) B
- B) An error
- C) A, then B
- D) A
Answer: A

**Q6 (14.2)** What does this show?
```python
with open("f.txt", "w") as f:
    f.write("A\n")
with open("f.txt", "a") as f:
    f.write("B\n")
with open("f.txt") as f:
    print(f.read())
```
```output
A
B
```
- A) An error
- B) B
- C) A, then B on the next line
- D) A
Answer: C

**Q7 (14.2)** Which mode adds to the end of a file and keeps the old content?
- A) "a"
- B) "w"
- C) "n"
- D) "r"
Answer: A

**Q8 (14.2)** What does this show?
```python
with open("f.txt", "w") as f:
    f.write("x")
    f.write("y")
with open("f.txt") as f:
    print(f.read())
```
```output
xy
```
- A) x
- B) x, then y on the next line
- C) An error
- D) xy
Answer: D

**Q9 (14.3)** What does this show?
```python
with open("l.txt", "w") as f:
    for item in ["a", "b"]:
        f.write(item + "\n")
loaded = []
with open("l.txt") as f:
    for line in f:
        loaded.append(line.strip())
print(loaded)
```
```output
['a', 'b']
```
- A) An error
- B) `a b`
- C) `['a', 'b']`
- D) `['a\n', 'b\n']`
Answer: C

**Q10 (14.3)** What does this show?
```python
with open("n.txt", "w") as f:
    f.write("4\n5\n")
total = 0
with open("n.txt") as f:
    for line in f:
        total += int(line.strip())
print(total)
```
```output
9
```
- A) 45
- B) 4
- C) 9
- D) An error
Answer: C

**Q11 (14.3)** Numbers read from a file are...
- A) Always decimals
- B) Text, until you convert them with int()
- C) Always whole numbers
- D) Lists
Answer: B

**Q12 (14.4)** What error do you get when opening a file that is not there?
- A) TypeError
- B) IndexError
- C) FileNotFoundError
- D) KeyError
Answer: C

**Q13 (14.4)** What does this show?
```python
try:
    with open("nothing.txt") as f:
        data = f.read()
except FileNotFoundError:
    data = "empty"
print(data)
```
```output
empty
```
- A) nothing.txt
- B) empty
- C) An error
- D) Nothing is shown
Answer: B

**Q14 (14.4)** Why use `try` and `except` when loading saved data?
- A) The first run has no saved file yet
- B) To delete the file
- C) It is not needed
- D) To make the program crash
Answer: A

**Q15 (14.4)** What does this show?
```python
def load():
    try:
        with open("zzz.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

print(len(load()))
```
```output
0
```
- A) None
- B) 0
- C) 1
- D) An error
Answer: B

**Q16 (14.5)** When should a program save its data?
- A) After every change
- B) Only when it is slow
- C) Never
- D) Only at the start
Answer: A

**Q17 (14.5)** What does this show?
```file todos.txt
a
```

```python
def load():
    try:
        with open("todos.txt") as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []

items = load()
items.append("b")
print(items)
```
```output
['a', 'b']
```
- A) An error
- B) `['b']`
- C) `['a']`
- D) `['a', 'b']`
Answer: D

**Q18 (14.5)** A save function opens the file with "a" and writes the whole list each time. What goes wrong?
- A) Nothing is saved
- B) Items get saved more than once
- C) The program crashes immediately
- D) Items are saved in a different order
Answer: B

**Q19 (mixed)** True or false: in Codeling, the files you write are stored in a private pretend folder inside the app.
Answer: True

**Q20 (mixed)** A program adds an item and never saves. After the program stops, what happens to the item?
- A) It is saved anyway
- B) It is lost
- C) It is added twice next time
- D) It is saved in a different file
Answer: B

**Q21 (14.1)** What does this show?
```file n.txt
5
```

```python
with open("n.txt") as f:
    print(int(f.read().strip()) + 1)
```
```output
6
```
- A) 6
- B) 5
- C) 51
- D) An error
Answer: A

**Q22 (14.2)** How many lines does the program count?
```python
with open("g.txt", "w") as f:
    f.write("A\n")
    f.write("B\n")
with open("g.txt") as f:
    print(len(f.read().splitlines()))
```
```output
2
```
- A) 1
- B) 2
- C) 4
- D) 3
Answer: B

**Q23 (14.3)** What does this show?
```python
with open("n.txt", "w") as f:
    f.write("7\n8\n")
total = 0
with open("n.txt") as f:
    for line in f:
        total += int(line.strip())
print(total)
```
```output
15
```
- A) 15
- B) 7
- C) An error
- D) 78
Answer: A

**Q24 (14.4)** What error does this give?
```error FileNotFoundError
with open("nope.txt") as f:
    print(f.read())
```
- A) FileNotFoundError
- B) KeyError
- C) NameError
- D) ValueError
Answer: A

**Q25 (14.5)** When should the to-do program load the saved list?
- A) Never
- B) When the program starts
- C) After every task is added
- D) Only when the program ends
Answer: B

Note: this bank has 25 questions.
