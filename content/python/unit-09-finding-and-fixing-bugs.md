# Python, Unit 9: Finding and fixing bugs

This unit teaches the skill that matters most when you read or write code: finding what went wrong. It gives learners a routine they can repeat, so a bug stops feeling like a wall.

Format notes: same as Units 1 to 8. The error messages shown in the teach text are checked by the checker, including the line numbers.

---

## Lesson 9.1: Reading an error message

**Teach**
A bug is a mistake in a program. Some bugs make Python stop and show an error message. Error messages look scary, but they follow the same shape every time, and they are trying to help you.

```error NameError
total = 5
print(totl)
```

Python shows:

```
Traceback (most recent call last):
  File "main.py", line 2, in <module>
    print(totl)
          ^^^^
NameError: name 'totl' is not defined. Did you mean: 'total'?
```

There are four useful parts:
1. The line number: `line 2`. That is where Python noticed the problem.
2. The code on that line: `print(totl)`, with `^^^^` pointing at the exact spot.
3. The last line: the kind of error (`NameError`) and what went wrong.
4. Often a hint, like `Did you mean: 'total'?`. It is a good guess, not an order, so check that it makes sense.

Read the last line first. It says the kind of mistake. Then look at the line number.

The file name in the message can look different in your window. The line number and the last line are the parts that matter.

The line number is where Python noticed the problem. The real mistake is usually on that line, but can occasionally be a little earlier.

**1. Pick one**
Where should you look first in an error message?
- A) The last line, which names the kind of error
- B) Nowhere, errors cannot be understood
- C) The file name
- D) The first line
Answer: A
Why: The last line tells you what kind of mistake it is and what went wrong.

**2. Pick one**
Python says the error is on line 4. Which line of this program is that?
```error NameError
name = "Sam"
age = 12
print(name)
print(agee)
```
- A) `age = 12`
- B) `print(agee)`
- C) `print(name)`
- D) `name = "Sam"`
Answer: B
Why: Count the lines: line 1 is name, line 2 is age, line 3 is print(name), line 4 is print(agee).

**3. Pick one**
The last line says `NameError: name 'agee' is not defined`. What does it mean?
- A) The program is too long
- B) print is spelled wrong
- C) agee is a number
- D) Python does not know a name called agee, probably a typo
Answer: D
Why: NameError means Python met a name it has never seen. Here the variable was called age, so agee is a typo.

**4. Match**
Match each part of an error message to what it tells you.
- The line number: where to look
- The error type: what kind of mistake it is
- The explanation: what Python could not do
Why: Read the error type and the explanation first, then go to the line.

**5. True or false**
The line number is a good place to start looking, but the real mistake can sometimes be a little earlier.
Answer: True
Why: Python reports the line where it got confused. For example, a bracket left open on one line can show up on the next.

**6. Fix it yourself**
This program has a NameError. Fix it so it shows 5.
Starter:
```
total = 5
print(totl)
```
Accepted: the program prints `5`.
```python
total = 5
print(total)
```
```output
5
```

Hint: Compare the name in the error message with the name you created. They are spelled differently.

**7. Pick one**
What error does `print(agee)` give when agee has never been created?
- A) TypeError
- B) IndexError
- C) NameError
- D) ZeroDivisionError
Answer: C
Why: A name Python does not know gives a NameError.

**Recap**
An error message has a line number, the code on that line, and a last line naming the kind of error. Read the last line first.

---

## Lesson 9.2: Common errors

**Teach**
Seven errors cover most of what beginners meet.

| Error | What it means | Example |
|---|---|---|
| `SyntaxError` | Python cannot understand how a line is written | a missing quote, bracket or colon |
| `IndentationError` | The spaces at the start of a line are wrong | a line inside an `if` that is not indented |
| `NameError` | A name does not exist | a typo, or used before it was created |
| `TypeError` | Two values of different types do not work together | `"Age: " + 5` |
| `ValueError` | The type is right but the value is not | `int("hello")` |
| `ZeroDivisionError` | You divided by zero | `10 / 0` |
| `IndexError` | A list position does not exist | `nums[5]` in a list of 2 |

```error ZeroDivisionError
print(10 / 0)
```
Python says: `ZeroDivisionError: division by zero`.

```error ValueError
print(int("12a"))
```
Python says: `ValueError: invalid literal for int() with base 10: '12a'`.

**1. Match**
Match each error to its cause.
- `SyntaxError`: a missing quote, bracket or colon
- `IndentationError`: wrong spaces at the start of a line
- `NameError`: a name that does not exist
- `TypeError`: mixing types that do not work together
- `ValueError`: the right type, but a value that does not fit
- `ZeroDivisionError`: dividing by zero
Why: Knowing the name of the error tells you where to look.

**2. Pick one**
What error does this give?
```error ZeroDivisionError
print(10 / 0)
```
- A) ZeroDivisionError
- B) NameError
- C) TypeError
- D) ValueError
Answer: A
Why: You cannot divide by zero.

**3. Pick one**
What error does this give?
```error ValueError
print(int("hello"))
```
- A) ZeroDivisionError
- B) TypeError
- C) ValueError
- D) NameError
Answer: C
Why: int() expects text that looks like a whole number. "hello" does not.

**4. Pick one**
What error does this give?
```error SyntaxError
x = 5
if x > 3
    print("big")
```
- A) IndentationError
- B) ValueError
- C) SyntaxError
- D) NameError
Answer: C
Why: The if line is missing its colon, so Python cannot understand the line.

**5. Pick one**
What error does this give?
```error IndexError
nums = [1, 2]
print(nums[5])
```
- A) TypeError
- B) NameError
- C) ValueError
- D) IndexError
Answer: D
Why: The list has positions 0 and 1 only. There is no position 5.

**6. Pick one**
What error does this give?
```error TypeError
print("Age: " + 5)
```
- A) ValueError
- B) NameError
- C) ZeroDivisionError
- D) TypeError
Answer: D
Why: Text and a number cannot be joined with +.

**7. Pick one**
What error does this give?
```error IndentationError
x = 5
if x > 3:
print("big")
```
- A) IndentationError
- B) SyntaxError
- C) NameError
- D) TypeError
Answer: A
Why: The line that belongs to the if is not pushed in.

**Recap**
Learn the names: SyntaxError, IndentationError, NameError, TypeError, ValueError, ZeroDivisionError, IndexError. The name already tells you where to look.

---

## Lesson 9.3: Tracing by hand, and bugs with no error

**Teach**
The trickiest bugs show no error at all. The program runs fine, but the answer is wrong. This is called a logic bug, and Python cannot help, because as far as it knows you wanted exactly that.

```python
nums = [10, 20, 30]
total = 0
for n in nums:
    total = n
print(total)
```
```output
30
```

This was meant to show the total, 60. It shows 30. No error, just the wrong answer.

To find a logic bug, first say what you expected, then trace the program by hand and see where it goes differently.

```trace line=4 vars=n,total
nums = [10, 20, 30]
total = 0
for n in nums:
    total = n
print(total)
```
```table
n=10 total=0
n=20 total=10
n=30 total=20
final n=30 total=30
```

The table shows `total` is replaced each time, not added to. The bug is `total = n`. It should be `total += n`.

**1. Predict the output**
This was meant to show the total, 60. What does it really show?
```python
nums = [10, 20, 30]
total = 0
for n in nums:
    total = n
print(total)
```
```output
30
```
- A) 10
- B) 30
- C) 0
- D) 60
Answer: B
Why: `total = n` replaces total with n every round, so at the end total holds only the last number.

**2. Fill in the table**
Fill in n and total each time the `total = n` line is about to run, then after the loop.
```trace line=4 vars=n,total
nums = [10, 20, 30]
total = 0
for n in nums:
    total = n
print(total)
```
```table
n=10 total=0
n=20 total=10
n=30 total=20
final n=30 total=30
```
Why: Each round, total takes the value of n instead of adding to it.

**3. Pick one**
Which change fixes the total?
- A) Change `total = 0` to `total = 1`
- B) Remove the loop
- C) Change `total = n` to `total += n`
- D) Change `print(total)` to `print(n)`
Answer: C
Why: `total += n` adds n to the running total each round.

**4. Pick one**
A program runs with no error but shows the wrong answer. What kind of bug is it?
- A) It is not a bug
- B) A logic bug
- C) A name error
- D) A syntax error
Answer: B
Why: Python does not complain, because the code is valid. The logic is what is wrong.

**5. Predict the output**
This should show adult for anyone aged 18 or more. What does it show when age is 18?
```python
age = 18
if age > 18:
    print("adult")
```
```output
```
- A) Nothing is shown
- B) An error
- C) 18
- D) adult
Answer: A
Why: 18 is not greater than 18. The check should be `>=`.

**6. Fix it yourself**
This program should show 60, but shows 30. Fix it.
Starter:
```
nums = [10, 20, 30]
total = 0
for n in nums:
    total = n
print(total)
```
Accepted: the program prints `60`.
```python
nums = [10, 20, 30]
total = 0
for n in nums:
    total += n
print(total)
```
```output
60
```

Hint: Look at the line inside the loop that changes total. Should it replace total, or add to it?

**7. Pick one**
What is the first thing to do with a logic bug?
- A) Restart the computer
- B) Add more code
- C) Work out what the program should show, then compare it with what it does show
- D) Delete the program
Answer: C
Why: You can only find the difference if you know what you expected.

**Recap**
A logic bug runs without an error but gives a wrong answer. Say what you expected, then trace by hand to find where the program goes differently.

---

## Lesson 9.4: print debugging

**Teach**
A trace table on paper works for small programs. For anything bigger, let the program tell you. Add a `print` line that shows the values you are curious about.

```python
nums = [10, 20, 30]
total = 0
for n in nums:
    total = n
    print(f"n={n} total={total}")
print(total)
```
```output
n=10 total=10
n=20 total=20
n=30 total=30
30
```

Now you can see it: total is the same as n every time, so it is never adding. The bug is on the `total = n` line.

Good places for a debug print:
- Inside a loop, after a value changes.
- Just before the line that gives the wrong answer.

When you find the bug, remove the debug prints, or turn them into comments with `#`.

**1. Predict the output**
```python
nums = [10, 20, 30]
total = 0
for n in nums:
    total = n
    print(f"n={n} total={total}")
print(total)
```
```output
n=10 total=10
n=20 total=20
n=30 total=30
30
```
- A) An error
- B) Three debug lines, then 30
- C) Three debug lines, then 60
- D) Only 30
Answer: B
Why: The debug print runs every round and shows total equal to n. The final print shows 30.

**2. Pick one**
Where is the best place to add a print to watch `total` change each round?
- A) Inside the loop, right after total changes
- B) Anywhere, it makes no difference
- C) After the loop
- D) Before the program starts
Answer: A
Why: Inside the loop you see the value after every round.

**3. Pick one**
You added debug prints and found the bug. What should you do with the debug lines?
- A) Remove them or turn them into comments
- B) Print them twice
- C) Leave them in forever
- D) Add more
Answer: A
Why: They were only for finding the problem. Leaving them clutters the output.

**4. Pick one**
This debug output comes from a loop that should add the numbers 1, 2 and 3. What does it tell you?
```
n=1 total=1
n=2 total=2
n=3 total=3
```
- A) The loop runs too many times
- B) n is wrong
- C) total is being replaced, not added to
- D) The program is correct
Answer: C
Why: If total were adding up, it would show 1, 3 and 6.

**5. Fill the blank**
Which goes in the blank to show the value of x?
`print(f"x={___}")`
- A) print
- B) "x"
- C) x
- D) =
Answer: C
Why: Inside the braces of an f-string, the variable name is replaced by its value.

**6. Write it yourself**
Add a debug line inside the loop, after total changes, that shows n and total in the form n=2 total=2.
Starter:
```
total = 0
for n in [2, 4]:
    total += n
print(total)
```
Accepted: the program prints `n=2 total=2`, `n=4 total=6`, then `6`.
```python
total = 0
for n in [2, 4]:
    total += n
    print(f"n={n} total={total}")
print(total)
```
```output
n=2 total=2
n=4 total=6
6
```

Hint: Put the new print inside the loop, after `total += n`. An f-string can show both values.

**7. True or false**
Print debugging is only for experts.
Answer: False
Why: Everyone uses it, including experts. It is the simplest way to see what a program is doing.

**Recap**
Add `print(f"...")` lines to see values as the program runs. Put them where a value changes, and remove them when the bug is fixed.

---

## Lesson 9.5: A debugging routine

**Teach**
Having a routine makes bugs feel smaller. Here is one you can use on any program.

1. **Read:** if there is an error, read the last line and the line number.
2. **Predict:** say what the program should show.
3. **Compare:** run it and see what it shows.
4. **Locate:** trace by hand or add a print to find the first place where things go differently.
5. **Change one thing:** fix only the thing you found.
6. **Run again:** check it. If it is still wrong, go back to step 2.

Changing only one thing at a time matters. If you change three things and the bug disappears, you will not know which change fixed it, and you may have added new problems.

One more thing: when you fix one bug and a different error appears, that is progress. Often the first bug was hiding the second.

**1. Put in order**
Put the steps of the routine in order.
Pieces: `Change one thing`, `Compare what it shows with what it should show`, `Run again`, `Read the error message`, `Locate the first place things go wrong`, `Predict what it should show`
Correct order:
1. Read the error message
2. Predict what it should show
3. Compare what it shows with what it should show
4. Locate the first place things go wrong
5. Change one thing
6. Run again
Why: Understand the problem before you change anything.

**2. Pick one**
Why change only one thing at a time?
- A) So you know which change fixed the problem
- B) To save time typing
- C) Because Python only allows one change
- D) It makes no difference
Answer: A
Why: Several changes at once make it impossible to tell what worked, and they can add new bugs.

**3. Fix it yourself**
This program has a NameError. Fix it so it shows Hello, Sam.
Starter:
```
name = "Sam"
print("Hello, " + nme)
```
Accepted: the program prints `Hello, Sam`.
```python
name = "Sam"
print("Hello, " + name)
```
```output
Hello, Sam
```

Hint: Read the last line of the error. Which name is spelled differently from the variable you made?

**4. Fix it yourself**
This should show the average, 4.0, but shows something else. Fix it.
Starter:
```
nums = [2, 4, 6]
total = 0
for n in nums:
    total += n
print(total / 2)
```
Accepted: the program prints `4.0`.
```python
nums = [2, 4, 6]
total = 0
for n in nums:
    total += n
print(total / len(nums))
```
```output
4.0
```

Hint: The program always divides by 2. What should it divide by instead?

**5. Fix it yourself**
This has a TypeError. Fix it so it shows Age: 12.
Starter:
```
age = 12
print("Age: " + age)
```
Accepted: the program prints `Age: 12`.
```python
age = 12
print(f"Age: {age}")
```
```output
Age: 12
```

Hint: A number cannot be joined to text with +. An f-string puts it in for you.

**6. True or false**
Getting an error means your program is broken forever.
Answer: False
Why: An error is a message about one specific problem. Fix it and run again.

**7. Pick one**
You fix one bug and a new error appears. What does that usually mean?
- A) The first bug was hiding a second one, so keep going
- B) Python is broken
- C) You made things worse
- D) You should start over
Answer: A
Why: Python stops at the first problem it finds. Once that is fixed, it can reach the next one.

**Recap**
Read, predict, compare, locate, change one thing, run again. A new error after a fix is progress.

---

## Unit 9 project: Bug hunt

**Goal**
Three programs each have one bug. Use the routine to find and fix each. Each fix is a small change.

**Program 1.** It should show Hello, Sam. It has a NameError.
```error NameError
name = "Sam"
print("Hello, " + nme)
```
Fixed:
```python
name = "Sam"
print("Hello, " + name)
```
```output
Hello, Sam
```

**Program 2.** It should show the total of the numbers 1 to 4, which is 10. It shows 6, with no error. This is a logic bug.
Buggy:
```python
total = 0
for n in range(1, 4):
    total += n
print(total)
```
```output
6
```
Fixed:
```python
total = 0
for n in range(1, 5):
    total += n
print(total)
```
```output
10
```
Hint: the stop value of a range is not included.

**Program 3.** It should show odd. It has a SyntaxError.
```error SyntaxError
n = 7
if n % 2 == 0
    print("even")
else:
    print("odd")
```
Fixed:
```python
n = 7
if n % 2 == 0:
    print("even")
else:
    print("odd")
```
```output
odd
```

**Recap**
You found a typo with NameError, an off-by-one with no error at all, and a missing colon with SyntaxError. Different bugs, the same routine.

---

## Unit 9 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (9.1)** Where do you read first in an error message?
- A) The first line
- B) The file name
- C) You do not
- D) The last line
Answer: D

**Q2 (9.1)** Python reports an error on line 3. Which line is that?
```error NameError
a = 5
b = 6
print(c)
```
- A) `b = 6`
- B) None of them
- C) `print(c)`
- D) `a = 5`
Answer: C

**Q3 (9.1)** What does `NameError: name 'c' is not defined` mean?
- A) print is wrong
- B) Python does not know a name called c
- C) c is a list
- D) c is too big
Answer: B

**Q4 (9.2)** What error does this give?
```error ZeroDivisionError
print(5 / 0)
```
- A) ZeroDivisionError
- B) IndexError
- C) NameError
- D) TypeError
Answer: A

**Q5 (9.2)** What error does this give?
```error ValueError
print(int("x1"))
```
- A) SyntaxError
- B) TypeError
- C) ValueError
- D) NameError
Answer: C

**Q6 (9.2)** What error does this give?
```error TypeError
print("a" + 1)
```
- A) TypeError
- B) ValueError
- C) IndexError
- D) NameError
Answer: A

**Q7 (9.2)** What error does this give?
```error IndexError
items = ["a"]
print(items[2])
```
- A) IndexError
- B) ValueError
- C) NameError
- D) TypeError
Answer: A

**Q8 (9.2)** What error does this give?
```error SyntaxError
print("hi)
```
- A) IndentationError
- B) SyntaxError
- C) NameError
- D) TypeError
Answer: B

**Q9 (9.2)** What error does this give?
```error IndentationError
for i in range(2):
print(i)
```
- A) ValueError
- B) SyntaxError
- C) NameError
- D) IndentationError
Answer: D

**Q10 (9.3)** A program runs but shows the wrong answer, with no error message. What is it?
- A) A logic bug
- B) Not a bug
- C) A NameError
- D) A SyntaxError
Answer: A

**Q11 (9.3)** This should show 6 (1 + 2 + 3). What does it show?
```python
total = 0
for n in [1, 2, 3]:
    total = n
print(total)
```
```output
3
```
- A) 0
- B) 6
- C) 3
- D) 1
Answer: C

**Q12 (9.3)** Fill in n and total each time the `total = n` line is about to run, then after the loop.
```trace line=3 vars=n,total
total = 0
for n in [1, 2, 3]:
    total = n
```
```table
n=1 total=0
n=2 total=1
n=3 total=2
final n=3 total=3
```

**Q13 (9.3)** What does this show when age is 18?
```python
age = 18
if age > 18:
    print("adult")
```
```output
```
- A) adult
- B) 18
- C) An error
- D) Nothing is shown
Answer: D

**Q14 (9.3)** Which change makes 18 count as an adult?
- A) Change `18` to `19`
- B) Change `if` to `else`
- C) Change `>` to `>=`
- D) Remove the print
Answer: C

**Q15 (9.4)** What is print debugging?
- A) Deleting all prints
- B) A kind of error
- C) Adding print lines to see values while the program runs
- D) Printing the program on paper
Answer: C

**Q16 (9.4)** Where is a good place to add a debug print for a loop total?
- A) Nowhere
- B) Inside the loop, after the total changes
- C) Before the program
- D) At the very end only
Answer: B

**Q17 (9.5)** What is the first step of the routine?
- A) Read the error message
- B) Restart
- C) Change the code
- D) Delete the program
Answer: A

**Q18 (9.5)** Why change only one thing at a time?
- A) So you know what fixed the problem
- B) Python requires it
- C) To save paper
- D) It does not matter
Answer: A

**Q19 (9.5)** You fix one bug and a new error appears. What does that usually mean?
- A) The first bug was hiding a second one
- B) You should start over
- C) The new error is not real
- D) You broke Python
Answer: A

**Q20 (mixed)** True or false: everyone gets errors, including experts.
Answer: True

**Q21 (9.1)** What does the line number in an error message tell you?
- A) Which Python version you use
- B) Where Python noticed the problem
- C) How many errors there are
- D) How long the program ran
Answer: B

**Q22 (9.2)** What error does this give?
```error ZeroDivisionError
print(10 % 0)
```
- A) NameError
- B) TypeError
- C) ValueError
- D) ZeroDivisionError
Answer: D

**Q23 (9.2)** What error does this give?
```error NameError
name = "Sam"
print(Name)
```
- A) TypeError
- B) NameError
- C) KeyError
- D) ValueError
Answer: B

**Q24 (9.3)** This was meant to add up the numbers and show 6. What does it show?
```python
total = 0
for n in [2, 4]:
    total = total + 1
print(total)
```
```output
2
```
- A) 6
- B) 2
- C) 4
- D) 0
Answer: B

**Q25 (9.5)** After you read the error message, what comes next in the debugging routine?
- A) Delete the program
- B) Change three things at once
- C) Run it again without changing anything
- D) Predict what the program should show
Answer: D

Note: this bank has 25 questions.
