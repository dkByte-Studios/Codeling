# Python, Unit 5: Repeating with while

Why this unit is slow on purpose: loops are the hardest topic for most beginners. Every lesson adds one new idea, uses a trace table, and keeps programs tiny.

Format notes: same as Units 1 to 4, plus two new block types for the checker. A `trace` block with a `table` block shows the value of the named variables each time the numbered line is about to run, then a final row after the program ends. A `forever` block is a program that never ends.

---

## Lesson 5.1: Why loops exist

**Teach**
Say you want to show Hi three times. You could write three lines. But what if you wanted 300? Or 3000?

A loop repeats instructions for you. You write the steps once, and say how long to keep repeating.

A loop always does the same three things:
1. Check: should I keep going?
2. If yes, do the steps once.
3. Go back to step 1.

When the check says no, the loop ends and the program moves on.

Here is a real loop. Do not worry about how it works yet, the next lesson explains every part.

```python
count = 0
while count < 3:
    print("Hi")
    count = count + 1
```
```output
Hi
Hi
Hi
```

**1. Pick one**
Which job is best done with a loop?
- A) Add two numbers
- B) Store a name
- C) Show the numbers 1 to 100
- D) Say hello once
Answer: C
Why: Showing 100 numbers means doing nearly the same thing 100 times. That is what loops are for.

**2. Put in order**
Here are the steps of a loop for "keep stirring until the soup is hot". Put them in the order a loop uses.
Pieces: `Stir once`, `Is the soup hot? If yes, stop`, `Go back and ask again`
Correct order:
1. Is the soup hot? If yes, stop
2. Stir once
3. Go back and ask again
Why: A loop checks first, then does the steps, then goes back to check again.

**3. True or false**
A loop runs its steps only once.
Answer: False
Why: A loop goes back and repeats the steps until the check says to stop.

**4. Pick one**
What makes a loop stop?
- A) The computer gets tired
- B) The check says to stop
- C) Nothing, loops never stop
- D) A comment
Answer: B
Why: Before every round, the loop checks. When the check says no, the loop ends.

**5. Pick one**
A recipe says "stir 5 times". How many times does the stirring step repeat?
- A) 5
- B) 6
- C) 1
- D) 4
Answer: A
Why: The step repeats 5 times and then you move on.

**6. Pick one**
How many `print` lines would you write to show Hi 300 times without a loop?
- A) 30
- B) 300
- C) 1
- D) 3
Answer: B
Why: That is why loops exist. With a loop you write the line once.

**Recap**
A loop repeats steps. It checks, does the steps, then goes back to check, until the check says stop.

---

## Lesson 5.2: The while loop

**Teach**
`while` is the first loop you will learn. It keeps repeating as long as a condition is True.

```python
count = 1
while count <= 3:
    print(count)
    count += 1
```
```output
1
2
3
```

Take it apart:
- `count = 1` is the starting value.
- `while count <= 3:` is the check. It ends with a colon, like `if`.
- The indented lines are the steps that repeat.
- `count += 1` adds 1 to count. It is short for `count = count + 1`.

Without a change like `count += 1`, the check would never become False.

**1. Predict the output**
```python
count = 1
while count <= 3:
    print(count)
    count += 1
```
```output
1
2
3
```
- A) 1, 2, 3 (three lines)
- B) 1, 2, 3, 4 (four lines)
- C) Nothing is shown
- D) 3 only
Answer: A
Why: count starts at 1. While it is 3 or less, it is shown and then goes up by 1. When count becomes 4, the check is False and the loop stops.

**2. Predict the output**
```python
count = 5
while count <= 7:
    print(count)
    count += 1
```
```output
5
6
7
```
- A) 5, 6 (two lines)
- B) 1, 2, 3, 4, 5, 6, 7
- C) 7 only
- D) 5, 6, 7 (three lines)
Answer: D
Why: The loop starts wherever count starts. It runs for 5, 6 and 7, and stops when count is 8.

**3. Fill the blank**
Which adds 1 to count?
`count ___ 1`
- A) +
- B) =+
- C) ++
- D) +=
Answer: D
Why: `+=` adds to the variable itself. Python has no `++`.

**4. Predict the output**
Look carefully at the check.
```python
count = 0
while count < 3:
    print(count)
    count += 1
```
```output
0
1
2
```
- A) 0, 1, 2, 3 (four lines)
- B) 0, 1, 2 (three lines)
- C) 3 only
- D) 1, 2, 3 (three lines)
Answer: B
Why: `< 3` is False once count is 3, so 3 is never shown.

**5. Put in order**
Put the lines in the right order to show 1, 2, 3.
Pieces: `    print(count)`, `count = 1`, `    count += 1`, `while count <= 3:`
Correct order:
1. `count = 1`
2. `while count <= 3:`
3. `    print(count)`
4. `    count += 1`
Why: Set the start, then the check, then the steps that repeat.

**6. Predict the output**
After the loop, what does the last line show?
```python
n = 0
while n < 4:
    n += 1
print(n)
```
```output
4
```
- A) 5
- B) 4
- C) 3
- D) 0
Answer: B
Why: n goes 0, 1, 2, 3, 4. When n becomes 4, the check n < 4 is False, so the loop ends with n holding 4.

**7. Write it yourself**
Use a while loop to show the numbers 1 to 5, one per line.
Accepted: the program prints 1, 2, 3, 4, 5, each on its own line.
```python
count = 1
while count <= 5:
    print(count)
    count += 1
```
```output
1
2
3
4
5
```
Hint: start at 1, check `<= 5`, and add 1 each time.

**Recap**
`while condition:` repeats the indented lines as long as the condition is True. Something inside must change so it eventually becomes False.

---

## Lesson 5.3: Tracing with a value table

**Teach**
When a loop does not behave, slow down and trace it. A trace table writes down the value of each variable, round by round, like a computer would.

```python
count = 1
while count <= 3:
    print(count)
    count += 1
```
```output
1
2
3
```

| Round | count at the start | Check count <= 3 | Shows |
|---|---|---|---|
| 1 | 1 | True | 1 |
| 2 | 2 | True | 2 |
| 3 | 3 | True | 3 |
| end | 4 | False | stop |

After the loop, count is 4. The loop stopped because the check was False.

In the app, the step-through view fills this table in for you as the code runs.

**1. Fill in the table**
Fill in count each time the print line is about to run, then after the loop ends.
```trace line=3 vars=count
count = 2
while count < 5:
    print(count * 10)
    count += 1
```
```table
count=2
count=3
count=4
final count=5
```
Why: count starts at 2 and goes up by 1. When it reaches 5 the check `count < 5` is False, so the loop ends with count at 5.

**2. Predict the output**
Same program, now with the outputs.
```python
count = 2
while count < 5:
    print(count * 10)
    count += 1
```
```output
20
30
40
```
- A) 20, 30, 40, 50 (four lines)
- B) 20, 30, 40 (three lines)
- C) 2, 3, 4 (three lines)
- D) 10, 20, 30 (three lines)
Answer: B
Why: The print shows count times 10, and count is 2, 3, 4.

**3. Fill in the table**
A running total. Fill in n and total each time the `total += n` line is about to run, then after the loop ends.
```trace line=4 vars=n,total
n = 1
total = 0
while n <= 4:
    total += n
    n += 1
print(total)
```
```table
n=1 total=0
n=2 total=1
n=3 total=3
n=4 total=6
final n=5 total=10
```
Why: Each round adds n to total. 0 + 1 is 1, 1 + 2 is 3, 3 + 3 is 6, 6 + 4 is 10.

**4. Predict the output**
```python
n = 1
total = 0
while n <= 4:
    total += n
    n += 1
print(total)
```
```output
10
```
- A) 4
- B) 10
- C) 15
- D) 6
Answer: B
Why: 1 + 2 + 3 + 4 is 10.

**5. Pick one**
A student says this loop shows 1, 2, 3 and 4. Are they right?
```python
count = 1
while count < 4:
    print(count)
    count += 1
```
```output
1
2
3
```
- A) No, it shows 2 to 4
- B) Yes, it shows 1 to 4
- C) No, it shows nothing
- D) No, it shows 1 to 3
Answer: D
Why: `count < 4` is False when count is 4, so 4 is never shown. Tracing the table makes this obvious.

**6. Write it yourself**
Use a while loop to add the numbers 1 to 5, and show only the final total.
Accepted: the program prints `15`.
```python
n = 1
total = 0
while n <= 5:
    total += n
    n += 1
print(total)
```
```output
15
```
Hint: it is just like the running total above.

**Recap**
A trace table records each variable round by round. It shows exactly why a loop stops.

---

## Lesson 5.4: Stopping a loop

**Teach**
A while loop stops when its condition becomes False. That means something inside the loop has to push the condition toward False.

Counting down is a good example:

```python
count = 3
while count > 0:
    print(count)
    count -= 1
print("Go!")
```
```output
3
2
1
Go!
```

Two useful facts:
- The last line is not indented, so it is not part of the loop. It runs once, after the loop ends.
- If the condition is False the very first time, the loop runs zero times.

**1. Predict the output**
```python
count = 3
while count > 0:
    print(count)
    count -= 1
print("Go!")
```
```output
3
2
1
Go!
```
- A) 1, 2, 3, Go!
- B) Go! only
- C) 3, 2, 1, 0, Go!
- D) 3, 2, 1, Go!
Answer: D
Why: count goes down 3, 2, 1 and shows each. At 0 the check `count > 0` is False. Go! runs once, after.

**2. Predict the output**
```python
n = 10
while n < 5:
    print("hi")
    n += 1
```
```output
```
- A) hi five times
- B) Nothing is shown
- C) An error
- D) hi once
Answer: B
Why: The check is False right at the start, so the loop body never runs.

**3. Predict the output**
```python
n = 0
while n < 4:
    n += 1
    print("tick")
```
```output
tick
tick
tick
tick
```
- A) tick 4 times
- B) tick once
- C) tick 5 times
- D) tick 3 times
Answer: A
Why: n goes from 0 to 4 in steps of 1. The body runs for n = 0, 1, 2 and 3, which is four rounds.

**4. Predict the output**
```python
n = 10
while n > 0:
    print(n)
    n -= 3
```
```output
10
7
4
1
```
- A) 10, 7, 4, 1, -2
- B) 10, 7, 4, 1
- C) 10, 7, 4
- D) 10, 7, 4, 1, 0
Answer: B
Why: After 1, n becomes -2. The check `n > 0` is False, so -2 is never shown.

**5. Pick one**
Why does this loop stop?
```
count = 1
while count <= 3:
    print(count)
    count += 1
```
- A) The print runs out of numbers
- B) count reaches 4, so `count <= 3` becomes False
- C) The computer decides to stop
- D) It never stops
Answer: B
Why: Every round adds 1 to count. When count is 4, the check is False.

**6. Write it yourself**
Count down from 5 to 1, then show Liftoff!
Accepted: the program prints 5, 4, 3, 2, 1, then Liftoff!, each on its own line.
```python
count = 5
while count > 0:
    print(count)
    count -= 1
print("Liftoff!")
```
```output
5
4
3
2
1
Liftoff!
```
Hint: the last print is not indented.

**Recap**
A loop stops when its condition turns False. Code that is not indented runs after the loop. A loop can run zero times.

---

## Lesson 5.5: Infinite loops

**Teach**
What if the condition never becomes False? Then the loop never stops. It is called an infinite loop.

```forever
count = 1
while count <= 3:
    print(count)
```

Here count never changes, so `count <= 3` is always True. The program keeps showing 1 forever.

Do not panic if this happens. The Codeling run button has a Stop button, and the app also stops code that runs too long. Then check that something inside the loop changes the condition.

The fix is to add the missing step:

```python
count = 1
while count <= 3:
    print(count)
    count += 1
```
```output
1
2
3
```

Watch out for indentation too. A step outside the loop does not help:

```forever
count = 1
while count <= 3:
    print(count)
count += 1
```

The last line is not indented, so it is not part of the loop. It would only run after the loop ends, which never happens.

**1. Pick one**
Why does this loop never end?
```
count = 1
while count <= 3:
    print(count)
```
- A) The 3 is too small
- B) count never changes, so the check is always True
- C) The loop is too short
- D) The print line is wrong
Answer: B
Why: Nothing inside the loop moves count toward 4.

**2. Pick one**
Which change stops the loop from running forever?
```
count = 1
while count <= 3:
    print(count)
```
- A) Add `count += 1` after the loop, not indented
- B) Remove the print
- C) Change 3 to 30
- D) Add `count += 1` inside the loop, indented
Answer: D
Why: The update has to be inside the loop, so it runs every round.

**3. Pick one**
Why does this loop never end?
```
count = 1
while count <= 3:
    print(count)
count += 1
```
- A) The colon is missing
- B) print is spelled wrong
- C) `count += 1` is not indented, so it is outside the loop
- D) It does end
Answer: C
Why: The loop body is only the indented lines. count never changes inside it.

**4. True or false**
`while True:` repeats forever unless something stops it.
Answer: True
Why: True is always True, so the check never fails. The next unit shows how `break` stops a loop from inside.

**5. Pick one**
Your program keeps filling the screen. What is the best first move?
- A) Run it again and again
- B) Add more print lines
- C) Close the app
- D) Press Stop, then check that something inside the loop changes the condition
Answer: D
Why: The loop is probably infinite. Stop it, then look for the missing update.

**6. Fix it yourself**
This program never ends. Fix it so it shows 1, 2, 3.
Starter:
```
count = 1
while count <= 3:
    print(count)
```
Accepted: the program prints 1, 2, 3, each on its own line.
```python
count = 1
while count <= 3:
    print(count)
    count += 1
```
```output
1
2
3
```

Hint: Something inside the loop must change count, or the check never fails. Add it as an indented line.

**Recap**
An infinite loop never stops. Fix it by making sure something inside the loop changes the condition, and that the update is indented.

---

## Unit 5 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10. This unit has a larger bank because loops are the hardest topic.

**Q1 (5.1)** What does a loop do?
- A) Deletes code
- B) Runs a program backwards
- C) Repeats steps until a check says stop
- D) Shows an error
Answer: C

**Q2 (5.1)** True or false: a loop checks first, then does the steps, then goes back to check.
Answer: True

**Q3 (5.2)** What does this show?
```python
n = 1
while n <= 2:
    print(n)
    n += 1
```
```output
1
2
```
- A) 1, 2, 3 (three lines)
- B) 1, 2 (two lines)
- C) 2 only
- D) Nothing is shown
Answer: B

**Q4 (5.2)** What does this show?
```python
n = 4
while n <= 6:
    print(n)
    n += 1
```
```output
4
5
6
```
- A) 4, 5, 6 (three lines)
- B) Nothing is shown
- C) 6 only
- D) 1 to 6 (six lines)
Answer: A

**Q5 (5.2)** What does `n += 1` do?
- A) Checks if n is 1
- B) Sets n to 1
- C) Adds 1 to n
- D) Shows n
Answer: C

**Q6 (5.2)** What does this show?
```python
n = 0
while n < 3:
    n += 1
print(n)
```
```output
3
```
- A) 3
- B) 2
- C) 4
- D) 0
Answer: A

**Q7 (5.2)** What does this show?
```python
n = 1
while n < 3:
    print(n)
    n += 1
```
```output
1
2
```
- A) 1, 2 (two lines)
- B) 1, 2, 3 (three lines)
- C) 3 only
- D) Nothing is shown
Answer: A

**Q8 (5.3)** What is `total` after this loop?
```python
n = 1
total = 0
while n <= 3:
    total += n
    n += 1
print(total)
```
```output
6
```
- A) 6
- B) 1
- C) 3
- D) 9
Answer: A

**Q9 (5.3)** After this loop, what does the last line show?
```python
n = 1
while n <= 5:
    n += 2
print(n)
```
```output
7
```
- A) 9
- B) 7
- C) 6
- D) 5
Answer: B

**Q10 (5.3)** Fill in n each time the print line is about to run, then after the loop ends.
```trace line=3 vars=n
n = 3
while n < 6:
    print(n)
    n += 1
```
```table
n=3
n=4
n=5
final n=6
```

**Q11 (5.3)** What is the total after each round?
```trace line=4 vars=n,total
n = 1
total = 0
while n <= 3:
    total += n
    n += 1
```
```table
n=1 total=0
n=2 total=1
n=3 total=3
final n=4 total=6
```

**Q12 (5.4)** What does this show?
```python
n = 2
while n > 0:
    print(n)
    n -= 1
print("Done")
```
```output
2
1
Done
```
- A) Done only
- B) 2, 1, Done
- C) 1, 2, Done
- D) 2, 1, 0, Done
Answer: B

**Q13 (5.4)** How many times does this loop run?
```python
n = 5
while n < 5:
    print("x")
    n += 1
```
```output
```
- A) 5
- B) 1
- C) 0
- D) 4
Answer: C

**Q14 (5.4)** What does this show?
```python
n = 1
while n <= 10:
    print(n)
    n += 4
```
```output
1
5
9
```
- A) Nothing is shown
- B) 1, 5, 9 (three lines)
- C) 1, 5, 9, 13 (four lines)
- D) 1 to 10 (ten lines)
Answer: B

**Q15 (5.4)** True or false: code that is not indented after a while loop runs on every round.
Answer: False
Why: Only the indented lines repeat. A line that is not indented runs once, after the loop ends.

**Q16 (5.5)** Which program never ends?
- A) `n = 0` then `while n < 2:` then `n += 1`
- B) `n = 5` then `while n > 0:` then `n -= 1`
- C) `n = 1` then `while n < 5:` then `n += 1`
- D) `n = 1` then `while n < 5:` then `print(n)` with no change to n
Answer: D

**Q17 (5.5)** Which fix stops the loop from running forever?
```
n = 1
while n <= 3:
    print(n)
```
- A) Add `n += 1` not indented after the loop
- B) Change the colon to a semicolon
- C) Delete the print
- D) Add `n += 1` indented inside the loop
Answer: D

**Q18 (5.5)** An infinite loop is running. What do you press first?
- A) Nothing
- B) Stop
- C) Delete
- D) Enter
Answer: B

**Q19 (mixed)** What does this show?
```python
n = 3
while n >= 1:
    print(n * 2)
    n -= 1
```
```output
6
4
2
```
- A) 6, 4, 2, 0 (four lines)
- B) 6, 4, 2 (three lines)
- C) 3, 2, 1 (three lines)
- D) 2, 4, 6 (three lines)
Answer: B

**Q20 (mixed)** How many times does `print("go")` run?
```python
n = 0
while n < 5:
    print("go")
    n += 1
```
```output
go
go
go
go
go
```
- A) 6
- B) 0
- C) 4
- D) 5
Answer: D

**Q21 (5.2)** What does this show?
```python
n = 1
while n < 4:
    print(n)
    n += 1
```
```output
1
2
3
```
- A) 1, 2, 3, 4 (four lines)
- B) Nothing is shown
- C) 1, 2, 3 (three lines)
- D) 4 only
Answer: C

**Q22 (5.2)** What does the last line show?
```python
n = 10
while n > 5:
    n -= 2
print(n)
```
```output
4
```
- A) 5
- B) 4
- C) 6
- D) 2
Answer: B

**Q23 (5.3)** Fill in n each time the print line is about to run, then after the loop.
```trace line=3 vars=n
n = 5
while n < 8:
    print(n)
    n += 1
```
```table
n=5
n=6
n=7
final n=8
```

**Q24 (5.4)** How many times does this loop run?
```python
n = 3
while n > 0:
    print("x")
    n -= 1
```
```output
x
x
x
```
- A) 0
- B) 3
- C) 2
- D) 4
Answer: B

**Q25 (5.5)** A while loop never ends. What is the most likely cause?
- A) The print line is missing
- B) Nothing inside the loop changes the condition
- C) The loop has too few lines
- D) The condition uses a number
Answer: B

Note: this bank has 25 questions.
