# Python, Unit 4: Decisions

Format notes: same as Units 1 to 3. An `output` block that is empty means "the program shows nothing".

---

## Lesson 4.1: Comparing

**Teach**
A program often needs to ask a question about a value. A comparison asks it, and the answer is always `True` or `False`.

| Symbol | Asks |
|---|---|
| `==` | is it equal to? |
| `!=` | is it NOT equal to? |
| `<` | is it less than? |
| `>` | is it greater than? |
| `<=` | is it less than or equal to? |
| `>=` | is it greater than or equal to? |

```python
print(5 > 3)
print(5 == 5)
print(5 != 5)
```
```output
True
True
False
```

Watch out: one `=` stores a value in a variable. Two `==` asks if two things are equal. Text must match exactly, including capitals.

**1. Predict the output**
```python
print(5 > 3)
```
```output
True
```
- A) False
- B) An error
- C) True
- D) 5
Answer: C
Why: 5 is greater than 3, so the answer is True.

**2. Predict the output**
```python
print(2 > 7)
```
```output
False
```
- A) False
- B) 2
- C) True
- D) An error
Answer: A
Why: 2 is not greater than 7.

**3. Predict the output**
```python
print(4 == 4)
```
```output
True
```
- A) An error
- B) True
- C) 4
- D) False
Answer: B
Why: == asks if both sides are equal. They are.

**4. Pick one**
Which line checks whether x is equal to 10?
- A) `x = 10`
- B) `x => 10`
- C) `x === 10`
- D) `x == 10`
Answer: D
Why: A single = stores a value. Two == check if values are equal.

**5. Predict the output**
```python
age = 12
print(age >= 13)
```
```output
False
```
- A) True
- B) False
- C) An error
- D) 12
Answer: B
Why: 12 is not greater than or equal to 13.

**6. Predict the output**
```python
print("cat" == "Cat")
```
```output
False
```
- A) cat
- B) An error
- C) True
- D) False
Answer: D
Why: Capitals matter. "cat" and "Cat" are different text.

**7. Write it yourself**
Write one line that shows whether 7 is greater than 5.
Accepted: the program prints `True`.
```python
print(7 > 5)
```
```output
True
```

Hint: Put the comparison, `7 > 5`, inside print. Python works out the answer.

**Recap**
Comparisons give True or False. `=` stores, `==` checks.

---

## Lesson 4.2: if

**Teach**
`if` lets your program choose. It runs some lines only when a condition is True.

```python
age = 15
if age >= 13:
    print("You are a teenager")
```
```output
You are a teenager
```

Two things to get right:
- The `if` line ends with a colon `:`.
- The lines that belong to the `if` are indented, pushed in by 4 spaces.

If the condition is False, Python skips the indented lines.

**1. Predict the output**
```python
age = 15
if age >= 13:
    print("You are a teenager")
```
```output
You are a teenager
```
- A) An error
- B) Nothing is shown
- C) 15
- D) You are a teenager
Answer: D
Why: 15 is at least 13, so the condition is True and the indented line runs.

**2. Predict the output**
```python
age = 10
if age >= 13:
    print("You are a teenager")
```
```output
```
- A) You are a teenager
- B) Nothing is shown
- C) 10
- D) An error
Answer: B
Why: 10 is less than 13, so the condition is False. Python skips the indented line.

**3. Fix the bug**
This gives an IndentationError. What is wrong?
```error IndentationError
if 5 > 3:
print("Yes")
```
- A) 5 > 3 is not allowed
- B) The colon is missing
- C) Yes needs no quotes
- D) The print line is not indented
Answer: D
Why: The line that belongs to the if must be pushed in by 4 spaces.

**4. Predict the output**
```python
x = 5
if x > 10:
    print("big")
print("done")
```
```output
done
```
- A) done
- B) Nothing is shown
- C) big then done
- D) big
Answer: A
Why: x is not greater than 10, so big is skipped. The last line is not indented, so it is not part of the if and always runs.

**5. Fill the blank**
Which goes at the end of the if line?
`if x > 3___`
- A) ;
- B) .
- C) then
- D) :
Answer: D
Why: In Python, the if line ends with a colon.

**6. Put in order**
Put the lines in the right order so the program shows Big.
Pieces: `    print("Big")`, `x = 8`, `if x > 5:`
Correct order:
1. `x = 8`
2. `if x > 5:`
3. `    print("Big")`
Why: The variable must exist first, then the if, then the indented line that belongs to it.

**7. Write it yourself**
Write an if that shows Welcome when age is at least 13.
Starter:
```
age = 14
```
Accepted: the program prints `Welcome`.
```python
age = 14
if age >= 13:
    print("Welcome")
```
```output
Welcome
```
Hint: do not forget the colon and the indent.

**Recap**
`if condition:` followed by indented lines runs those lines only when the condition is True.

---

## Lesson 4.3: else

**Teach**
`else` is the other choice. It runs when the `if` condition is False.

```python
age = 10
if age >= 13:
    print("Teen")
else:
    print("Kid")
```
```output
Kid
```

Exactly one of the two blocks runs, never both and never neither. `else` has a colon too, and no condition.

A good use of `%`: check even or odd.

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

**1. Predict the output**
```python
age = 10
if age >= 13:
    print("Teen")
else:
    print("Kid")
```
```output
Kid
```
- A) Kid
- B) Nothing is shown
- C) Teen
- D) Teen then Kid
Answer: A
Why: 10 is less than 13, so the if block is skipped and the else block runs.

**2. Predict the output**
```python
age = 13
if age >= 13:
    print("Teen")
else:
    print("Kid")
```
```output
Teen
```
- A) Kid
- B) Teen then Kid
- C) An error
- D) Teen
Answer: D
Why: >= includes 13 itself, so the condition is True.

**3. Predict the output**
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
- A) 1
- B) An error
- C) odd
- D) even
Answer: C
Why: 7 % 2 is 1, which is not 0, so the else block runs.

**4. Pick one**
In an if and else, how many of the two blocks run each time?
- A) Both
- B) It depends on the day
- C) Exactly one
- D) Neither
Answer: C
Why: If the condition is True the if block runs. If not, the else block runs.

**5. Put in order**
Put the lines in the right order.
Pieces: `else:`, `    print("Kid")`, `if age >= 13:`, `    print("Teen")`, `age = 10`
Correct order:
1. `age = 10`
2. `if age >= 13:`
3. `    print("Teen")`
4. `else:`
5. `    print("Kid")`
Why: The else always comes after the if block it belongs to.

**6. Fix the bug**
This gives a SyntaxError. What is wrong?
```error SyntaxError
x = 3
if x > 5:
    print("big")
else x <= 5:
    print("small")
```
- A) 5 should be 3
- B) There are too many lines
- C) The word print is wrong
- D) else must not have a condition
Answer: D
Why: else is just `else:`. It runs when the if condition is False, so it needs no condition of its own.

**7. Write it yourself**
Show Even if n is even, and Odd if not.
Starter:
```
n = 4
```
Accepted: with n = 4 the program prints `Even`, and with n = 7 it prints `Odd`.
```python
n = 4
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```
```output
Even
```
```python
n = 7
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```
```output
Odd
```

Hint: Use `n % 2 == 0` as the condition. The else part handles the odd numbers.

**Recap**
`else:` runs when the if condition is False. Exactly one block runs.

---

## Lesson 4.4: elif

**Teach**
What if there are more than two choices? Use `elif`, short for "else if". You can have as many as you like.

```python
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("Try again")
```
```output
B
```

Python checks from the top. The first condition that is True wins, and the rest are skipped. So put the strictest check first.

**1. Predict the output**
```python
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("Try again")
```
```output
B
```
- A) B
- B) A
- C) C
- D) Try again
Answer: A
Why: 85 is not at least 90, but it is at least 80, so B runs and the rest are skipped.

**2. Predict the output**
```python
score = 95
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("Try again")
```
```output
A
```
- A) B
- B) A
- C) Try again
- D) A then B
Answer: B
Why: The first condition is True, so A runs and Python skips the elif.

**3. Predict the output**
```python
score = 50
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("Try again")
```
```output
Try again
```
- A) A
- B) Nothing is shown
- C) B
- D) Try again
Answer: D
Why: No condition is True, so the else block runs.

**4. Pick one**
In an if, elif, else chain, how many blocks run?
- A) All of them
- B) Every True one
- C) Only the last one
- D) Only the first one whose condition is True
Answer: D
Why: Python stops at the first match and skips everything after it.

**5. Predict the output**
Look carefully at the order.
```python
score = 95
if score >= 70:
    print("C")
elif score >= 90:
    print("A")
```
```output
C
```
- A) A
- B) Nothing is shown
- C) C
- D) C then A
Answer: C
Why: 95 is at least 70, so the first condition is True and wins. The elif is never checked. Put the strictest check first.

**6. Pick one**
You want: under 13 is child, under 20 is teen, anything else is adult. Which order of checks is right?
- A) Check under 13 first, then under 20, then else
- B) Check under 20 first, then under 13, then else
- C) The order does not matter
- D) Check else first
Answer: A
Why: A 10 year old is under 20 too, so if you checked under 20 first they would be called a teen.

**7. Write it yourself**
Show Child if age is under 13, Teen if under 20, and Adult otherwise.
Starter:
```
age = 8
```
Accepted: age 8 prints `Child`, age 15 prints `Teen`, age 30 prints `Adult`.
```python
age = 8
if age < 13:
    print("Child")
elif age < 20:
    print("Teen")
else:
    print("Adult")
```
```output
Child
```
```python
age = 15
if age < 13:
    print("Child")
elif age < 20:
    print("Teen")
else:
    print("Adult")
```
```output
Teen
```
```python
age = 30
if age < 13:
    print("Child")
elif age < 20:
    print("Teen")
else:
    print("Adult")
```
```output
Adult
```

Hint: Check the smallest group first with if. Then use elif for the next one, and else for the rest.

**Recap**
`elif` adds more choices. Python takes the first True one, so order matters.

---

## Lesson 4.5: and, or, not

**Teach**
You can combine questions.

- `and`: True only if both sides are True.
- `or`: True if at least one side is True.
- `not`: flips True to False and False to True.

```python
age = 15
print(age >= 13 and age <= 19)
print(age < 5 or age > 60)
print(not (age > 20))
```
```output
True
False
True
```

You can use these inside `if` too: `if age >= 13 and age <= 19:`.

**1. Predict the output**
```python
print(True and False)
```
```output
False
```
- A) False
- B) Both
- C) An error
- D) True
Answer: A
Why: and needs both sides to be True. One is False, so the answer is False.

**2. Predict the output**
```python
print(True or False)
```
```output
True
```
- A) False
- B) Both
- C) An error
- D) True
Answer: D
Why: or only needs one side to be True.

**3. Predict the output**
```python
print(not True)
```
```output
False
```
- A) not
- B) False
- C) An error
- D) True
Answer: B
Why: not flips True into False.

**4. Predict the output**
```python
age = 15
print(age >= 13 and age <= 19)
```
```output
True
```
- A) False
- B) 15
- C) True
- D) An error
Answer: C
Why: 15 is at least 13, and 15 is at most 19. Both sides are True.

**5. Predict the output**
```python
x = 5
print(x < 3 or x > 4)
```
```output
True
```
- A) True
- B) 5
- C) An error
- D) False
Answer: A
Why: x < 3 is False, but x > 4 is True. With or, one True is enough.

**6. Match**
Match each word to what it does.
- `and`: both sides must be True
- `or`: at least one side must be True
- `not`: flips True and False
Why: These three build bigger questions out of small ones.

**7. Write it yourself**
Show True when age is from 13 to 19, counting both 13 and 19. Otherwise show False.
Starter:
```
age = 15
```
Accepted: ages 13 and 19 print `True`. Ages 12 and 20 print `False`.
```python
age = 13
print(age >= 13 and age <= 19)
```
```output
True
```
```python
age = 19
print(age >= 13 and age <= 19)
```
```output
True
```
```python
age = 12
print(age >= 13 and age <= 19)
```
```output
False
```
```python
age = 20
print(age >= 13 and age <= 19)
```
```output
False
```
Hint: both checks must be True together.

**Recap**
`and`, `or` and `not` combine questions. Use them to check ranges and several conditions at once.

---

## Lesson 4.6: Nested decisions

**Teach**
You can put an `if` inside another `if`. The inside one is only checked when the outside one is True. Each level is indented further.

```python
age = 15
has_ticket = True
if age >= 13:
    if has_ticket:
        print("Welcome")
    else:
        print("Buy a ticket")
else:
    print("Too young")
```
```output
Welcome
```

Read it like a flowchart: first the age is checked. Only if that passes does Python check the ticket.

**1. Predict the output**
Age 15, has a ticket.
```python
age = 15
has_ticket = True
if age >= 13:
    if has_ticket:
        print("Welcome")
    else:
        print("Buy a ticket")
else:
    print("Too young")
```
```output
Welcome
```
- A) Nothing is shown
- B) Buy a ticket
- C) Welcome
- D) Too young
Answer: C
Why: The age check passes. Then has_ticket is True, so Welcome runs.

**2. Predict the output**
Age 15, no ticket.
```python
age = 15
has_ticket = False
if age >= 13:
    if has_ticket:
        print("Welcome")
    else:
        print("Buy a ticket")
else:
    print("Too young")
```
```output
Buy a ticket
```
- A) Nothing is shown
- B) Welcome
- C) Too young
- D) Buy a ticket
Answer: D
Why: The age check passes, but has_ticket is False, so the inner else runs.

**3. Predict the output**
Age 10, has a ticket.
```python
age = 10
has_ticket = True
if age >= 13:
    if has_ticket:
        print("Welcome")
    else:
        print("Buy a ticket")
else:
    print("Too young")
```
```output
Too young
```
- A) Nothing is shown
- B) Too young
- C) Welcome
- D) Buy a ticket
Answer: B
Why: The age check fails, so Python goes to the outer else. It never looks at the ticket.

**4. Pick one**
When age is 10 in the program above, does Python check has_ticket?
- A) Yes
- B) No
Answer: B
Why: The inner if is inside the age check. If the outer if is False, everything inside it is skipped.

**5. Predict the output**
```python
x = 6
if x > 5:
    print("big")
    if x > 10:
        print("huge")
print("done")
```
```output
big
done
```
- A) big then done
- B) Nothing is shown
- C) big, huge, then done
- D) done
Answer: A
Why: x is above 5, so big shows. x is not above 10, so huge is skipped. The last line is not indented, so it always runs.

**6. Pick one**
Which line checks "age at least 13 AND has a ticket" in a single if?
- A) `if (age >= 13)(has_ticket):`
- B) `if age >= 13 or has_ticket:`
- C) `if age >= 13 and has_ticket:`
- D) `if age >= 13, has_ticket:`
Answer: C
Why: and needs both parts to be True. You can use it instead of a nested if when you only need a Welcome or not.

**7. Mini review**
Which is easier to read for the same job: two nested ifs, or one if with `and`?
Answer: One if with `and`, when you only need yes or no. Nested ifs are better when each level has its own different result, like Welcome, Buy a ticket and Too young above.

**Recap**
An if inside an if is only checked when the outer one is True. Indentation shows which level a line belongs to.

---

## Unit 4 project: A ticket price checker

**Goal**
Ask for an age, then show the ticket price:
- Under 5: price 0
- Under 13: price 5
- Under 65: price 10
- Otherwise: price 7

The program shows `Price: ` followed by the price.

**Guided steps**
1. Ask for the age and turn it into a whole number.
2. Check the youngest group first with `if age < 5:` and store `price = 0`.
3. Add `elif` lines for under 13 and under 65.
4. Finish with `else:` for the senior price.
5. After the chain, show the price with an f-string.

**Accepted**
```python inputs=3
age = int(input("Age? "))
if age < 5:
    price = 0
elif age < 13:
    price = 5
elif age < 65:
    price = 10
else:
    price = 7
print(f"Price: {price}")
```
```output
Price: 0
```
```python inputs=10
age = int(input("Age? "))
if age < 5:
    price = 0
elif age < 13:
    price = 5
elif age < 65:
    price = 10
else:
    price = 7
print(f"Price: {price}")
```
```output
Price: 5
```
```python inputs=30
age = int(input("Age? "))
if age < 5:
    price = 0
elif age < 13:
    price = 5
elif age < 65:
    price = 10
else:
    price = 7
print(f"Price: {price}")
```
```output
Price: 10
```
```python inputs=70
age = int(input("Age? "))
if age < 5:
    price = 0
elif age < 13:
    price = 5
elif age < 65:
    price = 10
else:
    price = 7
print(f"Price: {price}")
```
```output
Price: 7
```
Edge ages to also test in the real checker: 5 gives `Price: 5`, 13 gives `Price: 10`, 65 gives `Price: 7`.
```python inputs=5
age = int(input("Age? "))
if age < 5:
    price = 0
elif age < 13:
    price = 5
elif age < 65:
    price = 10
else:
    price = 7
print(f"Price: {price}")
```
```output
Price: 5
```
```python inputs=13
age = int(input("Age? "))
if age < 5:
    price = 0
elif age < 13:
    price = 5
elif age < 65:
    price = 10
else:
    price = 7
print(f"Price: {price}")
```
```output
Price: 10
```
```python inputs=65
age = int(input("Age? "))
if age < 5:
    price = 0
elif age < 13:
    price = 5
elif age < 65:
    price = 10
else:
    price = 7
print(f"Price: {price}")
```
```output
Price: 7
```

**Recap**
You used input, int, if, elif, else and an f-string to build a real decision program.

---

## Unit 4 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (4.1)** What does this show?
```python
print(3 < 5)
```
```output
True
```
- A) False
- B) An error
- C) True
- D) 3
Answer: C

**Q2 (4.1)** What does this show?
```python
print(7 == 8)
```
```output
False
```
- A) True
- B) 7
- C) An error
- D) False
Answer: D

**Q3 (4.1)** What does this show?
```python
print(7 != 8)
```
```output
True
```
- A) False
- B) An error
- C) True
- D) 7
Answer: C

**Q4 (4.1)** What does this show?
```python
print(6 >= 6)
```
```output
True
```
- A) An error
- B) 6
- C) False
- D) True
Answer: D

**Q5 (4.1)** Which symbol checks if two values are equal?
- A) ==
- B) =>
- C) =
- D) !=
Answer: A

**Q6 (4.2)** What does this show?
```python
x = 5
if x > 3:
    print("yes")
```
```output
yes
```
- A) An error
- B) Nothing is shown
- C) 5
- D) yes
Answer: D

**Q7 (4.2)** What does this show?
```python
x = 1
if x > 3:
    print("yes")
print("end")
```
```output
end
```
- A) yes
- B) end
- C) Nothing is shown
- D) yes then end
Answer: B

**Q8 (4.2)** What does the end of an if line need?
- A) A full stop .
- B) A colon :
- C) The word then
- D) A semicolon ;
Answer: B

**Q9 (4.3)** What does this show?
```python
x = 2
if x > 5:
    print("big")
else:
    print("small")
```
```output
small
```
- A) big then small
- B) small
- C) Nothing is shown
- D) big
Answer: B

**Q10 (4.3)** What does this show?
```python
n = 9
if n % 2 == 0:
    print("even")
else:
    print("odd")
```
```output
odd
```
- A) 1
- B) even
- C) odd
- D) An error
Answer: C

**Q11 (4.4)** What does this show?
```python
score = 72
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
```
```output
C
```
- A) B
- B) A
- C) C
- D) F
Answer: C

**Q12 (4.4)** In an if, elif, else chain, how many blocks run?
- A) None
- B) All of them
- C) Only the last
- D) Only the first with a True condition (or the else)
Answer: D

**Q13 (4.5)** What does this show?
```python
print(True and True)
```
```output
True
```
- A) And
- B) An error
- C) False
- D) True
Answer: D

**Q14 (4.5)** What does this show?
```python
print(False or False)
```
```output
False
```
- A) True
- B) An error
- C) Or
- D) False
Answer: D

**Q15 (4.5)** What does this show?
```python
print(not False)
```
```output
True
```
- A) True
- B) Not
- C) An error
- D) False
Answer: A

**Q16 (4.5)** What does this show?
```python
x = 10
print(x > 5 and x < 8)
```
```output
False
```
- A) 10
- B) False
- C) An error
- D) True
Answer: B

**Q17 (4.5)** What does this show?
```python
x = 10
print(x > 5 or x < 8)
```
```output
True
```
- A) False
- B) 10
- C) True
- D) An error
Answer: C

**Q18 (4.6)** What does this show?
```python
age = 20
has_ticket = False
if age >= 13:
    if has_ticket:
        print("Welcome")
    else:
        print("Buy a ticket")
else:
    print("Too young")
```
```output
Buy a ticket
```
- A) Too young
- B) Welcome
- C) Buy a ticket
- D) Nothing is shown
Answer: C

**Q19 (mixed)** What does this show?
```python
age = 13
print(age >= 13)
```
```output
True
```
- A) 13
- B) True
- C) False
- D) An error
Answer: B

**Q20 (mixed)** What does this show?
```python
print("a" == "A")
```
```output
False
```
- A) a
- B) False
- C) An error
- D) True
Answer: B

**Q21 (4.1)** What does this show?
```python
print(10 != 10)
```
```output
False
```
- A) 10
- B) An error
- C) False
- D) True
Answer: C

**Q22 (4.2)** What does this show?
```python
x = 9
if x > 5:
    print("big")
```
```output
big
```
- A) Nothing is shown
- B) 9
- C) big
- D) An error
Answer: C

**Q23 (4.3)** What does this show?
```python
age = 20
if age >= 18:
    print("adult")
else:
    print("minor")
```
```output
adult
```
- A) minor
- B) adult
- C) Nothing is shown
- D) adult then minor
Answer: B

**Q24 (4.4)** What does this show?
```python
score = 65
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("Try again")
```
```output
Try again
```
- A) C
- B) B
- C) Try again
- D) A
Answer: C

**Q25 (4.5)** What does this show?
```python
x = 4
print(x > 2 and x < 10)
```
```output
True
```
- A) 4
- B) True
- C) An error
- D) False
Answer: B

Note: this bank has 25 questions.
