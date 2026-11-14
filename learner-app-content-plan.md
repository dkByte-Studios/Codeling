# Learner app: content plan (draft)

A Duolingo-style app that teaches programming. This file is the content plan only. Nothing is built. Platform and name are not decided. All code samples below are untested and must be run and checked before they go into the app.

## 1. Overview

- **Audience:** adults and teens, complete beginners first.
- **Session:** daily goal of 5, 10, 15 or 20 minutes. A lesson takes 3 to 5 minutes.
- **Lesson shape:** one idea, a short friendly explanation, then 5 to 8 exercises, then a recap. Predict first, explain the "why" before the "how". Every wrong answer gets a plain explanation.
- **Courses are packs:** each course is a self-contained set of units, lessons and exercises, so a new course (Java, Kotlin, and so on) can be added without changing the app.
- **Gamification:** XP, streaks, daily goal ring, celebration screens, badges, a mascot, review of mistakes. No hearts.

### First-time setup questions
1. Why are you learning? (hobby, understand code, build apps, career)
2. Experience? (never coded, a little, comfortable). A short placement quiz lets people skip ahead.
3. Daily goal: 5, 10, 15 or 20 minutes.
4. Interests: websites, apps, games, data, automation (changes example topics and later course order).

The path can be changed any time in Settings.

### Learning paths
Core for everyone: How code works, Python fundamentals (including Debugging).

| Goal | After the core |
|---|---|
| Hobby / understand code | Reading and checking code, Store and manage data, JSON and tools, web basics |
| Build my own apps | Store and manage data, Build a window app, web basics, tools, databases, projects |
| Career | Web basics, JavaScript and TypeScript, Git, SQL, algorithms, portfolio projects |

### Quizzes
- **Quick check:** 2 or 3 questions at the end of each lesson.
- **Unit checkpoint quiz:** 10 questions drawn from a bank of about 25. **Pass mark 70%. Passing unlocks the next unit.** Unlimited retries with shuffled questions. No hearts.
- A failed quiz names the lessons behind the missed questions with a button to go there. After 2 fails in a row, a gentle suggestion to redo those lessons.
- **Test out:** a confident learner can take a unit quiz first and skip the unit by passing.
- **Daily review quiz:** 5 questions made from past mistakes.
- **Placement quiz** at the start. **Course final exam** (about 20 questions).
- Projects and review quizzes never block progress. Pass mark is a per-unit setting, so it can be lowered where testing shows people get stuck.

### Exercise types
Multiple choice, true or false, predict the output, fill the blank, put the lines in order, find the bug, match, "how many times does this run?", step-through table, short typed code that the app checks.

### Special tool: step-through view
Runs a short program one line at a time with a table of variable values. Used in every loop lesson.

## 2. Course map

1. How code works (1 unit)
2. **Python fundamentals** (16 units, about 84 lessons)
3. Reading and checking code
4. Store and manage data
5. Build a window app (GUI)
6. Later: Java, Kotlin, JavaScript and TypeScript, Rust, C#, SQL, web basics, tools (terminal, Git, JSON and YAML)

Suggested order: How code works, Python 1 to 9, Reading and checking code (after Unit 9, deeper after Unit 12), Python 10 to 16, Store and manage data, Build a window app, then goal paths.

---

## 3. Course: How code works (about 6 lessons, no real coding)

- **C.1 Computers follow instructions:** input, process, output. *Ex:* order the steps of a vending machine, match input and output.
- **C.2 Why we write in code languages:** the computer only understands 0s and 1s, languages translate. *Ex:* true or false, pick the translator's job.
- **C.3 Data is everything:** numbers, text, true or false stored in memory like labeled boxes. *Ex:* sort values into types.
- **C.4 Read your first code:** short, near-English code, "what does this do?". *Ex:* pick the output.
- **C.5 Where code lives:** files, folders, an editor, the terminal, running a program. *Ex:* match each piece to its job.
- **C.6 The pieces of an app:** the screen, the logic, stored data, files like images. A map of what later courses cover. *Ex:* sort app pieces into groups.
- **Checkpoint quiz.**

Note: Python Unit 1 lesson 1.1 becomes a quick recap for anyone who passed this course.

---

## 4. Course: Python fundamentals (16 units)

**Status:** all 16 units are written in full in `content/python/` (84 lessons, a quiz bank per unit, a 30-question final exam bank, 10 unit projects plus a two-option capstone). `py content/check.py` runs every code sample, trace table, endless loop, JSON example and quoted error message. The outline below is the original plan, kept for reference.

Pass mark 70% on every unit quiz. Sample exercises shown; the real app has 5 to 8 per lesson.

### Unit 1: Hello, Python (5)
- **1.1 What is a program?** A list of instructions followed in order, taken literally. *Ex:* pick the definition, order the steps for making tea, true or false "the computer guesses what you meant".
- **1.2 Your first `print`:** `print("Hello, world!")`. Text in quotes, brackets required. *Ex:* predict `print("Hi")`, fill `print(___Good morning___)`, type a line that prints `Hello`, pick which line prints `Hi`.
- **1.3 Running code and reading output:** top to bottom, each print on a new line. *Ex:* predict 3 prints, order lines to get `1 2 3`, count output lines.
- **1.4 Comments:** `#` lines are ignored. *Ex:* which line is skipped, add a comment (typed).
- **1.5 Your first error:** errors are normal. Missing end quote `print("Hi)` gives SyntaxError. Missing bracket `print("Hi"` gives SyntaxError. Wrong word `prnt("Hi")` or `Print("Hi")` gives NameError. *Ex:* match message to cause, find the bug in 3 lines, fix a line (typed).

### Unit 2: Variables and data types (6)
- **2.1 Variables are labeled boxes:** `name = "Sam"`, `print(name)`. *Ex:* predict, value of `score` after `score = 10`, fill `age = ___`, why `print("name")` shows `name`.
- **2.2 Naming variables:** no leading number, no spaces, use clear names like `player_score`. *Ex:* which names are valid (`my_name`, `2cool`, `my name`), pick the clearest name, fix an invalid name.
- **2.3 Numbers:** int and float, values change over time (`age = age + 1`). *Ex:* predict after 3 changes, step-through trace, pick int or float, add 5 to `score` (typed).
- **2.4 Text:** strings in quotes, `+` joins. `"5" + "5"` is `55`. *Ex:* predict `"Hi " + "Sam"`, `"5" + "5"` versus `5 + 5`, complete a greeting.
- **2.5 True or false and `type()`:** `type(3.5)` shows `<class 'float'>`. *Ex:* match value to type, predict `type("7")` and `type(7)`, is `"True"` in quotes a boolean (no).
- **2.6 Getting input:** `input()` always gives text, so use `int()`. *Ex:* predict `"3" + "4"` from input, fix a missing `int()`, mini project: ask a name and age and print a sentence.

### Unit 3: Operators and the calculator (5)
- **3.1 Math operators:** `+ - * /` and `**`. `7 / 2` is `3.5`. *Ex:* predict `2 + 3 * 4` (14), match operator to job.
- **3.2 Whole-number division and remainder:** `7 // 2` is `3`, `7 % 2` is `1`. *Ex:* predict, use `% 2` to test even.
- **3.3 Order of operations and brackets:** `(2 + 3) * 4` is `20`. *Ex:* add brackets to make a line equal 20.
- **3.4 f-strings:** `f"Hi {name}"`. *Ex:* fill the blank, predict `f"{a} + {b}"`.
- **3.5 Converting types:** `int("5")`, `str(5)`, `float("2.5")`, `int(3.9)` is `3`. *Ex:* predict, fix a bug.
- **Project:** terminal calculator showing sum, difference, product and quotient.

### Unit 4: Decisions (6)
- **4.1 Comparing:** `== != < > <= >=`. *Ex:* predict `5 > 3`, spot `=` used instead of `==`.
- **4.2 `if`:** colon and indentation. *Ex:* predict, fix an IndentationError.
- **4.3 `else`:** *Ex:* predict with `age = 17`, order lines.
- **4.4 `elif`:** first match wins. *Ex:* predict for score 85, how many branches run (one).
- **4.5 `and`, `or`, `not`:** *Ex:* predict `age >= 13 and age <= 19`, match a truth table.
- **4.6 Nested decisions:** an `if` inside an `if`. *Ex:* trace a program.
- **Project:** ticket price checker (child, adult, senior).

### Unit 5: Repeating with `while` (5)
- **5.1 Why loops exist:** 3 prints versus 300. *Ex:* order a flowchart, pick tasks that need a loop.
- **5.2 The `while` loop:** `count = 1`, `while count <= 3:`, print, `count += 1`. *Ex:* predict (1 2 3), fill `count += 1`.
- **5.3 Tracing with a value table:** columns for `count`, condition, output. *Ex:* fill the table, what is `count` after the loop (4).
- **5.4 Stopping a loop:** the condition turns False. *Ex:* how many times does it run, with different starts.
- **5.5 Infinite loops:** forgetting to update the counter. *Ex:* find the loop that never ends and fix it. The app stops runaway code with a time limit.

### Unit 6: Repeating with `for` (7)
- **6.1 `for` and `range(n)`:** `range(3)` gives 0, 1, 2. *Ex:* predict, how many rounds.
- **6.2 Start, stop, step:** `range(1, 6)` gives 1 to 5, `range(0, 10, 2)` gives 0, 2, 4, 6, 8. The stop value is not included. *Ex:* predict, pick the range for 1 to 10.
- **6.3 Off-by-one:** *Ex:* which loop prints 1 to 5, spot a loop that prints 0 to 4 by mistake.
- **6.4 Looping over text:** `for ch in "Hi"` goes through each character. Lists, and looping over them, come in Unit 7. *Ex:* predict.
- **6.5 `break` and `continue`:** *Ex:* predict, which one skips a round.
- **6.6 Build it:** countdown with `range(5, 0, -1)`, times table. *Ex:* write the loop (typed).
- **6.7 `while` or `for`?** *Ex:* choose the right loop for 4 situations.
- **Project:** number guessing game using `random.randint`, `while`, `if`, `input`.

### Unit 7: Meet lists (4)
A short first look at lists, placed here so the loop units that follow can use them.
- **7.1 A list is a group of values:** `fruits = ["apple", "banana", "cherry"]`, and `print(fruits)` shows `['apple', 'banana', 'cherry']`. *Ex:* predict, spot a missing bracket or comma, pick which values are lists.
- **7.2 Positions:** counting starts at 0, so `fruits[0]` is `apple` and `fruits[2]` is `cherry`. A position that is too big gives an IndexError. *Ex:* predict, "which position holds `banana`?" (1).
- **7.3 Looping over a list:** `for fruit in fruits: print(fruit)`. *Ex:* predict the output, how many rounds (3), write the loop (typed).
- **7.4 Adding and counting:** `fruits.append("mango")` and `len(fruits)`. *Ex:* predict the list after an append, what does `len` give (4).
- **Project:** a shopping list. Ask for 3 items, store them in a list, then print them with a loop.

### Unit 8: Loops with logic and nested loops (6)
- **8.1 Counters:** *Ex:* predict how many evens.
- **8.2 Running totals:** `total = 0`, `total += x`. *Ex:* trace sum of 1 to 5 (15).
- **8.3 Biggest and smallest:** keep the best so far. *Ex:* fill a blank, trace.
- **8.4 A loop with an `if` inside:** count evens in `range(1, 11)` using `%`. *Ex:* predict, fix.
- **8.5 A loop inside a loop:** a grid, row by row, `print("*", end="")`. *Ex:* how many stars (3 rows of 4 is 12), trace table, predict output.
- **8.6 Patterns:** triangle with `print("*" * i)`. *Ex:* write code to match a picture.
- **Project:** pattern printer or grade calculator.
- Extra-large question bank with "how many times does the inner line run?" drills.

### Unit 9: Finding and fixing bugs (5)
- **9.1 Reading an error message:** the last line names the error and the line number. *Ex:* find the line, pick the error type.
- **9.2 Common errors:** SyntaxError, NameError, TypeError, IndentationError, ValueError, ZeroDivisionError. *Ex:* match each to its cause.
- **9.3 Tracing by hand, and bugs with no error:** *Ex:* trace a buggy loop and find where it goes wrong.
- **9.4 `print` debugging:** *Ex:* where would you add a `print`.
- **9.5 A debugging routine:** read, locate, predict versus actual, change one thing, test again. *Ex:* order the steps, fix 3 broken programs (typed).

### Unit 10: Functions (6)
- **10.1 Why functions:** stop repeating yourself. *Ex:* pick where a function helps.
- **10.2 `def` and calling:** defining does not run it. *Ex:* predict (nothing prints if never called), order lines.
- **10.3 Parameters:** `def greet(name)`. *Ex:* predict, fill blanks.
- **10.4 `return`:** `return` versus `print`. *Ex:* predict, spot a function that prints but returns `None`.
- **10.5 Functions using functions, and scope:** variables inside a function stay inside. *Ex:* predict, spot a scope bug.
- **10.6 Bugs inside functions:** forgot `return`, arguments in the wrong order, scope. *Ex:* find and fix (typed).
- **Project:** toolkit with `is_even`, `average`, `max_of_three`.

### Unit 11: Lists in depth (6)
Builds on Unit 7, Meet lists. Starts with a quick recap.
- **11.1 Indexes in depth:** `-1` is the last item, IndexError, lists with mixed values. *Ex:* predict `fruits[-1]`, spot an IndexError.
- **11.2 Changing lists:** `append`, `insert`, `remove`, `pop`, `len`. *Ex:* predict the list after changes.
- **11.3 Looping with positions:** `range(len(list))` when you need the position. The simple `for item in list` loop is from Unit 7. *Ex:* predict, write.
- **11.4 Searching:** `in`, `count`, `index`. *Ex:* True or False predictions.
- **11.5 Sorting and totals:** `sorted`, `.sort()`, `min`, `max`, `sum`. *Ex:* predict, write.
- **11.6 Slicing:** `nums[1:3]` stops before the end, like `range`. *Ex:* predict.

### Unit 12: Dictionaries (5)
- **12.1 Key and value:** `student = {"name": "Sam", "age": 15}`, `student["name"]`. *Ex:* predict, fill in.
- **12.2 Adding, changing, removing:** includes KeyError. *Ex:* predict, fix.
- **12.3 Looping over a dictionary:** keys and `.items()`. *Ex:* predict.
- **12.4 Lists of dictionaries:** find a student in a list. *Ex:* trace, write (typed).
- **12.5 What JSON looks like:** like a dictionary but text with double quotes. *Ex:* match a dictionary to its JSON, spot invalid JSON (single quotes, trailing comma).

### Unit 13: Working with text (5)
- **13.1 Length and positions:** `len("Hi")`, `word[0]`. *Ex:* predict.
- **13.2 Text methods:** `upper`, `lower`, `strip`, `title`. Text cannot be changed in place, methods give back new text. *Ex:* predict, spot a bug where the result is not saved.
- **13.3 Slicing text:** `word[0:3]`. *Ex:* predict.
- **13.4 Searching and replacing:** `in`, `find`, `replace`. *Ex:* predict `"cat" in "concatenate"` (True).
- **13.5 Split, join and cleaning input:** `" sam ".strip().title()`. *Ex:* predict, write a cleaner (typed).

### Unit 14: Files and saving data (5)
- **14.1 Reading a file:** `with open("notes.txt") as f:`. *Ex:* predict.
- **14.2 Writing a file:** `"w"` replaces, `"a"` adds. *Ex:* which mode keeps the old content.
- **14.3 Saving a list:** one item per line, remove the newline when reading back. *Ex:* order, fix.
- **14.4 Missing files:** FileNotFoundError, first look at `try` and `except`. *Ex:* fix a crash.
- **14.5 A to-do list that remembers:** guided build. *Ex:* order steps, write load and save functions.
- **Project:** a to-do list that is still there next time.
- Caveat: code run inside the app may use a pretend in-memory file system, not the real disk. Lessons must say so.

### Unit 15: Objects and classes (5)
- **15.1 Why classes:** keep data and actions together. *Ex:* pick what should be a class.
- **15.2 A class and an object:** `class Book:` and creating one. *Ex:* predict.
- **15.3 Attributes and `__init__`:** `self.title`, with `self` explained simply. *Ex:* predict, fill in.
- **15.4 Methods:** `def describe(self)`. *Ex:* predict, write.
- **15.5 Many objects:** a list of `Book` objects (leads into Store and manage data). *Ex:* predict, trace.

### Unit 16: Capstone (3)
- **16.1 Plan it:** break a project into steps. *Ex:* order the steps.
- **16.2 Build the core:** guided build in small steps.
- **16.3 Finish and extend it yourself:** text adventure or quiz with saved scores. Then the **final exam** (about 20 questions) and a completion screen.

### Loops ladder (why Units 5, 6 and 8 exist)
Loops are the hardest topic for beginners (feedback: syntax, logic and nested loops are all hard). So loops get 3 units (5, 6 and 8), with the short Meet lists unit (7) between them so loops over lists feel natural. One new idea per lesson: while first, then for with range, then counters, totals, `if` inside, nested loops. Step-through tables in every lesson, off-by-one drills, hints before answers, loop questions return in review. The Java course later teaches the `for (int i = 0; i < n; i++)` line as four colored parts, then the whole line.

### Open items for Python
1. Done: a short "Meet lists" unit (Unit 7) was added after Unit 6, and the old Lists unit is now "Lists in depth" (Unit 11).
2. `random.randint`, `print(..., end="")` and `import` get a one-line note where first used.
3. Verify every code sample and output by running it.

---

## 5. Course: Reading and checking code

For the "understand code" goal. Best started after Python Unit 9, deeper after Unit 12. Taught in Python first, later also in Java and Kotlin. Exercises are mostly read-only: "what does this do?", "find the problem", "what happens if the input is empty?", "safe or unsafe?".

### Unit R1: Reading unfamiliar code (5)
- **R1.1 Start with the big picture:** file name, imports, function names before the details. *Ex:* "what is this file probably for?"
- **R1.2 Find where it starts:** the entry point. *Ex:* tap the first line that runs.
- **R1.3 Follow one function:** what goes in, what comes out. *Ex:* pick the description, predict the return value.
- **R1.4 Follow one piece of data:** where a value is created, changed and used. *Ex:* tap every line that changes `total`.
- **R1.5 Names and comments versus what code really does:** a comment or name can be wrong. *Ex:* find the line where the comment lies.

### Unit R2: Spotting common problems (7)
- **R2.1 Edge cases:** empty list, zero, negative, very large, very long text. *Ex:* "what happens if the list is empty?"
- **R2.2 Off-by-one and wrong comparisons:** `<` versus `<=`, `==` versus `=`. *Ex:* find the line.
- **R2.3 Missing error handling:** missing file, bad input, no connection. *Ex:* which line can crash and why.
- **R2.4 Data loss:** overwriting a file, saving after a change instead of before, deleting without asking. *Ex:* which line loses data.
- **R2.5 Secrets in code:** passwords and keys written in the file. *Ex:* spot the secret, pick the safer place.
- **R2.6 Trusting user input:** building a file path or command from what a user typed. *Ex:* safe or unsafe.
- **R2.7 Slow or wasteful code:** a loop inside a loop, repeating the same work. *Ex:* pick the slower version.

### Unit R3: Checking a change (4)
- **R3.1 What a diff is:** old versus new. *Ex:* read a small diff.
- **R3.2 Reading `+` and `-` lines:** *Ex:* "what did this change do?"
- **R3.3 Questions to ask about any change:** what did it touch, what could break, is it tested. *Ex:* match the question to the risk.
- **R3.4 What a test is:** a small program that checks another program. *Ex:* read a simple test, "what does it prove and not prove?"

### Unit R4: Your review checklist (3)
- **R4.1 Code you did not write:** from a teammate, a tutorial or an AI tool. Never assume it is right, check it. *Ex:* find the hidden problem.
- **R4.2 Build your own checklist:** edge cases, errors, data loss, secrets, input, tests.
- **R4.3 Capstone:** review a 40-line program, list the problems, rank them.

---

## 6. Course: Store and manage data

The library example: add a book, it appears in the list, delete it, and it is still there next time. Starts after Python Unit 14 or 15.

### Unit D1: Data in memory (5)
- **D1.1 Data needs a home:** a list of dictionaries as records. *Ex:* predict, match record to data.
- **D1.2 Create:** add a book with input checks. *Ex:* order steps, fix.
- **D1.3 Read:** show the list nicely formatted. *Ex:* predict output, write.
- **D1.4 Update:** find a record and change it. *Ex:* trace, write.
- **D1.5 Delete:** remove with a confirmation. *Ex:* spot an index bug after removing.
- **Project:** in-memory library menu using `while`, `input`, a list.

### Unit D2: Making data last (5)
- **D2.1 Save to a file:** why, and a JSON file. *Ex:* predict file content.
- **D2.2 Load at start:** `json.load`, handle a missing file. *Ex:* fix a crash.
- **D2.3 Save safely:** write to a temporary file, then replace, so a crash does not corrupt data. Backups. *Ex:* order steps, find the risky line.
- **D2.4 Unique IDs:** why a title is not a good key. *Ex:* spot the duplicate problem.
- **D2.5 Check input:** empty title, duplicates, bad numbers. *Ex:* find the missing check.
- **Project:** a library that remembers.

### Unit D3: Databases (6)
- **D3.1 Why a database:** versus a file. *Ex:* pick the right choice for 4 cases.
- **D3.2 Tables, rows, columns:** *Ex:* match.
- **D3.3 `SELECT`:** *Ex:* predict the result.
- **D3.4 `INSERT`, `UPDATE`, `DELETE`:** *Ex:* predict the table after, spot a missing `WHERE`.
- **D3.5 `WHERE` and `ORDER BY`:** *Ex:* write a query (typed).
- **D3.6 Python with SQLite:** *Ex:* order steps, fix a bug.
- **Project:** the library on SQLite.

### Unit D4: How a data app is shaped (3)
- **D4.1 Keep data separate from the screen:** a data layer. *Ex:* sort functions into groups.
- **D4.2 Searching and filtering:** *Ex:* write (typed).
- **D4.3 Capstone:** a library app with add, delete, list and search that is still there after closing.

---

## 7. Course: Build a window app (GUI)

Teaches what a window app is and how buttons make code run. Draft uses Python's tkinter. The Java version (Swing or JavaFX) would follow the same units.

Limit: a real window cannot open inside a browser-style view. If the app is native, a real window could. Otherwise lessons teach with a drawn preview of the window, label-the-parts pictures, and "what happens when I click?" exercises.

### Unit G1: Windows and widgets (6)
- **G1.1 What a GUI is:** the title bar, minimize, resize and close. *Ex:* label the parts of a window picture.
- **G1.2 Make a window:** `tk.Tk()` and `mainloop()`. *Ex:* order the code, find the bug (forgot `mainloop`, nothing appears).
- **G1.3 Labels:** *Ex:* predict the window preview.
- **G1.4 Buttons:** a button runs a function with `command`. *Ex:* "what happens on click?", spot the bug (called the function with `()` so it ran immediately).
- **G1.5 Text entry:** reading what the user typed. *Ex:* predict, fill.
- **G1.6 Layout:** `pack` and `grid`. *Ex:* match code to layout picture.

### Unit G2: Events and logic (6)
- **G2.1 Events:** a click, a key press. *Ex:* match event to action.
- **G2.2 A button runs a function:** *Ex:* trace.
- **G2.3 Reading and changing widgets:** `entry.get()`, changing a label. *Ex:* predict, write.
- **G2.4 Lists on screen:** a listbox that shows data. *Ex:* predict, fix.
- **G2.5 Message boxes and input checks:** *Ex:* find the missing check.
- **G2.6 Keeping state:** variables that outlive one click. *Ex:* spot a bug where a counter resets.

### Unit G3: A real app (4)
- **G3.1 Sketch the window first:** *Ex:* match sketch to widgets.
- **G3.2 Connect to data:** the library from the data course. *Ex:* order steps.
- **G3.3 Add and delete from the window:** *Ex:* write, fix.
- **G3.4 Capstone:** the library as a window app that remembers.

---

## 8. Later courses (not drafted)

- **Java:** the same core ideas, plus the full `for (int i = 0; i < n; i++)` form, types, classes. Read-and-predict heavy because Java cannot easily run inside the app.
- **Kotlin:** Android apps, read-and-predict.
- **JavaScript and TypeScript, HTML and CSS:** run natively in the browser view with a live preview.
- **Rust, C#:** read-and-predict.
- **SQL:** may be folded into the Store and manage data course.
- **Tools:** terminal, Git and GitHub, JSON and YAML.

## 9. Open decisions

1. Done: the "Meet lists" unit was added after Unit 6.
2. Which course to write in full next.
3. Platform (browser, Tauri, native, Android) and app name.
4. Mascot and visual style.
5. Whether real GUI windows can run inside the app.
