# Python, Unit 1: Hello, Python

Format notes (for whoever builds the app):
- Each lesson has teach text, then exercises. The app shuffles option order and the order-the-lines pieces.
- A `python` block followed by an `output` block means "this code prints exactly this". `inputs=` lists what the user types. A block labelled `error NameError` means "this code must fail with that error". `check.py` runs every one of them.
- "Answer" is the correct option. "Why" is shown after the answer, right or wrong. Wrong answers get the Why in a coral bar, right answers in a green bar.
- Typed exercises show a starter, a reference solution and the accepted output. The app compares what the code prints, not how it is written.

---

## Lesson 1.1: What is a program?

**Teach**
A program is a list of instructions.

The computer follows them one at a time, from the first to the last. It does exactly what you wrote. It never guesses what you meant.

Think of a recipe. Step 1, step 2, step 3. A program works the same way, only much faster.

**1. Pick one**
What is a program?
- A) A list of instructions a computer follows
- B) A kind of screen
- C) A type of keyboard
- D) A website
Answer: A
Why: A program is a list of instructions. The computer follows them in order.

**2. True or false**
If an instruction is unclear, the computer guesses what you meant.
Answer: False
Why: The computer does exactly what you wrote. If an instruction is unclear, it stops or does something you did not want.

**3. Put in order**
Put these steps for making tea in the order a program would follow them.
Correct order:
1. Boil the water
2. Put a tea bag in the cup
3. Pour the water into the cup
4. Wait two minutes
5. Take out the tea bag
Why: Order matters. Pouring water before the tea bag is in the cup gives a different result.

**4. Pick one**
Which instruction is clear enough for a computer?
- A) Do the usual
- B) Put two slices of bread on a plate, then put cheese on one slice, then close the sandwich
- C) Surprise me
- D) Make me something nice
Answer: B
Why: The computer needs exact steps. The sandwich instruction says what to do, in what order, with what.

**5. Match**
Match each word to its meaning.
- Program: a list of instructions
- Instruction: one small step
- Output: what the program shows you
- Bug: a mistake in a program
Why: You will use these four words all the time.

**6. Pick one**
What can happen if the steps are in the wrong order?
- A) The computer fixes the order for you
- B) The computer ignores the program
- C) Nothing, order does not matter
- D) The program may do the wrong thing
Answer: D
Why: The computer follows the steps in the order you wrote them. A wrong order gives a wrong result.

**Recap**
A program is a list of instructions. The computer follows them in order and takes everything literally.

---

## Lesson 1.2: Your first print

**Teach**
Python is a language we use to give the computer instructions.

The `print` instruction shows something on the screen. Here is a whole program with one line:

```python
print("Hello, world!")
```
```output
Hello, world!
```

Three things to notice:
- The word `print`, all lowercase.
- Brackets `( )` around what you want to show.
- Quote marks `" "` around text. The quotes tell Python "this is text". They do not show up on the screen.

**1. Predict the output**
What does this program show?
```python
print("Hi")
```
```output
Hi
```
- A) "Hi"
- B) Hi
- C) print
- D) Hi!
Answer: B
Why: The quotes mark the text. They are not part of what is shown.

**2. Fill the blank**
Which word goes in the blank?
`___("Hello")`
- A) show
- B) say
- C) echo
- D) print
Answer: D
Why: In Python, the instruction that shows text on the screen is `print`.

**3. Predict the output**
```python
print("Python is fun")
```
```output
Python is fun
```
- A) print("Python is fun")
- B) Python is fun
- C) "Python is fun"
- D) Nothing
Answer: B
Why: print shows the text between the quotes.

**4. Pick one**
Which line will show Hi on the screen?
- A) `Print("Hi")`
- B) `print("Hi")`
- C) `print(Hi)`
- D) `print "Hi"`
Answer: B
Why: `Print("Hi")` has a capital P, and Python cares about capitals. `print(Hi)` is missing the quotes, so Python thinks Hi is a name. `print "Hi"` is missing the brackets.

**5. True or false**
The quote marks are shown on the screen when you print text.
Answer: False
Why: The quotes only tell Python where the text starts and ends.

**6. Predict the output**
```python
print("2 + 2")
```
```output
2 + 2
```
- A) 4
- B) "2 + 2"
- C) 2 + 2
- D) An error
Answer: C
Why: Inside quotes it is just text. Python does not do any maths with it, it just shows it.

**7. Write it yourself**
Write one line of code that shows Hello.
Starter: (empty)
Accepted: the program prints exactly `Hello`.
```python
print("Hello")
```
```output
Hello
```
Hint: remember the quotes and the brackets.

**Recap**
`print("text")` shows text on the screen. Use brackets, and put text in quotes.

---

## Lesson 1.3: Running code and reading output

**Teach**
Python reads your program from the top line to the bottom line, one line at a time.

Every `print` starts a new line on the screen.

```python
print("A")
print("B")
print("C")
```
```output
A
B
C
```

Read the program like you read a page: top to bottom.

**1. Predict the output**
```python
print("One")
print("Two")
```
```output
One
Two
```
- A) OneTwo on one line
- B) Only Two
- C) Two, then One on the next line
- D) One, then Two on the next line
Answer: D
Why: Python runs the top line first, and each print starts a new line.

**2. Put in order**
Put the lines in the right order so the program shows 1, then 2, then 3.
Pieces: `print("2")`, `print("3")`, `print("1")`
Correct order:
1. `print("1")`
2. `print("2")`
3. `print("3")`
Why: The output follows the order of the lines.

**3. Predict the output**
```python
print("Hi")
print("Hi")
print("Bye")
```
```output
Hi
Hi
Bye
```
- A) Hi, Bye (two lines)
- B) Hi, Hi, Bye (three lines)
- C) HiHiBye
- D) Bye, Hi, Hi
Answer: B
Why: There are three print lines, so there are three lines of output.

**4. Pick one**
How many lines of output does this program make?
```python
print("Go")
print("Go")
print("Go")
```
```output
Go
Go
Go
```
- A) 1
- B) 3
- C) 2
- D) 6
Answer: B
Why: Each print makes one line, and there are three prints.

**5. True or false**
Python runs the last line of a program first.
Answer: False
Why: Python starts at the top and works down.

**6. Write it yourself**
Write two lines of code. The first shows Hello, the second shows World, each on its own line.
Accepted: the program prints `Hello` then `World` on the next line.
```python
print("Hello")
print("World")
```
```output
Hello
World
```
Hint: you need two print lines.

**Recap**
Python runs top to bottom. Each `print` is its own line of output.

---

## Lesson 1.4: Comments

**Teach**
Sometimes you want to write a note in your code, for people. A line that starts with `#` is a comment. Python skips it completely.

```python
# This line is a note
print("Hello")  # this note is at the end of a line
```
```output
Hello
```

Comments explain what the code is for. They do not change what the program does.

**1. Pick one**
Which line does Python skip?
```
print("Hi")
# say hello
print("Bye")
```
- A) Line 1
- B) Line 2
- C) Line 3
- D) None of them
Answer: B
Why: A line that starts with # is a comment, and Python ignores it.

**2. Predict the output**
```python
print("Red")
# print("Green")
print("Blue")
```
```output
Red
Blue
```
- A) An error
- B) Red, Blue
- C) Red, Green, Blue
- D) Green only
Answer: B
Why: The Green line starts with #, so it is a comment. Python never runs it.

**3. True or false**
A comment changes what the program shows.
Answer: False
Why: Comments are only notes for people. Python skips them.

**4. Pick one**
Why do programmers write comments?
- A) To make the program faster
- B) To change the colors
- C) To explain code to people reading it
- D) To stop errors
Answer: C
Why: Comments help you and others understand the code later.

**5. Predict the output**
```python
print("A")  # print("B")
```
```output
A
```
- A) A then B
- B) B
- C) A
- D) An error
Answer: C
Why: Everything after the # on that line is a comment, so print("B") never runs.

**6. Write it yourself**
Add a comment line above the print line. The program must still show Hi.
Starter:
```
print("Hi")
```
Accepted: the code has a line that starts with `#`, and the program prints exactly `Hi`.
```python
# greet the user
print("Hi")
```
```output
Hi
```

Hint: Start the new line with # and a space, then write your note. Put it above the print line.

**Recap**
`#` starts a comment. Python skips it, and it is only for people.

---

## Lesson 1.5: Your first error

**Teach**
Everyone gets errors, including experts. An error is not a failure. It is Python telling you what to fix.

An error message says what kind of mistake it is, and which line.

Three mistakes you will meet a lot:

A missing closing quote:
```error SyntaxError
print("Hello)
```
Python says: `SyntaxError: unterminated string literal`

A missing closing bracket:
```error SyntaxError
print("Hello"
```
Python says: `SyntaxError: '(' was never closed`

A wrong word:
```error NameError
prnt("Hello")
```
Python says: `NameError: name 'prnt' is not defined`, and often adds a helpful hint: `Did you mean: 'print'?`

Read the last line first. It tells you the kind of mistake.

**1. Match**
Match each error message to its cause.
- `unterminated string literal`: you forgot the closing quote
- `'(' was never closed`: you forgot the closing bracket
- `name 'prnt' is not defined`: you spelled a word wrong
Why: Reading the message tells you what to look for.

**2. Find the bug**
This line has an error. What is wrong?
```
print("Hello)
```
- A) There are too many brackets
- B) Nothing is wrong
- C) The word print is spelled wrong
- D) The closing quote is missing
Answer: D
Why: The text starts with a quote but never ends with one.

**3. Find the bug**
What is wrong with this line?
```
print("Hello"
```
- A) The quotes are missing
- B) The closing bracket is missing
- C) print needs a capital P
- D) Nothing is wrong
Answer: B
Why: The bracket opened with `(` is never closed with `)`.

**4. Find the bug**
Python says `NameError: name 'prnt' is not defined`. What is the fix?
```
prnt("Hi")
```
- A) Add a comment
- B) Change prnt to print
- C) Remove the quotes
- D) Add a second bracket
Answer: B
Why: prnt is a typo. Python does not know a word called prnt.

**5. Pick one**
Python shows an error. What do you do first?
- A) Read the message and find the line number
- B) Delete the whole program
- C) Restart the computer
- D) Give up
Answer: A
Why: The message tells you the kind of mistake and the line to look at.

**6. Pick one**
Which of these lines runs without an error?
- A) `print("Hi)`
- B) `Print("Hi")`
- C) `print("Hi"`
- D) `print("Hi")`
Answer: D
Why: `print("Hi)` misses a quote, `Print("Hi")` has a capital P, and `print("Hi"` misses the closing bracket.

**7. Fix it yourself**
This program has an error. Change it so it shows Hello.
Starter:
```
print("Hello)
```
Accepted: the program prints exactly `Hello`.
```python
print("Hello")
```
```output
Hello
```

Hint: Look at the end of the text inside the brackets. Something is missing there.

**Recap**
An error is a helpful message. Read it, find the line, fix the mistake.

---

## Unit 1 checkpoint quiz bank

Draw 10 at random for each attempt. Pass is 7 of 10. Each question links back to its lesson for review.

**Q1 (1.1)** What is a program?
- A) A type of cable
- B) A game
- C) A list of instructions a computer follows
- D) A kind of screen
Answer: C

**Q2 (1.1)** True or false: the computer guesses what you meant.
Answer: False

**Q3 (1.1)** Why does the order of steps matter?
- A) The computer sorts them for you
- B) It does not matter
- C) The computer follows them in the order written
- D) The computer skips every second one
Answer: C

**Q4 (1.2)** Which instruction shows text on the screen?
- A) write
- B) display
- C) print
- D) show
Answer: C

**Q5 (1.2)** What does this show?
```python
print("Hello, world!")
```
```output
Hello, world!
```
- A) print
- B) Nothing
- C) "Hello, world!"
- D) Hello, world!
Answer: D

**Q6 (1.2)** Why are quotes needed around text?
- A) They are shown on the screen
- B) They are not needed
- C) They tell Python where the text starts and ends
- D) They make the text bold
Answer: C

**Q7 (1.2)** What does this show?
```python
print("3 + 4")
```
```output
3 + 4
```
- A) 7
- B) 34
- C) An error
- D) 3 + 4
Answer: D

**Q8 (1.3)** What does this show?
```python
print("X")
print("Y")
```
```output
X
Y
```
- A) XY on one line
- B) Only X
- C) X then Y on the next line
- D) Y then X
Answer: C

**Q9 (1.3)** How many lines of output?
```python
print("a")
print("b")
print("c")
print("d")
```
```output
a
b
c
d
```
- A) 2
- B) 8
- C) 1
- D) 4
Answer: D

**Q10 (1.3)** In which order does Python run the lines?
- A) Top to bottom
- B) Bottom to top
- C) Random
- D) Shortest first
Answer: A

**Q11 (1.4)** What does a line starting with # do?
- A) Prints the line
- B) Stops the program
- C) Nothing, it is a note Python skips
- D) Makes an error
Answer: C

**Q12 (1.4)** What does this show?
```python
print("1")
# print("2")
print("3")
```
```output
1
3
```
- A) 1, 2, 3
- B) 2 only
- C) An error
- D) 1 then 3
Answer: D

**Q13 (1.4)** True or false: a comment changes what a program does.
Answer: False

**Q14 (1.5)** What is wrong with `print("Hi)`?
- A) print is spelled wrong
- B) Nothing
- C) A closing quote is missing
- D) A bracket is missing
Answer: C

**Q15 (1.5)** `prnt("Hi")` gives a NameError. What is the fix?
- A) Spell it print
- B) Add quotes
- C) Add a comment
- D) Remove the brackets
Answer: A

**Q16 (1.5)** What should you read first when you get an error?
- A) Nothing, just retry
- B) The last line of the message
- C) The first word of your program
- D) The comments
Answer: B

**Q17 (1.5)** True or false: errors mean you are bad at coding.
Answer: False
Why: Everyone gets errors. They are messages that help you fix the problem.

**Q18 (mixed)** Which line shows Hello?
- A) `print "Hello"`
- B) `Print("Hello")`
- C) `print(Hello)`
- D) `print("Hello")`
Answer: D

**Q19 (mixed)** What does this show?
```python
print("Hi")
print("Hi")
```
```output
Hi
Hi
```
- A) One Hi
- B) Hi on two lines
- C) An error
- D) HiHi on one line
Answer: B

**Q20 (mixed)** What does this show?
```python
# say hi
print("Hi")
```
```output
Hi
```
- A) say hi
- B) Hi
- C) say hi then Hi
- D) An error
Answer: B

**Q21 (1.1)** What is "output"?
- A) What you type into the program
- B) A mistake in the program
- C) What the program shows you
- D) A list of instructions
Answer: C

**Q22 (1.2)** What does this show?
```python
print("Python")
```
```output
Python
```
- A) print
- B) An error
- C) "Python"
- D) Python
Answer: D

**Q23 (1.3)** What does this show?
```python
print("x")
print("y")
print("x")
```
```output
x
y
x
```
- A) x, y, x (three lines)
- B) x, x, y (three lines)
- C) An error
- D) xyx (one line)
Answer: A

**Q24 (1.4)** What does this show?
```python
print("Hi")  # print("Bye")
```
```output
Hi
```
- A) Hi
- B) Hi, then Bye
- C) An error
- D) Bye
Answer: A

**Q25 (1.5)** Which line is missing its closing bracket?
- A) `print "Hi"`
- B) `print("Hi"`
- C) `Print("Hi")`
- D) `print("Hi")`
Answer: B

Note: this bank has 25 questions.
