# Python, Unit 3: Operators and the calculator

Format notes: same as Units 1 and 2.

---

## Lesson 3.1: Math operators

**Teach**
Python can do maths. The symbols for maths are called operators.

| Symbol | What it does |
|---|---|
| `+` | add |
| `-` | subtract |
| `*` | multiply |
| `/` | divide |
| `**` | power (2 ** 3 means 2 times 2 times 2) |

Use `*` for multiply, not `x`.

```python
print(8 - 3)
print(4 * 5)
print(2 ** 3)
```
```output
5
20
8
```

One surprise: `/` always gives a decimal number (a float), even when the answer is whole. `6 / 3` is `2.0`, not `2`.

**1. Match**
Match each symbol to its job.
- `+`: add
- `-`: subtract
- `*`: multiply
- `/`: divide
- `**`: power
Why: These five cover most of the maths you will do.

**2. Predict the output**
```python
print(10 / 4)
```
```output
2.5
```
- A) 2
- B) 2.5
- C) 3
- D) 40
Answer: B
Why: / gives the exact answer, including the decimal part.

**3. Predict the output**
```python
print(6 / 3)
```
```output
2.0
```
- A) 3
- B) 2
- C) 18
- D) 2.0
Answer: D
Why: / always gives a float. The answer is a whole value, but it still shows as 2.0.

**4. Predict the output**
```python
print(2 ** 3)
```
```output
8
```
- A) 23
- B) 6
- C) 5
- D) 8
Answer: D
Why: 2 ** 3 is 2 times 2 times 2, which is 8.

**5. Fill the blank**
Which symbol shows 12?
`print(6 ___ 2)`
- A) x
- B) *
- C) +
- D) /
Answer: B
Why: 6 times 2 is 12. Python uses * for multiply.

**6. Predict the output**
```python
a = 9
b = 4
print(a - b)
```
```output
5
```
- A) 2.25
- B) 36
- C) 13
- D) 5
Answer: D
Why: print uses the values stored in a and b, 9 minus 4.

**7. Write it yourself**
Show the result of 7 times 6.
Accepted: the program prints `42`.
```python
print(7 * 6)
```
```output
42
```

Hint: Python uses * for times. Put it between the two numbers inside print.

**Recap**
`+ - * / **` do maths. `/` always gives a float.

---

## Lesson 3.2: Whole-number division and remainder

**Teach**
Two more operators are very useful.

- `//` divides and keeps only the whole part.
- `%` gives the remainder, the amount left over.

```python
print(7 // 2)
print(7 % 2)
```
```output
3
1
```

7 split into groups of 2 makes 3 full groups, with 1 left over.

A handy trick: `n % 2` is 0 when n is even and 1 when n is odd.

**1. Predict the output**
```python
print(7 // 2)
```
```output
3
```
- A) 1
- B) 3
- C) 4
- D) 3.5
Answer: B
Why: // keeps only the whole part of the answer.

**2. Predict the output**
```python
print(7 % 2)
```
```output
1
```
- A) 0
- B) 1
- C) 3.5
- D) 3
Answer: B
Why: % gives what is left over. 7 minus 3 groups of 2 leaves 1.

**3. Predict the output**
```python
print(10 % 3)
```
```output
1
```
- A) 3.33
- B) 3
- C) 0
- D) 1
Answer: D
Why: 10 is 3 groups of 3 (that is 9), and 1 is left over.

**4. Pick one**
A bag holds 4 cookies. You have 14 cookies. Which expression gives the number of full bags?
- A) `14 % 4`
- B) `14 // 4`
- C) `14 - 4`
- D) `14 / 4`
Answer: B
Why: // gives the whole number of groups, which is 3.

**5. Pick one**
Same cookies. Which expression gives how many cookies are left over?
- A) `14 % 4`
- B) `14 // 4`
- C) `14 / 4`
- D) `14 - 4`
Answer: A
Why: % gives the remainder, which is 2.

**6. Predict the output**
```python
print(8 % 2)
```
```output
0
```
- A) 1
- B) 4
- C) 0
- D) 2
Answer: C
Why: 8 divides by 2 with nothing left over, so the remainder is 0. That is how you can tell a number is even.

**7. Write it yourself**
There are 135 minutes. Show how many minutes are left over after taking out whole hours (60 minutes each).
Accepted: the program prints `15`.
```python
print(135 % 60)
```
```output
15
```
Hint: the leftover is a remainder.

**Recap**
`//` gives the whole part, `%` gives the remainder. `n % 2` is 0 for even numbers.

---

## Lesson 3.3: Order of operations and brackets

**Teach**
When a line has several operators, Python does not just go left to right.

1. Brackets `( )` first.
2. Then `**`.
3. Then `*`, `/`, `//` and `%`.
4. Then `+` and `-`.

Operators at the same level go left to right.

```python
print(2 + 3 * 4)
print((2 + 3) * 4)
```
```output
14
20
```

In the first line, `3 * 4` happens before the add. Brackets change the order.

**1. Predict the output**
```python
print(2 + 3 * 4)
```
```output
14
```
- A) 20
- B) 14
- C) 9
- D) 24
Answer: B
Why: Multiply comes before add, so 3 times 4 is 12, then 2 plus 12 is 14.

**2. Predict the output**
```python
print((2 + 3) * 4)
```
```output
20
```
- A) 24
- B) 9
- C) 14
- D) 20
Answer: D
Why: Brackets go first, so 2 plus 3 is 5, then 5 times 4 is 20.

**3. Predict the output**
```python
print(10 - 4 / 2)
```
```output
8.0
```
- A) 8.0
- B) 3.0
- C) 3
- D) 8
Answer: A
Why: Divide first, 4 / 2 is 2.0. Then 10 minus 2.0 is 8.0. Dividing makes a float, so the answer is a float.

**4. Predict the output**
```python
print(100 - 20 * 2)
```
```output
60
```
- A) 120
- B) 160
- C) 40
- D) 60
Answer: D
Why: Multiply first, 20 times 2 is 40. Then 100 minus 40 is 60.

**5. Predict the output**
```python
print(8 / 2 * 2)
```
```output
8.0
```
- A) 2
- B) 2.0
- C) 8.0
- D) 8
Answer: C
Why: / and * are at the same level, so Python goes left to right. 8 / 2 is 4.0, then 4.0 times 2 is 8.0.

**6. Pick one**
You want the line to show 20. Which version works?
Starting line: `print(2 + 3 * 4)`
- A) `print(2 + 3 * 4)`
- B) `print((2 + 3) * 4)`
- C) `print(2 + 3 * (4))`
- D) `print(2 + (3 * 4))`
Answer: B
Why: The brackets make the add happen first, giving 5 times 4.

**7. Write it yourself**
Show the average of 6 and 10. Add them, then divide by 2.
Accepted: the program prints `8.0`.
```python
print((6 + 10) / 2)
```
```output
8.0
```
Hint: the add must happen before the divide.

**Recap**
Brackets first, then `**`, then multiply and divide, then add and subtract. Brackets let you choose the order.

---

## Lesson 3.4: f-strings

**Teach**
In Unit 2, joining text and a number with `+` gave an error. There is a neater way: an f-string.

Put the letter `f` before the opening quote. Then anything inside `{ }` is replaced by its value.

```python
name = "Sam"
age = 12
print(f"{name} is {age} years old")
```
```output
Sam is 12 years old
```

You can even do maths inside the braces:

```python
a = 3
b = 4
print(f"{a} + {b} = {a + b}")
```
```output
3 + 4 = 7
```

Without the `f`, the braces are shown as they are.

**1. Predict the output**
```python
name = "Sam"
print(f"Hi {name}")
```
```output
Hi Sam
```
- A) An error
- B) Hi Sam
- C) Hi {name}
- D) Hi name
Answer: B
Why: The f makes Python swap {name} for the value stored in name.

**2. Predict the output**
```python
a = 3
b = 4
print(f"{a} + {b} = {a + b}")
```
```output
3 + 4 = 7
```
- A) An error
- B) 3 + 4 = a + b
- C) 3 + 4 = 7
- D) 7
Answer: C
Why: Each {} is replaced by its value. {a + b} is worked out first, so it shows 7.

**3. Predict the output**
Look carefully. There is no f.
```python
name = "Sam"
print("Hi {name}")
```
```output
Hi {name}
```
- A) Hi Sam
- B) Hi name
- C) An error
- D) Hi {name}
Answer: D
Why: Without the f in front, Python shows the text exactly as written, braces included.

**4. Fill the blank**
Which letter goes in front of the quote?
`print(___"Score: {score}")`
- A) p
- B) f
- C) x
- D) s
Answer: B
Why: The letter f turns the text into an f-string.

**5. Fix the bug**
This gives a TypeError. Which line fixes it?
```error TypeError
age = 12
print("Age: " + age)
```
- A) `print("Age: " age)`
- B) `print(Age: age)`
- C) `print("Age: " + "age")`
- D) `print(f"Age: {age}")`
Answer: D
Why: An f-string puts the number into the text. Joining with the quoted word "age" would show the word age, not 12.

**6. Predict the output**
```python
price = 2.5
print(f"Price: {price}")
```
```output
Price: 2.5
```
- A) An error
- B) Price: 2.5
- C) Price: price
- D) Price: {price}
Answer: B
Why: The value inside price is put in place of {price}.

**7. Write it yourself**
Use an f-string to show Mia is 9 years old.
Starter:
```
name = "Mia"
age = 9
```
Accepted: the program prints `Mia is 9 years old`.
```python
name = "Mia"
age = 9
print(f"{name} is {age} years old")
```
```output
Mia is 9 years old
```

Hint: Start the text with the letter f, and put each value inside curly braces, like {name}.

**Recap**
`f"..."` lets you put values inside `{ }`. It works with text and numbers, with no `+` needed.

---

## Lesson 3.5: Converting types

**Teach**
Sometimes you have text but you need a number, or the other way round. These functions change the type.

- `int("5")` turns text into a whole number.
- `float("2.5")` turns text into a decimal.
- `str(5)` turns a number into text.
- `int(3.9)` cuts off the decimals and gives `3`.

```python
print(int("5") + 1)
print(str(5) + "1")
print(int(3.9))
```
```output
6
51
3
```

If the text is not a number, you get an error. `int("abc")` fails with a `ValueError`.

One more surprise: text times a number repeats the text. `"ha" * 3` is `hahaha`.

**1. Predict the output**
```python
print(int("5") + 1)
```
```output
6
```
- A) 5 + 1
- B) An error
- C) 51
- D) 6
Answer: D
Why: int("5") is the number 5, and then 1 is added.

**2. Predict the output**
```python
print(str(5) + "1")
```
```output
51
```
- A) 6
- B) An error
- C) 51
- D) 5 + 1
Answer: C
Why: str(5) is the text "5". Joined with "1" it becomes 51.

**3. Predict the output**
```python
print(int(3.9))
```
```output
3
```
- A) An error
- B) 3
- C) 3.9
- D) 4
Answer: B
Why: int() cuts off the decimal part. It does not round.

**4. Predict the output**
```python
print(float("2.5") * 2)
```
```output
5.0
```
- A) 5
- B) An error
- C) 5.0
- D) 2.52
Answer: C
Why: float("2.5") is the number 2.5. Times 2 is 5.0, which is a float.

**5. Predict**
What happens when this runs?
```error ValueError
print(int("abc"))
```
- A) It gives a ValueError
- B) It shows abc
- C) It shows nothing
- D) It shows 0
Answer: A
Why: "abc" is not a number, so int() cannot turn it into one.

**6. Pick one**
The person types 7. Which line gives you a number you can do maths with?
- A) `n = str(input())`
- B) `n = input()`
- C) `n = int(input())`
- D) `n = print(input())`
Answer: C
Why: input() gives text. int() turns it into a number.

**7. Predict the output**
The person types 4.
```python inputs=4
n = input()
print(n * 2)
```
```output
44
```
- A) 8
- B) An error
- C) 4 * 2
- D) 44
Answer: D
Why: n is text, not a number, so times 2 repeats the text: "4" twice, 44. With int() it would be 8.

**Recap**
`int()`, `float()` and `str()` change the type. `input()` always gives text, so wrap it in `int()` or `float()` for maths.

---

## Unit 3 project: A terminal calculator

**Goal**
Ask for two whole numbers. Then show their sum, difference, product and quotient, one per line.

If the person types 12 and 4, the program shows:
```
12 + 4 = 16
12 - 4 = 8
12 * 4 = 48
12 / 4 = 3.0
```

**Guided steps**
1. Ask for the first number and turn it into an int: `a = int(input("First number? "))`
2. Ask for the second number in the same way and store it in `b`.
3. Show the sum with an f-string: `print(f"{a} + {b} = {a + b}")`
4. Add three more lines for subtract, multiply and divide.

**Accepted**
```python inputs=12,4
a = int(input("First number? "))
b = int(input("Second number? "))
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
```
```output
12 + 4 = 16
12 - 4 = 8
12 * 4 = 48
12 / 4 = 3.0
```
```python inputs=7,2
a = int(input("First number? "))
b = int(input("Second number? "))
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
```
```output
7 + 2 = 9
7 - 2 = 5
7 * 2 = 14
7 / 2 = 3.5
```
Note: if the second number is 0 the divide line gives a ZeroDivisionError. That is a good thing to show later, in the debugging unit.

**Recap**
You used input, int, f-strings and the maths operators together.

---

## Unit 3 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (3.1)** What does this show?
```python
print(9 + 4)
```
```output
13
```
- A) 13
- B) 5
- C) 36
- D) 94
Answer: A

**Q2 (3.1)** What does this show?
```python
print(3 * 5)
```
```output
15
```
- A) 8
- B) 15
- C) 35
- D) 2
Answer: B

**Q3 (3.1)** What does this show?
```python
print(8 / 2)
```
```output
4.0
```
- A) 16
- B) 4
- C) 6
- D) 4.0
Answer: D

**Q4 (3.1)** What does this show?
```python
print(3 ** 2)
```
```output
9
```
- A) 6
- B) 9
- C) 32
- D) 5
Answer: B

**Q5 (3.2)** What does this show?
```python
print(9 // 2)
```
```output
4
```
- A) 4.5
- B) 5
- C) 4
- D) 1
Answer: C

**Q6 (3.2)** What does this show?
```python
print(9 % 2)
```
```output
1
```
- A) 1
- B) 4
- C) 0
- D) 4.5
Answer: A

**Q7 (3.2)** Which expression is 0 for every even number n?
- A) `n - 2`
- B) `n % 2`
- C) `n * 2`
- D) `n // 2`
Answer: B

**Q8 (3.3)** What does this show?
```python
print(1 + 2 * 3)
```
```output
7
```
- A) 9
- B) 7
- C) 6
- D) 5
Answer: B

**Q9 (3.3)** What does this show?
```python
print((1 + 2) * 3)
```
```output
9
```
- A) 6
- B) 9
- C) 5
- D) 7
Answer: B

**Q10 (3.3)** What does this show?
```python
print(10 - 2 * 3)
```
```output
4
```
- A) 16
- B) 4
- C) 8
- D) 24
Answer: B

**Q11 (3.3)** What does this show?
```python
print(12 / 4 * 3)
```
```output
9.0
```
- A) 1.0
- B) 9
- C) 9.0
- D) 1
Answer: C

**Q12 (3.4)** What does this show?
```python
n = "Ana"
print(f"Hi {n}")
```
```output
Hi Ana
```
- A) Hi n
- B) An error
- C) Hi Ana
- D) Hi {n}
Answer: C

**Q13 (3.4)** What does this show?
```python
x = 2
print(f"{x} + {x} = {x + x}")
```
```output
2 + 2 = 4
```
- A) An error
- B) 2 + 2 = 2 + 2
- C) 2 + 2 = 4
- D) 4
Answer: C

**Q14 (3.4)** What does this show?
```python
n = "Ana"
print("Hi {n}")
```
```output
Hi {n}
```
- A) An error
- B) Hi {n}
- C) Hi Ana
- D) Hi n
Answer: B

**Q15 (3.5)** What does this show?
```python
print(int("8") * 2)
```
```output
16
```
- A) 16
- B) An error
- C) 88
- D) 8 * 2
Answer: A

**Q16 (3.5)** What does this show?
```python
print(str(8) + "2")
```
```output
82
```
- A) 8 + 2
- B) 82
- C) 10
- D) An error
Answer: B

**Q17 (3.5)** What does this show?
```python
print(int(7.9))
```
```output
7
```
- A) 7.9
- B) 7
- C) An error
- D) 8
Answer: B

**Q18 (3.5)** The person types 3. What does this show?
```python inputs=3
n = input()
print(n * 3)
```
```output
333
```
- A) 9
- B) 333
- C) 3 * 3
- D) An error
Answer: B

**Q19 (3.5)** The person types 3. What does this show?
```python inputs=3
n = int(input())
print(n * 3)
```
```output
9
```
- A) 9
- B) 333
- C) An error
- D) 3 * 3
Answer: A

**Q20 (mixed)** What does this show?
```python
a = 20
b = 6
print(f"{a // b} and {a % b}")
```
```output
3 and 2
```
- A) An error
- B) 3 and 2
- C) 3.33 and 2
- D) 14 and 120
Answer: B
Why: 20 split into groups of 6 makes 3 full groups, with 2 left over.

**Q21 (3.1)** What does this show?
```python
print(6 * 7)
```
```output
42
```
- A) An error
- B) 42
- C) 67
- D) 13
Answer: B

**Q22 (3.2)** What does this show?
```python
print(17 % 5)
```
```output
2
```
- A) 3
- B) 12
- C) 3.4
- D) 2
Answer: D

**Q23 (3.3)** What does this show?
```python
print(8 - 2 * 3)
```
```output
2
```
- A) 6
- B) 2
- C) 14
- D) 18
Answer: B

**Q24 (3.4)** What does this show?
```python
item = "tea"
price = 3
print(f"{item} costs {price}")
```
```output
tea costs 3
```
- A) An error
- B) {item} costs {price}
- C) tea costs 3
- D) item costs price
Answer: C

**Q25 (3.5)** What does this show?
```python
print(int("12") + int("8"))
```
```output
20
```
- A) 128
- B) An error
- C) 12 + 8
- D) 20
Answer: D

Note: this bank has 25 questions.
