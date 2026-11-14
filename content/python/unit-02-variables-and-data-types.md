# Python, Unit 2: Variables and data types

Format notes: same as Unit 1. A `python inputs=a,b` block means the user types `a`, then `b`. `check.py` replaces `input()` so the prompt text is not part of the output.

---

## Lesson 2.1: Variables are labeled boxes

**Teach**
A variable is a labeled box. It holds one value, and the label is its name.

```python
name = "Sam"
print(name)
```
```output
Sam
```

The `=` does not mean "equals" here. It means "put this value in the box".

Look at the difference:
- `print(name)` shows what is inside the box.
- `print("name")` shows the word name, because the quotes make it plain text.

**1. Predict the output**
```python
name = "Mia"
print(name)
```
```output
Mia
```
- A) "Mia"
- B) An error
- C) Mia
- D) name
Answer: C
Why: print(name) shows what is stored in the variable name.

**2. Predict the output**
```python
pet = "cat"
print("pet")
```
```output
pet
```
- A) "pet"
- B) cat
- C) An error
- D) pet
Answer: D
Why: The quotes make pet plain text, so Python shows the word instead of looking in the box.

**3. Pick one**
What is stored in score after this line?
`score = 10`
- A) score
- B) Nothing
- C) "score"
- D) 10
Answer: D
Why: The value on the right of the = goes into the variable on the left.

**4. Fill the blank**
Which goes in the blank to show Alex?
```
player = "Alex"
print(___)
```
- A) player
- B) Alex
- C) "player"
- D) Player
Answer: A
Why: Using the variable name without quotes shows what is stored in it.

**5. Predict the output**
A variable can change.
```python
city = "Paris"
print(city)
city = "Rome"
print(city)
```
```output
Paris
Rome
```
- A) Paris then Paris
- B) Rome then Rome
- C) Paris then Rome
- D) An error
Answer: C
Why: The first print shows Paris. Then Rome replaces Paris in the box, so the second print shows Rome.

**6. Put in order**
Put the lines in the right order so the program shows Sam.
Pieces: `print(name)`, `name = "Sam"`
Correct order:
1. `name = "Sam"`
2. `print(name)`
Why: A variable must exist before you use it.

**7. True or false**
`print(name)` shows the word name on the screen.
Answer: False
Why: It shows what is stored in the variable. To show the word, you would write `print("name")`.

**Recap**
A variable is a labeled box. `=` puts a value in. Use the name without quotes to get the value out.

---

## Lesson 2.2: Naming variables

**Teach**
You choose the name of a variable. There are a few rules.

- Use letters, numbers and underscores `_`.
- Do not start with a number.
- No spaces. Use an underscore instead: `player_score`.
- Capital letters matter. `Name` and `name` are different variables.

Good names say what is inside. `price` is better than `p`.

```python
player_score = 5
print(player_score)
```
```output
5
```

**1. Pick one**
Which is a valid variable name?
- A) my_name
- B) my name
- C) my-name
- D) 2cool
Answer: A
Why: `2cool` starts with a number. `my name` has a space. `my-name` has a dash, which Python reads as minus.

**2. Pick one**
Which is the clearest name for the price of a pizza?
- A) pizza_price
- B) x
- C) thing
- D) p
Answer: A
Why: A good name tells you what is stored.

**3. Fix the bug**
This line has an error. What is the fix?
```
player score = 5
```
- A) `"player score" = 5`
- B) `playerscore: 5`
- C) `player_score = 5`
- D) `player-score = 5`
Answer: C
Why: A variable name cannot have a space. An underscore fixes it.

**4. Predict**
What happens when this runs?
```error NameError
name = "Sam"
print(Name)
```
- A) It shows Name
- B) It gives an error
- C) It shows nothing
- D) It shows Sam
Answer: B
Why: Capitals matter. Name is a different variable from name, and Python has never heard of Name.

**5. True or false**
`my_score` and `My_score` are the same variable.
Answer: False
Why: A different capital letter makes a different name.

**6. Write it yourself**
Make a variable called age that stores 14. Then print it.
Accepted: the program prints `14` and the code contains `age =`.
```python
age = 14
print(age)
```
```output
14
```

Hint: Write the variable name, then =, then the number. Then print the variable name, without quotes.

**Recap**
Names use letters, numbers and underscores, never start with a number, and have no spaces. Capitals matter.

---

## Lesson 2.3: Numbers

**Teach**
Python has two kinds of numbers.
- A whole number, like `7`, is an `int`.
- A number with a decimal point, like `7.5`, is a `float`.

Numbers do not need quotes.

A variable can change. This line is very common:

```python
age = 15
age = age + 1
print(age)
```
```output
16
```

Read `age = age + 1` as: take what is in age, add 1, and put the result back in age.

**1. Match**
Match each number to its kind.
- `7`: int
- `7.5`: float
- `100`: int
- `0.25`: float
Why: A decimal point makes a float.

**2. Predict the output**
```python
x = 5
x = x + 3
print(x)
```
```output
8
```
- A) 53
- B) 3
- C) 8
- D) 5
Answer: C
Why: x starts at 5. Then 3 is added, and 8 goes back into x.

**3. Trace the variable**
Fill in what points holds after each line.
```python
points = 10
points = points + 5
points = points - 2
print(points)
```
```output
13
```
Answers: after line 1 it is 10, after line 2 it is 15, after line 3 it is 13.
Why: Each line uses the value from the line before.

**4. Predict the output**
```python
price = 2.5
print(price)
```
```output
2.5
```
- A) price
- B) 2
- C) 25
- D) 2.5
Answer: D
Why: print shows the number stored in price.

**5. Predict the output**
```python
a = 4
b = 6
print(a + b)
```
```output
10
```
- A) An error
- B) a + b
- C) 10
- D) 46
Answer: C
Why: With numbers, + adds. 4 plus 6 is 10.

**6. True or false**
`print(10)` and `print("10")` look the same on the screen.
Answer: True
Why: Both show 10. The difference is under the hood: one is a number and one is text. It matters when you do maths, which you will see soon.

**7. Write it yourself**
score starts at 0. Add 5 to it, then print score.
Starter:
```
score = 0
```
Accepted: the program prints `5`.
```python
score = 0
score = score + 5
print(score)
```
```output
5
```

Hint: Use the same pattern as `age = age + 1` from the lesson, with score and 5.

**Recap**
Whole numbers are int, decimals are float. A variable can change, like `age = age + 1`.

---

## Lesson 2.4: Text

**Teach**
Text in Python is called a string. It goes in quotes. Single quotes `'hi'` and double quotes `"hi"` both work.

You can join strings with `+`.

```python
first = "Hi"
second = "there"
print(first + " " + second)
```
```output
Hi there
```

Be careful: `"5"` in quotes is text, not a number. Joining two texts does not add them.

**1. Predict the output**
```python
print("Hi " + "Sam")
```
```output
Hi Sam
```
- A) Hi Sam
- B) Hi + Sam
- C) HiSam
- D) An error
Answer: A
Why: The + joins the two pieces. The space after Hi is part of the text.

**2. Predict the output**
```python
print("5" + "5")
```
```output
55
```
- A) 10
- B) An error
- C) 5 + 5
- D) 55
Answer: D
Why: Both are text, so + sticks them together.

**3. Predict the output**
```python
print(5 + 5)
```
```output
10
```
- A) An error
- B) 10
- C) 5 + 5
- D) 55
Answer: B
Why: These are numbers, not text. Numbers get added.

**4. Pick one**
Which of these is text?
- A) 4.2
- B) 42
- C) "42"
- D) True
Answer: C
Why: Quotes make it text, even if it looks like a number.

**5. Fill the blank**
Which joins the two pieces to show Goodnight?
`print("Good" ___ "night")`
- A) &
- B) -
- C) +
- D) *
Answer: C
Why: + joins text.

**6. Predict**
What happens when this runs?
```error TypeError
print("Age: " + 15)
```
- A) It shows Age: 15
- B) It shows 15
- C) It shows Age: 
- D) It gives an error
Answer: D
Why: Python cannot join text and a number with +. You will meet a neater way later.

**7. Write it yourself**
name holds Sam. Write one line that shows Hello, Sam by joining "Hello, " and name.
Starter:
```
name = "Sam"
```
Accepted: the program prints `Hello, Sam`.
```python
name = "Sam"
print("Hello, " + name)
```
```output
Hello, Sam
```

Hint: Join the two pieces with + inside print. Remember the space after the comma in "Hello, ".

**Recap**
Text is called a string and goes in quotes. `+` joins strings. `"5"` is not the number 5.

---

## Lesson 2.5: True or false, and type()

**Teach**
There is a third kind of value: `True` or `False`. It is called a boolean. It has a capital first letter, and it is not in quotes.

`type()` tells you what kind a value is.

```python
print(type("Hi"))
print(type(7))
print(type(7.5))
print(type(True))
```
```output
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
```

The four short names:
- `str` is text (string)
- `int` is a whole number
- `float` is a decimal number
- `bool` is True or False

**1. Match**
Match each value to its type.
- `"Hello"`: str
- `7`: int
- `7.5`: float
- `True`: bool
Why: These are the four kinds you know so far.

**2. Predict the output**
```python
print(type(3))
```
```output
<class 'int'>
```
- A) 3
- B) `<class 'str'>`
- C) `<class 'int'>`
- D) `<class 'float'>`
Answer: C
Why: 3 is a whole number.

**3. Predict the output**
```python
print(type("3"))
```
```output
<class 'str'>
```
- A) `<class 'float'>`
- B) `<class 'int'>`
- C) 3
- D) `<class 'str'>`
Answer: D
Why: The quotes make it text, so it is a str.

**4. Pick one**
Which is a boolean value in Python?
- A) Yes
- B) true
- C) "True"
- D) True
Answer: D
Why: A boolean is True or False with a capital letter and no quotes. "True" in quotes is text.

**5. Predict the output**
```python
is_ready = False
print(is_ready)
```
```output
False
```
- A) is_ready
- B) 0
- C) An error
- D) False
Answer: D
Why: print shows the value stored in is_ready.

**6. Predict the output**
```python
print(type(2.0))
```
```output
<class 'float'>
```
- A) `<class 'float'>`
- B) `<class 'str'>`
- C) 2
- D) `<class 'int'>`
Answer: A
Why: 2.0 has a decimal point, so it is a float, even though it is a whole value.

**7. Fix the bug**
This gives a NameError. What is the fix?
```error NameError
done = true
```
- A) `Done = true`
- B) `done = True`
- C) `done = "true"`
- D) `done = TRUE`
Answer: B
Why: Python only knows True with a capital T.

**Recap**
Four kinds so far: str, int, float, bool. `type()` tells you which.

---

## Lesson 2.6: Getting input

**Teach**
`input()` asks the person using your program to type something. The program waits until they press Enter.

```python inputs=Sam
name = input("Your name? ")
print("Hello, " + name)
```
```output
Hello, Sam
```

Here the person typed Sam.

Important: `input()` always gives you text, even if the person types a number. To turn it into a number, wrap it with `int()`:

```python inputs=12
age = int(input("Age? "))
print(age + 1)
```
```output
13
```

**1. Predict the output**
The person types Mia.
```python inputs=Mia
name = input("Name? ")
print("Hello, " + name)
```
```output
Hello, Mia
```
- A) Hello, Mia
- B) Name?
- C) Hello, name
- D) An error
Answer: A
Why: input gives back what was typed, and it is stored in name.

**2. Predict the output**
The person types 12.
```python inputs=12
age = input("Age? ")
print(type(age))
```
```output
<class 'str'>
```
- A) `<class 'str'>`
- B) An error
- C) 12
- D) `<class 'int'>`
Answer: A
Why: input always returns text, even when the person types a number.

**3. Predict the output**
The person types 3, then 4.
```python inputs=3,4
a = input()
b = input()
print(a + b)
```
```output
34
```
- A) a + b
- B) An error
- C) 7
- D) 34
Answer: D
Why: Both are text, so + joins them instead of adding.

**4. Fill the blank**
Which turns the typed text into a whole number?
`age = ___(input("Age? "))`
- A) str
- B) int
- C) print
- D) number
Answer: B
Why: int() turns text like "12" into the number 12.

**5. Fix the bug**
The person types 12 and this gives an error. What is the fix?
```error TypeError inputs=12
age = input("Age? ")
print(age + 1)
```
- A) `age = input(12)`
- B) `age = int(input("Age? "))`
- C) Remove the print
- D) `print(age + "1")`
Answer: B
Why: age is text, so adding 1 fails. int() turns it into a number first.

**6. Write it yourself**
Ask for a name. Then show Hello, followed by the name.
Accepted: when the person types Sam, the program prints `Hello, Sam`. When the person types Mia, it prints `Hello, Mia`.
```python inputs=Sam
name = input("Name? ")
print("Hello, " + name)
```
```output
Hello, Sam
```
```python inputs=Mia
name = input("Name? ")
print("Hello, " + name)
```
```output
Hello, Mia
```

Hint: Store what `input()` gives back in a variable first. Then join "Hello, " and that variable inside print.

**7. Mini project: about you**
Ask for a name, then ask for an age. Then show a sentence like Sam is 12 years old.
Accepted: when the person types Sam and 12, the program prints `Sam is 12 years old`.
```python inputs=Sam,12
name = input("Name? ")
age = input("Age? ")
print(name + " is " + age + " years old")
```
```output
Sam is 12 years old
```
```python inputs=Mia,9
name = input("Name? ")
age = input("Age? ")
print(name + " is " + age + " years old")
```
```output
Mia is 9 years old
```
Why: age stays as text here, so + can join all the pieces.

Hint: You need two `input()` lines, one for each question. Join all the pieces with +.

**Recap**
`input()` asks the user to type and always returns text. `int()` turns text into a whole number.

---

## Unit 2 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (2.1)** What does this show?
```python
x = "Hi"
print(x)
```
```output
Hi
```
- A) Hi
- B) An error
- C) x
- D) "Hi"
Answer: A

**Q2 (2.1)** What does this show?
```python
x = "Hi"
print("x")
```
```output
x
```
- A) x
- B) An error
- C) "x"
- D) Hi
Answer: A

**Q3 (2.1)** What does this show?
```python
color = "red"
color = "blue"
print(color)
```
```output
blue
```
- A) red
- B) red blue
- C) blue
- D) An error
Answer: C

**Q4 (2.1)** In `score = 10`, what does the `=` do?
- A) Puts the value 10 into the variable score
- B) Shows 10
- C) Checks that score equals 10
- D) Nothing
Answer: A

**Q5 (2.2)** Which is a valid variable name?
- A) total score
- B) 3rd_place
- C) total-score
- D) total_score
Answer: D

**Q6 (2.2)** True or false: `Name` and `name` are the same variable.
Answer: False

**Q7 (2.2)** Which name best describes a person's age?
- A) stuff
- B) x1
- C) a
- D) age
Answer: D

**Q8 (2.3)** What does this show?
```python
n = 2
n = n + 4
print(n)
```
```output
6
```
- A) 24
- B) 2
- C) 6
- D) 4
Answer: C

**Q9 (2.3)** Which is a float?
- A) True
- B) 5
- C) "5"
- D) 5.0
Answer: D

**Q10 (2.3)** What does this show?
```python
a = 10
b = 3
print(a - b)
```
```output
7
```
- A) An error
- B) 103
- C) 7
- D) 13
Answer: C

**Q11 (2.4)** What does this show?
```python
print("Hello, " + "Sam")
```
```output
Hello, Sam
```
- A) An error
- B) Hello, + Sam
- C) Hello Sam
- D) Hello, Sam
Answer: D

**Q12 (2.4)** What does this show?
```python
print("1" + "2")
```
```output
12
```
- A) 1 + 2
- B) An error
- C) 12
- D) 3
Answer: C

**Q13 (2.4)** What does this show?
```python
print(1 + 2)
```
```output
3
```
- A) 3
- B) 12
- C) An error
- D) 1 + 2
Answer: A

**Q14 (2.5)** What does this show?
```python
print(type(True))
```
```output
<class 'bool'>
```
- A) True
- B) `<class 'str'>`
- C) `<class 'bool'>`
- D) `<class 'int'>`
Answer: C

**Q15 (2.5)** Which is text?
- A) 3.0
- B) False
- C) 3
- D) "3"
Answer: D

**Q16 (2.5)** What does this show?
```python
print(type(3.5))
```
```output
<class 'float'>
```
- A) `<class 'str'>`
- B) `<class 'float'>`
- C) `<class 'int'>`
- D) 3.5
Answer: B

**Q17 (2.6)** What kind of value does input() always give?
- A) Text (str)
- B) A decimal
- C) True or False
- D) A whole number
Answer: A

**Q18 (2.6)** The person types 5 and 6. What does this show?
```python inputs=5,6
a = input()
b = input()
print(a + b)
```
```output
56
```
- A) 11
- B) a + b
- C) An error
- D) 56
Answer: D

**Q19 (2.6)** The person types 5 and 6. What does this show?
```python inputs=5,6
a = int(input())
b = int(input())
print(a + b)
```
```output
11
```
- A) 11
- B) An error
- C) 56
- D) a + b
Answer: A

**Q20 (mixed)** What does this show?
```python
name = "Mia"
print("Hi " + name)
```
```output
Hi Mia
```
- A) Hi Mia
- B) Hi name
- C) Hi + Mia
- D) An error
Answer: A

**Q21 (mixed)** Which line gives an error?
```error NameError
print(Total)
```
- A) `print(5)`
- B) `print("5")`
- C) `print("Total")`
- D) `print(Total)` when only `total = 5` exists
Answer: D

**Q22 (2.1)** What does this show?
```python
score = 3
score = 7
print(score)
```
```output
7
```
- A) 7
- B) 3
- C) An error
- D) 10
Answer: A

**Q23 (2.2)** Which is a valid variable name?
- A) 1st_name
- B) first name
- C) first_name
- D) first-name
Answer: C

**Q24 (2.3)** What does this show?
```python
x = 10
x = x - 4
print(x)
```
```output
6
```
- A) 10
- B) 6
- C) 14
- D) 4
Answer: B

**Q25 (2.4)** What does this show?
```python
print("Hi" + " " + "there")
```
```output
Hi there
```
- A) Hi + there
- B) Hithere
- C) Hi there
- D) An error
Answer: C

Note: this bank has 25 questions.
