# Python, Unit 8: Loops with logic and nested loops

This unit puts the loop skills to work: counting, adding up, finding the biggest, filtering, and finally a loop inside a loop. Nested loops are one of the hardest ideas for beginners, so lesson 8.5 uses a trace table, a picture of a grid, and small sizes.

Format notes: same as Units 1 to 7.

---

## Lesson 8.1: Counters

**Teach**
A very common job: count how many items match something.

The pattern has three parts:
1. Start a counter at 0, before the loop.
2. Check each item inside the loop.
3. Add 1 to the counter when the item matches.

```python
words = ["cat", "dog", "cat", "bird", "cat"]
count = 0
for w in words:
    if w == "cat":
        count += 1
print(count)
```
```output
3
```

The counter is created before the loop, not inside it. If it were inside, it would reset to 0 every round.

**1. Predict the output**
```python
words = ["cat", "dog", "cat", "bird", "cat"]
count = 0
for w in words:
    if w == "cat":
        count += 1
print(count)
```
```output
3
```
- A) 0
- B) 5
- C) 1
- D) 3
Answer: D
Why: Three of the five words are cat, so count goes up three times.

**2. Fill in the table**
Fill in w and count each time the `if` line is about to run, then after the loop.
```trace line=4 vars=w,count
words = ["cat", "dog", "cat", "bird", "cat"]
count = 0
for w in words:
    if w == "cat":
        count += 1
print(count)
```
```table
w='cat' count=0
w='dog' count=1
w='cat' count=1
w='bird' count=2
w='cat' count=2
final w='cat' count=3
```
Why: count only goes up on rounds where w is cat.

**3. Predict the output**
How many numbers are bigger than 5?
```python
count = 0
for n in [3, 8, 5, 10, 7]:
    if n > 5:
        count += 1
print(count)
```
```output
3
```
- A) 4
- B) 3
- C) 2
- D) 5
Answer: B
Why: 8, 10 and 7 are bigger than 5. 5 itself is not.

**4. Predict the output**
```python
count = 0
for ch in "banana":
    if ch == "a":
        count += 1
print(count)
```
```output
3
```
- A) 1
- B) 3
- C) 2
- D) 6
Answer: B
Why: "banana" has three a's.

**5. Predict the output**
This program has a bug. Look at where count = 0 is.
```python
words = ["cat", "dog", "cat"]
for w in words:
    count = 0
    if w == "cat":
        count += 1
print(count)
```
```output
1
```
- A) 1
- B) 2
- C) 0
- D) 3
Answer: A
Why: count is set back to 0 at the start of every round, so only the last round counts. The fix is to move count = 0 above the loop.

**6. True or false**
The counter should be created before the loop.
Answer: True
Why: Created inside the loop, it would reset to 0 every round.

**7. Write it yourself**
Count how many numbers in the list are greater than 8, then show the count.
Starter:
```
nums = [4, 9, 12, 7, 15]
```
Accepted: the program prints `3`.
```python
nums = [4, 9, 12, 7, 15]
count = 0
for n in nums:
    if n > 8:
        count += 1
print(count)
```
```output
3
```

Hint: Start a counter at 0 before the loop. Inside the loop, check each number and add 1 when it matches.

**Recap**
Counter pattern: start at 0 before the loop, check inside it, add 1 on a match.

---

## Lesson 8.2: Running totals

**Teach**
The same pattern adds things up. Start a total at 0 and add each item.

```python
nums = [4, 8, 6]
total = 0
for n in nums:
    total += n
print(total)
print(total / len(nums))
```
```output
18
6.0
```

The second line is the average: the total divided by how many items there are. Remember `/` always gives a float.

A running product works the same way, but it starts at 1, because starting at 0 would make everything 0.

```python
result = 1
for n in [2, 3, 4]:
    result *= n
print(result)
```
```output
24
```

**1. Predict the output**
```python
total = 0
for n in [2, 4, 6, 8]:
    total += n
print(total)
```
```output
20
```
- A) 20
- B) 8
- C) 2468
- D) 14
Answer: A
Why: 2 + 4 + 6 + 8 is 20.

**2. Fill in the table**
Fill in n and total each time the `total += n` line is about to run, then after the loop.
```trace line=4 vars=n,total
nums = [5, 10, 15]
total = 0
for n in nums:
    total += n
print(total)
```
```table
n=5 total=0
n=10 total=5
n=15 total=15
final n=15 total=30
```
Why: Each round adds the current n to the total so far.

**3. Predict the output**
```python
nums = [10, 20, 30]
total = 0
for n in nums:
    total += n
print(total / len(nums))
```
```output
20.0
```
- A) 20
- B) 20.0
- C) 60.0
- D) 60
Answer: B
Why: The total is 60 and there are 3 numbers. 60 divided by 3 is 20.0, a float.

**4. Predict the output**
A running total can also go down.
```python
total = 100
for n in [10, 20]:
    total -= n
print(total)
```
```output
70
```
- A) 70
- B) 80
- C) 130
- D) 90
Answer: A
Why: 100 minus 10 is 90, then 90 minus 20 is 70.

**5. Predict the output**
```python
result = 1
for n in [2, 3, 4]:
    result *= n
print(result)
```
```output
24
```
- A) 0
- B) 24
- C) 234
- D) 9
Answer: B
Why: 1 times 2 is 2, times 3 is 6, times 4 is 24.

**6. Pick one**
Why does a running product start at 1 and not 0?
- A) Python requires it
- B) 1 is a lucky number
- C) Anything multiplied by 0 stays 0
- D) It does not matter
Answer: C
Why: Starting at 0 would give 0 at the end, whatever the numbers are. Starting at 1 leaves the numbers unchanged.

**7. Write it yourself**
Show the total of these prices.
Starter:
```
prices = [2.5, 4.0, 1.5]
```
Accepted: the program prints `8.0`.
```python
prices = [2.5, 4.0, 1.5]
total = 0
for p in prices:
    total += p
print(total)
```
```output
8.0
```

Hint: Start total at 0, add each price inside the loop, and print the total after the loop.

**Recap**
A running total starts at 0 and adds each item. A running product starts at 1. Divide the total by `len` for the average.

---

## Lesson 8.3: Biggest and smallest

**Teach**
To find the biggest number in a list, keep the best one so far. Check each item, and replace the best whenever you find a bigger one.

```python
nums = [4, 9, 2, 7]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)
```
```output
9
```

Trace it:

```trace line=4 vars=n,biggest
nums = [4, 9, 2, 7]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)
```
```table
n=4 biggest=4
n=9 biggest=4
n=2 biggest=9
n=7 biggest=9
final n=7 biggest=9
```

Why start with `nums[0]` and not 0? Because if all the numbers are negative, 0 would be bigger than all of them and win by mistake.

For the smallest, flip the check to `<`.

Python also has built-in `max()` and `min()`:

```python
print(max([4, 9, 2, 7]))
```
```output
9
```

Writing the loop yourself teaches the pattern, which you will use for harder jobs.

**1. Predict the output**
```python
nums = [3, 8, 5]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)
```
```output
8
```
- A) 3
- B) 16
- C) 5
- D) 8
Answer: D
Why: biggest starts at 3, becomes 8 when 8 is bigger, and stays 8 when 5 is checked.

**2. Fill in the table**
Fill in n and biggest each time the `if` line is about to run, then after the loop.
```trace line=4 vars=n,biggest
nums = [6, 2, 9, 4]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)
```
```table
n=6 biggest=6
n=2 biggest=6
n=9 biggest=6
n=4 biggest=9
final n=4 biggest=9
```
Why: biggest only changes in the round where n is 9, so you see the new value in the next row.

**3. Predict the output**
Finding the smallest.
```python
nums = [5, 3, 8]
smallest = nums[0]
for n in nums:
    if n < smallest:
        smallest = n
print(smallest)
```
```output
3
```
- A) 3
- B) 5
- C) 8
- D) 0
Answer: A
Why: smallest starts at 5, becomes 3 when 3 is smaller, and stays 3 after that.

**4. Predict the output**
This program has a bug. Look at the starting value.
```python
nums = [-5, -2, -9]
biggest = 0
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)
```
```output
0
```
- A) 0
- B) -9
- C) -5
- D) -2
Answer: A
Why: Every number is smaller than 0, so biggest never changes. It shows 0, which is not even in the list. The fix is `biggest = nums[0]`.

**5. Pick one**
Which line fixes the bug in the program above?
- A) `biggest = 1`
- B) `biggest = "nums"`
- C) `biggest = nums[0]`
- D) `biggest = -1`
Answer: C
Why: Starting from the first item works for any list.

**6. Write it yourself**
Show the biggest number in the list.
Starter:
```
nums = [12, 45, 7, 33]
```
Accepted: the program prints `45`.
```python
nums = [12, 45, 7, 33]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)
```
```output
45
```

Hint: Start biggest as the first item. Replace it whenever you find a bigger number.

**7. Write it yourself**
Show the smallest number in the same list.
Starter:
```
nums = [12, 45, 7, 33]
```
Accepted: the program prints `7`.
```python
nums = [12, 45, 7, 33]
smallest = nums[0]
for n in nums:
    if n < smallest:
        smallest = n
print(smallest)
```
```output
7
```

Hint: It is the same pattern as finding the biggest, with the check flipped.

**Recap**
Keep the best so far, start from the first item, and update it when you find a better one.

---

## Lesson 8.4: A loop with an if inside

**Teach**
Loops and decisions work together. Put an `if` inside a loop to act only on the items you care about.

```python
for n in range(1, 11):
    if n % 2 == 0:
        print(n)
```
```output
2
4
6
8
10
```

Each round, the loop gives n a new value and the `if` decides whether to show it. The `if` is indented once more than the loop, and its steps are indented again.

You can count with it too, as you did in lesson 8.1.

**1. Predict the output**
```python
for n in range(1, 11):
    if n % 2 == 0:
        print(n)
```
```output
2
4
6
8
10
```
- A) 1 to 10 (ten lines)
- B) 10 only
- C) 2, 4, 6, 8, 10 (five lines)
- D) 1, 3, 5, 7, 9 (five lines)
Answer: C
Why: n % 2 is 0 for even numbers, so only even numbers are shown.

**2. Predict the output**
```python
for n in range(1, 8):
    if n > 4:
        print(n)
```
```output
5
6
7
```
- A) 4, 5, 6, 7 (four lines)
- B) 1, 2, 3, 4 (four lines)
- C) 7 only
- D) 5, 6, 7 (three lines)
Answer: D
Why: The if is True only when n is greater than 4.

**3. Predict the output**
How many numbers from 1 to 10 are multiples of 3?
```python
count = 0
for n in range(1, 11):
    if n % 3 == 0:
        count += 1
print(count)
```
```output
3
```
- A) 3
- B) 2
- C) 10
- D) 4
Answer: A
Why: 3, 6 and 9 are multiples of 3.

**4. Predict the output**
```python
for n in [1, 2, 3, 4]:
    if n % 2 == 0:
        print("even")
    else:
        print("odd")
```
```output
odd
even
odd
even
```
- A) even, even, even, even (four lines)
- B) even, odd, even, odd (four lines)
- C) odd, even, odd, even (four lines)
- D) odd, odd, odd, odd (four lines)
Answer: C
Why: The loop checks each number in turn. 1 is odd, 2 is even, 3 is odd, 4 is even.

**5. Fill in the table**
Fill in n and count each time the `if` line is about to run, then after the loop.
```trace line=3 vars=n,count
count = 0
for n in range(1, 6):
    if n % 2 == 0:
        count += 1
print(count)
```
```table
n=1 count=0
n=2 count=0
n=3 count=1
n=4 count=1
n=5 count=2
final n=5 count=2
```
Why: count goes up only after n is 2 and after n is 4. You see each change in the next row.

**6. Pick one**
Which line checks that n is a multiple of 5?
- A) `if n // 5 == 0:`
- B) `if n % 5 == 0:`
- C) `if n = 5:`
- D) `if n % 5 == 5:`
Answer: B
Why: A multiple of 5 leaves a remainder of 0 when divided by 5.

**7. Write it yourself**
Show the odd numbers from 1 to 9, one per line.
Accepted: the program prints 1, 3, 5, 7, 9.
```python
for n in range(1, 10):
    if n % 2 == 1:
        print(n)
```
```output
1
3
5
7
9
```
Hint: odd numbers leave a remainder of 1 when divided by 2.

**Recap**
An `if` inside a loop acts only on the items that match, whether to show them or to count them.

---

## Lesson 8.5: A loop inside a loop

**Teach**
You can put a loop inside another loop. This is called a nested loop. It is how you work with rows and columns, like a grid.

The key idea: for every single round of the outer loop, the inner loop runs completely from start to finish.

First, a small tool. Normally `print` ends with a new line. `print("*", end="")` shows the star and stays on the same line. A plain `print()` with nothing inside just starts a new line.

```python
for row in range(3):
    for col in range(4):
        print("*", end="")
    print()
```
```output
****
****
****
```

Read it like this:
- The outer loop makes 3 rows.
- In each row, the inner loop shows 4 stars on one line.
- After the stars, `print()` starts a new line for the next row.

Total stars: 3 rows times 4 stars is 12.

Let's trace a smaller one. The table shows row and col each time the star line is about to run:

```trace line=3 vars=row,col
for row in range(2):
    for col in range(3):
        print("*", end="")
    print()
```
```table
row=0 col=0
row=0 col=1
row=0 col=2
row=1 col=0
row=1 col=1
row=1 col=2
final row=1 col=2
```

Notice how col runs 0, 1, 2 all the way through, then starts again from 0 when row moves on. Row changes slowly, col changes quickly, like the hands of a clock.

**1. Predict the output**
```python
for row in range(3):
    for col in range(4):
        print("*", end="")
    print()
```
```output
****
****
****
```
- A) 4 lines of 3 stars
- B) 1 line of 12 stars
- C) 12 lines of 1 star
- D) 3 lines of 4 stars
Answer: D
Why: The outer loop makes 3 rows. The inner loop puts 4 stars in each row.

**2. Pick one**
How many stars are shown in total?
```
for row in range(3):
    for col in range(4):
        print("*", end="")
    print()
```
- A) 3
- B) 4
- C) 12
- D) 7
Answer: C
Why: 3 rows with 4 stars each is 3 times 4.

**3. Fill in the table**
Fill in row and col each time the star line is about to run, then after the loops.
```trace line=3 vars=row,col
for row in range(2):
    for col in range(3):
        print("*", end="")
    print()
```
```table
row=0 col=0
row=0 col=1
row=0 col=2
row=1 col=0
row=1 col=1
row=1 col=2
final row=1 col=2
```
Why: The inner loop runs 3 times for each of the 2 rows, six rounds in all.

**4. Predict the output**
```python
for i in range(2):
    for j in range(2):
        print(f"{i}-{j}")
```
```output
0-0
0-1
1-0
1-1
```
- A) 0-1, 1-0 (two lines)
- B) 0-0, 0-1, 1-0, 1-1 (four lines)
- C) 0-0, 1-0, 0-1, 1-1 (four lines)
- D) 0-0, 1-1 (two lines)
Answer: B
Why: i is 0 while j goes through 0 and 1. Then i is 1 while j goes through 0 and 1 again.

**5. Pick one**
In a nested loop, how often does the inner loop run?
- A) Only once
- B) Completely, start to finish, for every round of the outer loop
- C) Only on the last round of the outer loop
- D) Once for every two outer rounds
Answer: B
Why: Every time the outer loop starts a new round, the inner loop starts again from the beginning.

**6. Pick one**
How many times does `print("hi")` run?
```
for i in range(2):
    for j in range(5):
        print("hi")
```
- A) 2
- B) 5
- C) 7
- D) 10
Answer: D
Why: The inner loop runs 5 times for each of the 2 outer rounds, 2 times 5.

**7. Predict the output**
This program forgot something. Look at the end.
```python
for row in range(2):
    for col in range(3):
        print("*", end="")
```
```output
******
```
- A) Nothing is shown
- B) `******`
- C) `***` on two lines
- D) `**` on three lines
Answer: B
Why: There is no plain `print()` after the inner loop, so nothing starts a new line. All six stars land on one line.

**8. Write it yourself**
Show a rectangle of # with 2 rows and 5 columns.
Accepted: the program prints `#####` on two lines.
```python
for row in range(2):
    for col in range(5):
        print("#", end="")
    print()
```
```output
#####
#####
```
Hint: the outer loop is for the rows, the inner loop is for the columns, and a plain print() ends each row.

**Recap**
A nested loop runs the inner loop completely for each round of the outer loop. `end=""` keeps printing on one line, and `print()` starts a new one.

---

## Lesson 8.6: Patterns

**Teach**
Nested loops make patterns. A big idea: the inner loop does not have to run the same number of times every round. It can depend on the outer loop.

A triangle, two ways:

```python
for i in range(1, 5):
    print("*" * i)
```
```output
*
**
***
****
```

```python
for row in range(1, 4):
    for col in range(row):
        print("*", end="")
    print()
```
```output
*
**
***
```

In the second one, `range(row)` makes the inner loop longer in each row: 1 star, then 2, then 3.

A grid of numbers, each row being a multiplication row:

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end="")
    print()
```
```output
123
246
369
```

**1. Predict the output**
```python
for i in range(1, 4):
    print("*" * i)
```
```output
*
**
***
```
- A) *, **, *** (three lines)
- B) * only
- C) ***, ***, *** (three lines)
- D) 1, 2, 3 (three lines)
Answer: A
Why: Row 1 is one star, row 2 is two stars, row 3 is three stars.

**2. Predict the output**
```python
for row in range(1, 4):
    for col in range(row):
        print("*", end="")
    print()
```
```output
*
**
***
```
- A) 1, 2, 3 (three lines)
- B) ***, ***, *** (three lines)
- C) *, **, *** (three lines)
- D) *** (one line)
Answer: C
Why: range(row) is 1 in the first row, 2 in the second, and 3 in the third. The inner loop gets longer each time.

**3. Predict the output**
```python
for i in range(1, 4):
    for j in range(1, i + 1):
        print(j, end="")
    print()
```
```output
1
12
123
```
- A) 3, 2, 1 (three lines)
- B) 1, 1, 1 (three lines)
- C) 123, 123, 123 (three lines)
- D) 1, 12, 123 (three lines)
Answer: D
Why: In row i, the inner loop counts from 1 up to i.

**4. Pick one**
Which loop line makes a triangle with 4 rows, the first with 1 star?
- A) `for i in range(1, 4):`
- B) `for i in range(0, 4):`
- C) `for i in range(1, 5):`
- D) `for i in range(4):`
Answer: C
Why: range(1, 5) gives 1, 2, 3, 4, which is four rows. Remember the stop value is not included.

**5. Predict the output**
```python
for i in range(3, 0, -1):
    print("*" * i)
```
```output
***
**
*
```
- A) ***, ***, *** (three lines)
- B) *, **, *** (three lines)
- C) ***, **, * (three lines)
- D) 3, 2, 1 (three lines)
Answer: C
Why: i counts down from 3 to 1, so each row has fewer stars than the last.

**6. Write it yourself**
Show a right triangle of # with 5 rows, the first with one #.
Accepted: the program prints `#`, `##`, `###`, `####`, `#####` on five lines.
```python
for i in range(1, 6):
    print("#" * i)
```
```output
#
##
###
####
#####
```

Hint: Multiply the text "#" by the row number. Loop over `range(1, 6)`.

**7. Write it yourself**
Show a 3 by 3 grid where each number is the row times the column, with no spaces. The rows are 123, 246 and 369.
Accepted: the program prints `123`, `246`, `369` on three lines.
```python
for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end="")
    print()
```
```output
123
246
369
```

Hint: Use a loop inside a loop. In the inner loop print `i * j` with `end=""`, and use a plain `print()` after it.

**Recap**
Make the inner loop depend on the outer loop to get triangles. Use nested loops with `end=""` and `print()` for grids.

---

## Unit 8 project: Pattern printer

**Goal**
Ask for a size. Then show a triangle and a square of that size.

If the person types 3, the program shows:
```
Triangle:
*
**
***
Square:
###
###
###
```

**Guided steps**
1. Ask for the size with `int(input(...))` and store it in `n`.
2. Show the word `Triangle:`.
3. Use a for loop over `range(1, n + 1)` and show `"*" * i` in each round.
4. Show the word `Square:`.
5. Use a nested loop: the outer loop makes `n` rows, the inner loop shows `n` # characters with `end=""`, and a plain `print()` ends each row.

**Accepted**
```python inputs=3
n = int(input("Size? "))
print("Triangle:")
for i in range(1, n + 1):
    print("*" * i)
print("Square:")
for row in range(n):
    for col in range(n):
        print("#", end="")
    print()
```
```output
Triangle:
*
**
***
Square:
###
###
###
```
```python inputs=1
n = int(input("Size? "))
print("Triangle:")
for i in range(1, n + 1):
    print("*" * i)
print("Square:")
for row in range(n):
    for col in range(n):
        print("#", end="")
    print()
```
```output
Triangle:
*
Square:
#
```

**Recap**
You combined input, a loop that builds a triangle, and a nested loop that builds a square. Nested loops are how you work with anything in rows and columns.

---

## Unit 8 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10. Nested loops get extra questions because they are the hardest part.

**Q1 (8.1)** What does this show?
```python
count = 0
for x in ["a", "b", "a"]:
    if x == "a":
        count += 1
print(count)
```
```output
2
```
- A) 1
- B) 3
- C) 0
- D) 2
Answer: D

**Q2 (8.1)** What does this show?
```python
count = 0
for n in [2, 9, 4, 7, 1]:
    if n < 5:
        count += 1
print(count)
```
```output
3
```
- A) 5
- B) 3
- C) 4
- D) 2
Answer: B

**Q3 (8.1)** Where should `count = 0` go?
- A) After the loop
- B) Inside the loop
- C) Anywhere
- D) Before the loop
Answer: D

**Q4 (8.2)** What does this show?
```python
total = 0
for n in [3, 6, 9]:
    total += n
print(total)
```
```output
18
```
- A) 9
- B) 18
- C) 369
- D) 0
Answer: B

**Q5 (8.2)** What does this show?
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
- A) 6.0
- B) 4.0
- C) 4
- D) 12
Answer: B

**Q6 (8.2)** What does this show?
```python
result = 1
for n in [2, 5]:
    result *= n
print(result)
```
```output
10
```
- A) 7
- B) 10
- C) 0
- D) 25
Answer: B

**Q7 (8.2)** Fill in n and total each time the `total += n` line is about to run, then after the loop.
```trace line=4 vars=n,total
nums = [2, 3]
total = 0
for n in nums:
    total += n
```
```table
n=2 total=0
n=3 total=2
final n=3 total=5
```

**Q8 (8.3)** What does this show?
```python
nums = [4, 11, 6]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)
```
```output
11
```
- A) 21
- B) 4
- C) 6
- D) 11
Answer: D

**Q9 (8.3)** What does this show?
```python
nums = [4, 11, 6]
smallest = nums[0]
for n in nums:
    if n < smallest:
        smallest = n
print(smallest)
```
```output
4
```
- A) 11
- B) 0
- C) 6
- D) 4
Answer: D

**Q10 (8.3)** Fill in n and biggest each time the `if` line is about to run, then after the loop.
```trace line=4 vars=n,biggest
nums = [3, 7, 5]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
```
```table
n=3 biggest=3
n=7 biggest=3
n=5 biggest=7
final n=5 biggest=7
```

**Q11 (8.3)** Why start `biggest` as `nums[0]`?
- A) To make the loop faster
- B) It makes no difference
- C) Python requires it
- D) So it works even when all the numbers are negative
Answer: D

**Q12 (8.4)** What does this show?
```python
for n in range(1, 7):
    if n % 2 == 1:
        print(n)
```
```output
1
3
5
```
- A) 1 to 6 (six lines)
- B) 1, 3, 5 (three lines)
- C) 2, 4, 6 (three lines)
- D) Nothing is shown
Answer: B

**Q13 (8.4)** What does this show?
```python
count = 0
for n in range(5):
    if n > 2:
        count += 1
print(count)
```
```output
2
```
- A) 5
- B) 1
- C) 3
- D) 2
Answer: D

**Q14 (8.4)** What does this show?
```python
for n in [1, 6]:
    if n > 5:
        print("big")
    else:
        print("small")
```
```output
small
big
```
- A) big only
- B) big, small (two lines)
- C) small, big (two lines)
- D) small only
Answer: C

**Q15 (8.5)** What does this show?
```python
for i in range(2):
    for j in range(3):
        print("x", end="")
    print()
```
```output
xxx
xxx
```
- A) 3 lines of xx
- B) 1 line of xxxxxx
- C) 2 lines of xxx
- D) 6 lines of x
Answer: C

**Q16 (8.5)** How many times does the inner `print` run?
```
for a in range(3):
    for b in range(3):
        print("go")
```
- A) 6
- B) 3
- C) 27
- D) 9
Answer: D

**Q17 (8.5)** What does this show?
```python
for i in range(2):
    for j in range(2):
        print(f"{i}-{j}")
```
```output
0-0
0-1
1-0
1-1
```
- A) 0-1, 1-0 (two lines)
- B) 0-0, 0-1, 1-0, 1-1 (four lines)
- C) 0-0, 1-0, 0-1, 1-1 (four lines)
- D) 0-0, 1-1 (two lines)
Answer: B

**Q18 (8.6)** What does this show?
```python
for i in range(1, 4):
    print("#" * i)
```
```output
#
##
###
```
- A) # (one line)
- B) #, ##, ### (three lines)
- C) 1, 2, 3 (three lines)
- D) ###, ###, ### (three lines)
Answer: B

**Q19 (8.6)** What does this show?
```python
for i in range(3, 0, -1):
    print("*" * i)
```
```output
***
**
*
```
- A) 3, 2, 1 (three lines)
- B) ***, **, * (three lines)
- C) *, **, *** (three lines)
- D) *** (one line)
Answer: B

**Q20 (mixed)** What does this show?
```python
count = 0
for ch in "hello":
    if ch == "l":
        count += 1
print(count)
```
```output
2
```
- A) 5
- B) 2
- C) 1
- D) 3
Answer: B

**Q21 (8.5)** In a nested loop, the inner loop...
- A) Runs only at the end
- B) Runs completely for every round of the outer loop
- C) Is skipped
- D) Runs once in total
Answer: B

**Q22 (8.5)** What does this show?
```python
for i in range(2):
    for j in range(3):
        print("*", end="")
```
```output
******
```
- A) `***` on two lines
- B) Nothing is shown
- C) `**` on three lines
- D) `******`
Answer: D

**Q23 (8.1)** What does this show?
```python
count = 0
for ch in "banana":
    if ch == "n":
        count += 1
print(count)
```
```output
2
```
- A) 1
- B) 2
- C) 6
- D) 3
Answer: B

**Q24 (8.4)** What does this show?
```python
for n in range(1, 8):
    if n % 3 == 0:
        print(n)
```
```output
3
6
```
- A) 3, 6, 9 (three lines)
- B) 1, 2, 4, 5, 7 (five lines)
- C) 3, 6 (two lines)
- D) Nothing is shown
Answer: C

**Q25 (8.6)** What does this show?
```python
for i in range(1, 4):
    print("*" * (4 - i))
```
```output
***
**
*
```
- A) ***, ***, *** (three lines)
- B) 3, 2, 1 (three lines)
- C) ***, **, * (three lines)
- D) *, **, *** (three lines)
Answer: C

Note: this bank has 25 questions.
