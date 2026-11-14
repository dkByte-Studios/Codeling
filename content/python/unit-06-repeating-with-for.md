# Python, Unit 6: Repeating with for

Format notes: same as Unit 5. This unit introduces `for` after `while`, so learners already know what a loop is. One new idea per lesson. The unit ends with a guessing game that uses `while`, `if`, `input` and `random`.

---

## Lesson 6.1: for and range(n)

**Teach**
A `while` loop repeats until a condition fails. A `for` loop repeats a set number of times, and it counts for you.

```python
for i in range(3):
    print(i)
```
```output
0
1
2
```

Take it apart:
- `range(3)` makes the numbers 0, 1, 2. That is 3 numbers, and it starts at 0.
- `i` is a variable the loop sets for you. It holds the current number. You can pick any name, `i` is just common.
- Indented lines run once for each number.

Here is the trace table:

```trace line=2 vars=i
for i in range(3):
    print(i)
```
```table
i=0
i=1
i=2
final i=2
```

No `count = 0` and no `count += 1`. The `for` loop does that part itself.

**1. Predict the output**
```python
for i in range(3):
    print(i)
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
Why: range(3) makes three numbers starting at 0.

**2. Predict the output**
```python
for i in range(5):
    print(i)
```
```output
0
1
2
3
4
```
- A) 0 to 5 (six lines)
- B) 1 to 5 (five lines)
- C) 0 to 4 (five lines)
- D) 5 only
Answer: C
Why: range(5) gives 5 numbers, from 0 up to 4.

**3. Predict the output**
```python
for i in range(4):
    print("Hi")
```
```output
Hi
Hi
Hi
Hi
```
- A) Hi 3 times
- B) Hi 4 times
- C) Hi 5 times
- D) 0, 1, 2, 3
Answer: B
Why: The loop runs once for each number in range(4), which is four numbers. The body never uses i, so it just shows Hi.

**4. Fill the blank**
Which word makes the numbers?
`for i in ___(3):`
- A) repeat
- B) range
- C) numbers
- D) count
Answer: B
Why: range() makes a sequence of numbers.

**5. Fill in the table**
Fill in i each time the print line is about to run, then after the loop.
```trace line=2 vars=i
for i in range(4):
    print(i * 2)
```
```table
i=0
i=1
i=2
i=3
final i=3
```
Why: i takes the values 0, 1, 2, 3. After the last round, i still holds 3.

**6. Predict the output**
```python
for i in range(4):
    print(i * 2)
```
```output
0
2
4
6
```
- A) 2, 4, 6, 8
- B) 4 only
- C) 0, 2, 4, 6, 8
- D) 0, 2, 4, 6
Answer: D
Why: The print shows i times 2, and i is 0, 1, 2, 3.

**7. Write it yourself**
Use a for loop to show Hi four times.
Accepted: the program prints Hi on four lines.
```python
for i in range(4):
    print("Hi")
```
```output
Hi
Hi
Hi
Hi
```

Hint: Use `range(4)` for four rounds. The body can just print Hi.

**Recap**
`for i in range(n):` repeats n times. i counts for you, starting at 0.

---

## Lesson 6.2: Start, stop and step

**Teach**
`range` can take more than one number.

- `range(stop)`: from 0 up to, but not including, stop.
- `range(start, stop)`: from start up to, but not including, stop.
- `range(start, stop, step)`: the same, but jumping by step each time.

```python
for i in range(1, 6):
    print(i)
```
```output
1
2
3
4
5
```

The stop number is never included. `range(1, 6)` stops before 6.

```python
for i in range(0, 10, 2):
    print(i)
```
```output
0
2
4
6
8
```

A negative step counts down: `range(5, 0, -1)` gives 5, 4, 3, 2, 1.

**1. Predict the output**
```python
for i in range(1, 4):
    print(i)
```
```output
1
2
3
```
- A) 1, 2, 3 (three lines)
- B) 4 only
- C) 0, 1, 2, 3 (four lines)
- D) 1, 2, 3, 4 (four lines)
Answer: A
Why: It starts at 1 and stops before 4.

**2. Predict the output**
```python
for i in range(2, 10, 3):
    print(i)
```
```output
2
5
8
```
- A) 2, 5, 8 (three lines)
- B) 3, 6, 9 (three lines)
- C) 2, 3, 4, 5, 6, 7, 8, 9 (eight lines)
- D) 2, 5, 8, 11 (four lines)
Answer: A
Why: It starts at 2 and adds 3 each time: 2, 5, 8. The next would be 11, which is past the stop.

**3. Pick one**
Which range shows the numbers 1 to 10?
- A) `range(10)`
- B) `range(1, 10)`
- C) `range(0, 10)`
- D) `range(1, 11)`
Answer: D
Why: The stop number is not included. To include 10, the stop must be 11.

**4. Predict the output**
```python
for i in range(10, 0, -3):
    print(i)
```
```output
10
7
4
1
```
- A) 7, 4, 1 (three lines)
- B) 10, 7, 4 (three lines)
- C) 10, 7, 4, 1 (four lines)
- D) 10, 7, 4, 1, 0 (five lines)
Answer: C
Why: It starts at 10 and goes down by 3 each time. 1 is the last number above 0, so 0 is not included.

**5. Predict the output**
```python
for i in range(0, 20, 5):
    print(i)
```
```output
0
5
10
15
```
- A) 0, 5, 10, 15, 20 (five lines)
- B) 0, 5, 10, 15 (four lines)
- C) 20 only
- D) 5, 10, 15, 20 (four lines)
Answer: B
Why: The stop is 20, and it is never included, so the last number is 15.

**6. Pick one**
How many numbers does `range(3, 8)` make?
- A) 4
- B) 5
- C) 8
- D) 3
Answer: B
Why: It makes 3, 4, 5, 6, 7. That is 8 minus 3, which is 5 numbers.

**7. Write it yourself**
Use a for loop to show 2, 4, 6, 8, 10, each on its own line.
Accepted: the program prints 2, 4, 6, 8, 10.
```python
for i in range(2, 11, 2):
    print(i)
```
```output
2
4
6
8
10
```
Hint: start at 2, step by 2, and stop at 11.

**Recap**
`range(start, stop, step)`. Start is included, stop is not, and step is how far to jump.

---

## Lesson 6.3: Off by one

**Teach**
The most common loop mistake is being off by one: running one time too many or too few. It happens because `range` stops before the stop number, and because counting can start at 0 or 1.

Compare:

```python
for i in range(5):
    print(i)
```
```output
0
1
2
3
4
```

```python
for i in range(1, 6):
    print(i)
```
```output
1
2
3
4
5
```

Both run five times. But the first shows 0 to 4, and the second shows 1 to 5.

Handy checks:
- The number of rounds is stop minus start (when the step is 1).
- To end on a number N, make the stop N + 1.

With `while`, you often use `<=` to include the last number. With `range`, you add 1 to the stop.

**1. Pick one**
Which loop shows 1, 2, 3, 4, 5?
- A) `for i in range(1, 5):`
- B) `for i in range(5):`
- C) `for i in range(0, 6):`
- D) `for i in range(1, 6):`
Answer: D
Why: `range(5)` shows 0 to 4. `range(1, 5)` shows 1 to 4. `range(0, 6)` shows 0 to 5. Only `range(1, 6)` shows 1 to 5.

**2. Predict the output**
```python
for i in range(1, 5):
    print(i)
```
```output
1
2
3
4
```
- A) 1, 2, 3, 4, 5 (five lines)
- B) 1, 2, 3, 4 (four lines)
- C) 5 only
- D) 0, 1, 2, 3, 4 (five lines)
Answer: B
Why: The stop is 5, and it is never included.

**3. Fix the bug**
This should show 1, 2, 3 but shows 0, 1, 2. What is the fix?
```python
for i in range(3):
    print(i)
```
```output
0
1
2
```
- A) Change it to `range(0, 3)`
- B) Change it to `range(4)`
- C) Change it to `range(1, 3)`
- D) Change it to `range(1, 4)`
Answer: D
Why: To start at 1 and end at 3, the start is 1 and the stop is 4.

**4. Pick one**
How many times does this loop run?
`for i in range(2, 7):`
- A) 7
- B) 6
- C) 5
- D) 4
Answer: C
Why: 7 minus 2 is 5. It runs for 2, 3, 4, 5, 6.

**5. Predict the output**
Another way to count from 1.
```python
for i in range(3):
    print(i + 1)
```
```output
1
2
3
```
- A) 0, 1, 2 (three lines)
- B) 1, 2, 3 (three lines)
- C) 2, 3, 4 (three lines)
- D) 1, 2, 3, 4 (four lines)
Answer: B
Why: i is 0, 1, 2, and the print shows i plus 1.

**6. Pick one**
To count up to and including 10, what should the stop be?
- A) 10
- B) 11
- C) 100
- D) 9
Answer: B
Why: The stop number is not included, so use one more than the last number you want.

**7. Write it yourself**
Use a for loop to show the numbers 1 to 7.
Accepted: the program prints 1, 2, 3, 4, 5, 6, 7, each on its own line.
```python
for i in range(1, 8):
    print(i)
```
```output
1
2
3
4
5
6
7
```

Hint: The stop value is never included. Which stop value makes 7 the last number?

**Recap**
Off by one comes from the stop number not being included and from starting at 0. Check: rounds equals stop minus start.

---

## Lesson 6.4: Looping over text

**Teach**
A `for` loop can also go through text, one character at a time.

```python
for letter in "cat":
    print(letter)
```
```output
c
a
t
```

`letter` is a name you choose. In each round it holds the next character. The loop runs once per character, so "cat" runs 3 times. Spaces and punctuation count as characters too.

You can also use a variable:

```python
word = "Hi!"
for ch in word:
    print(ch)
```
```output
H
i
!
```

**1. Predict the output**
```python
for letter in "cat":
    print(letter)
```
```output
c
a
t
```
- A) c, a, t (three lines)
- B) cat (one line)
- C) t, a, c (three lines)
- D) 3
Answer: A
Why: The loop goes through the text one character at a time, in order.

**2. Pick one**
How many times does this loop run?
`for ch in "hello":`
- A) 5
- B) 4
- C) 1
- D) 6
Answer: A
Why: "hello" has five characters, so the loop runs five times.

**3. Predict the output**
```python
for ch in "Hi!":
    print(ch)
```
```output
H
i
!
```
- A) Hi! (one line)
- B) H, i, ! (three lines)
- C) 3
- D) H, i (two lines)
Answer: B
Why: The exclamation mark is a character too.

**4. Predict the output**
Remember that text times a number repeats the text.
```python
for ch in "ab":
    print(ch * 2)
```
```output
aa
bb
```
- A) aabb (one line)
- B) aa, bb (two lines)
- C) a, b, a, b (four lines)
- D) ab, ab (two lines)
Answer: B
Why: In round one ch is "a", so ch * 2 is "aa". In round two ch is "b", so it is "bb".

**5. Pick one**
Which is a valid name for the loop variable?
`for ___ in "cat":`
- A) my letter
- B) letter
- C) for
- D) 2nd
Answer: B
Why: It follows the same naming rules as any variable: letters, numbers and underscores, not starting with a number, no spaces, and not a Python word like for.

**6. True or false**
A for loop over text runs once for each character.
Answer: True
Why: That includes spaces and punctuation.

**7. Write it yourself**
Show each letter of "Sam" on its own line.
Accepted: the program prints S, a, m, each on its own line.
```python
for letter in "Sam":
    print(letter)
```
```output
S
a
m
```

Hint: A for loop can go through the letters of text. Put "Sam" after the word in.

**Recap**
`for ch in text:` goes through the text one character at a time. It runs once per character.

---

## Lesson 6.5: break and continue

**Teach**
Sometimes you want to change what a loop does while it is running.

- `break` stops the whole loop right away.
- `continue` skips the rest of this round and jumps to the next one.

```python
for i in range(1, 10):
    if i == 4:
        break
    print(i)
```
```output
1
2
3
```

When i reaches 4, `break` ends the loop, so 4 is never shown.

```python
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
```
```output
1
2
4
5
```

When i is 3, `continue` skips the print and goes to the next round.

**1. Predict the output**
```python
for i in range(1, 10):
    if i == 4:
        break
    print(i)
```
```output
1
2
3
```
- A) 1 to 9 (nine lines)
- B) 1, 2, 3 (three lines)
- C) 1, 2, 3, 4 (four lines)
- D) 4 only
Answer: B
Why: When i is 4, break ends the loop before the print.

**2. Predict the output**
```python
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
```
```output
1
2
4
5
```
- A) 3 only
- B) 1, 2, 3, 4, 5 (five lines)
- C) 1, 2, 4, 5 (four lines)
- D) 1, 2 (two lines)
Answer: C
Why: When i is 3, continue skips that round's print, but the loop keeps going.

**3. Pick one**
Which one skips only the current round, and keeps looping?
- A) break
- B) skip
- C) stop
- D) continue
Answer: D
Why: continue jumps to the next round. break ends the whole loop.

**4. Predict the output**
```python
for i in range(5):
    if i == 2:
        break
    print(i)
```
```output
0
1
```
- A) 0, 1, 2, 3, 4 (five lines)
- B) 0, 1, 2 (three lines)
- C) 0, 1 (two lines)
- D) 2 only
Answer: C
Why: When i is 2, break stops the loop before the print.

**5. Predict the output**
```python
for i in range(1, 4):
    if i == 2:
        continue
    print(i)
```
```output
1
3
```
- A) 1, 3 (two lines)
- B) 2 only
- C) 1, 2, 3 (three lines)
- D) 1 only
Answer: A
Why: The round with i equal to 2 is skipped.

**6. Fill the blank**
Which word stops the loop completely?
```
for i in range(10):
    if i == 5:
        ___
```
- A) stop
- B) break
- C) continue
- D) end
Answer: B
Why: break ends the loop.

**7. Write it yourself**
Show the numbers from 1 up to 10, but stop the loop when you reach 6, so 6 is not shown.
Accepted: the program prints 1, 2, 3, 4, 5.
```python
for i in range(1, 11):
    if i == 6:
        break
    print(i)
```
```output
1
2
3
4
5
```

Hint: Loop with `range(1, 11)`. Inside, check `if i == 6:` and use break before the print.

**Recap**
`break` stops the loop. `continue` skips to the next round.

---

## Lesson 6.6: Build it

**Teach**
Time to put loops to work. Two classics.

A countdown:

```python
for i in range(5, 0, -1):
    print(i)
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

A times table, using an f-string:

```python
for i in range(1, 6):
    print(f"3 x {i} = {3 * i}")
```
```output
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15
```

**1. Predict the output**
```python
for i in range(1, 4):
    print(f"2 x {i} = {2 * i}")
```
```output
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
```
- A) An error
- B) 2 x 1 = 2, 2 x 2 = 4, 2 x 3 = 6 (three lines)
- C) 2 x 1 = 2 only
- D) 2 x 4 = 8
Answer: B
Why: i is 1, 2, 3, and each round shows two times i.

**2. Put in order**
Put the lines in the right order for a countdown from 3.
Pieces: `print("Go!")`, `    print(i)`, `for i in range(3, 0, -1):`
Correct order:
1. `for i in range(3, 0, -1):`
2. `    print(i)`
3. `print("Go!")`
Why: The loop line comes first, then the indented steps, then the line that runs once after the loop.

**3. Predict the output**
```python
for i in range(1, 5):
    print(i * i)
```
```output
1
4
9
16
```
- A) 1, 2, 3, 4 (four lines)
- B) 16 only
- C) 1, 4, 9, 16 (four lines)
- D) 2, 4, 6, 8 (four lines)
Answer: C
Why: i times i is the square of i: 1, 4, 9, 16.

**4. Predict the output**
Text times a number repeats the text.
```python
for i in range(1, 4):
    print(i * "*")
```
```output
*
**
***
```
- A) 1, 2, 3 (three lines)
- B) ***, ***, *** (three lines)
- C) *, **, *** (three lines)
- D) * only
Answer: C
Why: In round one it is one star, in round two two stars, in round three three stars. A small triangle appears.

**5. Pick one**
Which loop shows 10, 20, 30?
- A) `for i in range(3):`
- B) `for i in range(10, 30, 10):`
- C) `for i in range(10, 30):`
- D) `for i in range(10, 31, 10):`
Answer: D
Why: Start at 10, step by 10, and stop at 31 so that 30 is included. Stopping at 30 would end at 20, because the stop value is never included.

**6. Write it yourself**
Show a countdown from 5 to 1, then show Liftoff!
Accepted: the program prints 5, 4, 3, 2, 1, then Liftoff!
```python
for i in range(5, 0, -1):
    print(i)
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

Hint: A negative step in range counts down. The Liftoff! line is not indented.

**7. Write it yourself**
Show the 4 times table from 4 x 1 to 4 x 5, in the form 4 x 1 = 4.
Accepted: the program prints five lines, 4 x 1 = 4 up to 4 x 5 = 20.
```python
for i in range(1, 6):
    print(f"4 x {i} = {4 * i}")
```
```output
4 x 1 = 4
4 x 2 = 8
4 x 3 = 12
4 x 4 = 16
4 x 5 = 20
```

Hint: Loop over `range(1, 6)`. An f-string with {i} and {4 * i} builds each line.

**Recap**
Loops make countdowns, tables and patterns with just a few lines.

---

## Lesson 6.7: while or for?

**Teach**
You now have two loops. How do you pick?

- Use `for` when you know how many times to repeat, or when you go through something, like numbers or the letters of text.
- Use `while` when you repeat until something happens, and you do not know in advance how many rounds that will take.

Many jobs can be done with either. These two show the same thing:

```python
for i in range(1, 4):
    print(i)
```
```output
1
2
3
```

```python
i = 1
while i <= 3:
    print(i)
    i += 1
```
```output
1
2
3
```

The `for` version is shorter, and you cannot forget to update the counter.

**1. Pick one**
Which loop fits best: "Show the numbers 1 to 20"?
- A) while
- B) for
Answer: B
Why: You know exactly how many numbers there are.

**2. Pick one**
Which loop fits best: "Keep asking for a password until it is correct"?
- A) while
- B) for
Answer: A
Why: You do not know how many tries the person will need.

**3. Pick one**
Which loop fits best: "Show each letter of a name"?
- A) while
- B) for
Answer: B
Why: A for loop goes through text one character at a time.

**4. Pick one**
Which loop fits best: "Roll a dice until you get a 6"?
- A) while
- B) for
Answer: A
Why: You cannot know how many rolls it will take.

**5. Pick one**
Which loop fits best: "Repeat something exactly 5 times"?
- A) for
- B) while
Answer: A
Why: The count is known, so `for i in range(5)` is simplest.

**6. True or false**
A for loop and a while loop can sometimes do the same job.
Answer: True
Why: Counting 1 to 3 works with either. Pick the one that reads more clearly.

**Recap**
Use `for` when you know the count or are going through something. Use `while` when you repeat until something happens.

---

## Unit 6 project: Number guessing game

**Goal**
The computer picks a secret number from 1 to 10. The player keeps guessing. After each guess the game says "Too low" or "Too high". When the player gets it right, the game shows how many tries it took.

A new tool: `random.randint(1, 10)` gives a random whole number from 1 to 10, both included. Put `import random` at the top of the program first.

**Guided steps**
1. Start with `import random` and `secret = random.randint(1, 10)`.
2. Set `tries = 0` and `guess = 0`.
3. Write a `while guess != secret:` loop (not equal to).
4. Inside: ask for a guess with `int(input(...))`, add 1 to `tries`.
5. Still inside: use `if` and `elif` to show Too low or Too high.
6. After the loop, show `Correct! Tries: ` and the number of tries.

**What the player's version looks like**
```
import random
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
```

**Accepted**
The checker fixes the secret to 7 so the answers are always the same. With the guesses 5, 9, 7 it shows the lines below.
```python inputs=5,9,7
secret = 7
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
```
```output
Too low
Too high
Correct! Tries: 3
```
With one correct guess:
```python inputs=7
secret = 7
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
```
```output
Correct! Tries: 1
```

**Recap**
You used while, if, elif, input, int and random together. The loop keeps going until the guess matches, and you did not know in advance how many rounds it would need.

---

## Unit 6 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (6.1)** What does this show?
```python
for i in range(3):
    print("Yes")
```
```output
Yes
Yes
Yes
```
- A) Yes 4 times
- B) 0, 1, 2
- C) Yes 2 times
- D) Yes 3 times
Answer: D

**Q2 (6.1)** What does range(4) make?
- A) 4
- B) 0, 1, 2, 3
- C) 1, 2, 3, 4
- D) 0, 1, 2, 3, 4
Answer: B

**Q3 (6.1)** What does this show?
```python
for i in range(3):
    print(i + 10)
```
```output
10
11
12
```
- A) 10, 11, 12 (three lines)
- B) 13 only
- C) 10, 11, 12, 13 (four lines)
- D) 11, 12, 13 (three lines)
Answer: A

**Q4 (6.2)** What does this show?
```python
for i in range(2, 5):
    print(i)
```
```output
2
3
4
```
- A) 2, 3, 4 (three lines)
- B) 2, 3, 4, 5 (four lines)
- C) 5 only
- D) 3, 4, 5 (three lines)
Answer: A

**Q5 (6.2)** What does this show?
```python
for i in range(0, 10, 3):
    print(i)
```
```output
0
3
6
9
```
- A) 0 to 10 (eleven lines)
- B) 3, 6, 9 (three lines)
- C) 0, 3, 6, 9, 12 (five lines)
- D) 0, 3, 6, 9 (four lines)
Answer: D

**Q6 (6.2)** What does this show?
```python
for i in range(3, 0, -1):
    print(i)
```
```output
3
2
1
```
- A) Nothing is shown
- B) 3, 2, 1 (three lines)
- C) 1, 2, 3 (three lines)
- D) 3, 2, 1, 0 (four lines)
Answer: B

**Q7 (6.3)** Which loop shows 1 to 4?
- A) `range(1, 5)`
- B) `range(1, 4)`
- C) `range(4)`
- D) `range(0, 4)`
Answer: A

**Q8 (6.3)** How many times does `for i in range(5, 9)` run?
- A) 9
- B) 3
- C) 5
- D) 4
Answer: D

**Q9 (6.3)** What does this show?
```python
for i in range(1, 3):
    print(i)
```
```output
1
2
```
- A) Nothing is shown
- B) 1, 2 (two lines)
- C) 1, 2, 3 (three lines)
- D) 3 only
Answer: B

**Q10 (6.3)** To end a count on 8, what should the stop value be?
- A) 7
- B) 8
- C) 9
- D) 10
Answer: C

**Q11 (6.4)** What does this show?
```python
for ch in "go":
    print(ch)
```
```output
g
o
```
- A) g, o (two lines)
- B) o, g (two lines)
- C) go (one line)
- D) 2
Answer: A

**Q12 (6.4)** How many times does this loop run?
`for ch in "banana":`
- A) 3
- B) 6
- C) 5
- D) 7
Answer: B

**Q13 (6.5)** What does this show?
```python
for i in range(1, 8):
    if i == 3:
        break
    print(i)
```
```output
1
2
```
- A) 1, 2 (two lines)
- B) 1 to 7 (seven lines)
- C) 1, 2, 3 (three lines)
- D) 3 only
Answer: A

**Q14 (6.5)** What does this show?
```python
for i in range(1, 5):
    if i == 2:
        continue
    print(i)
```
```output
1
3
4
```
- A) 1 only
- B) 1, 3, 4 (three lines)
- C) 2 only
- D) 1, 2, 3, 4 (four lines)
Answer: B

**Q15 (6.5)** Which statement jumps straight to the next round?
- A) stop
- B) continue
- C) break
- D) next
Answer: B

**Q16 (6.6)** What does this show?
```python
for i in range(1, 4):
    print(i * 5)
```
```output
5
10
15
```
- A) 15 only
- B) 1, 2, 3 (three lines)
- C) 5, 10, 15, 20 (four lines)
- D) 5, 10, 15 (three lines)
Answer: D

**Q17 (6.6)** What does this show?
```python
for i in range(1, 3):
    print(f"Round {i}")
```
```output
Round 1
Round 2
```
- A) Round 1, Round 2, Round 3 (three lines)
- B) Round 1, Round 2 (two lines)
- C) Round {i} twice
- D) Round 1 only
Answer: B

**Q18 (6.7)** You want to repeat until the user types the word quit. Which loop fits?
- A) while
- B) for
Answer: A

**Q19 (6.7)** You want to show the numbers 1 to 10. Which loop fits best?
- A) while
- B) for
Answer: B

**Q20 (mixed)** What does the last line show?
```python
total = 0
for i in range(1, 5):
    total += i
print(total)
```
```output
10
```
- A) 10
- B) 15
- C) 5
- D) 4
Answer: A

**Q21 (6.1)** What does this show?
```python
for i in range(3):
    print(i * i)
```
```output
0
1
4
```
- A) 0, 1, 2 (three lines)
- B) 0, 1, 4 (three lines)
- C) 1, 4, 9 (three lines)
- D) 4 only
Answer: B

**Q22 (6.2)** What does this show?
```python
for i in range(4, 10, 2):
    print(i)
```
```output
4
6
8
```
- A) 4, 6, 8 (three lines)
- B) 10 only
- C) 4, 6, 8, 10 (four lines)
- D) 4 to 9 (six lines)
Answer: A

**Q23 (6.3)** Which loop line shows the numbers 1 to 6?
- A) `for i in range(6):`
- B) `for i in range(1, 6):`
- C) `for i in range(1, 7):`
- D) `for i in range(0, 6):`
Answer: C

**Q24 (6.4)** What does this show?
```python
for ch in "ab":
    print(ch * 3)
```
```output
aaa
bbb
```
- A) a, b (two lines)
- B) ab, ab, ab (three lines)
- C) aaabbb (one line)
- D) aaa, bbb (two lines)
Answer: D

**Q25 (6.5)** What does this show?
```python
for i in range(5):
    if i % 2 == 0:
        continue
    print(i)
```
```output
1
3
```
- A) Nothing is shown
- B) 0, 2, 4 (three lines)
- C) 1, 3, 5 (three lines)
- D) 1, 3 (two lines)
Answer: D

Note: this bank has 25 questions.
