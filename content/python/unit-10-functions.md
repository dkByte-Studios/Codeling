# Python, Unit 10: Functions

A function is a named group of steps you can use again and again. This unit builds up one idea at a time: why, how to define and call one, parameters, return, how functions work together, and the bugs that hide inside them. It ends with a small toolkit of useful functions.

Format notes: same as Units 1 to 9. The error messages quoted in the teach text are checked by `check.py`.

---

## Lesson 10.1: Why functions

**Teach**
Look at this program. It shows a little banner around a word, twice.

```python
print("=====")
print("Hello")
print("=====")
print("=====")
print("Bye")
print("=====")
```
```output
=====
Hello
=====
=====
Bye
=====
```

The same three steps appear twice. If you wanted 20 banners, you would write 60 lines. And if you decided to change the banner to `*****`, you would have to change it in every place.

A function fixes this. You write the steps once, give them a name, and then use that name whenever you need them.

```python
def banner(text):
    print("=====")
    print(text)
    print("=====")

banner("Hello")
banner("Bye")
```
```output
=====
Hello
=====
=====
Bye
=====
```

Same result, much shorter. Do not worry about how it works yet, the next lessons take it apart one piece at a time.

**1. Pick one**
What is a function?
- A) A type of number
- B) A named group of steps you can use again
- C) A comment
- D) A kind of error
Answer: B
Why: You write the steps once, give them a name, and use the name whenever you need them.

**2. Pick one**
Which is a benefit of a function?
- A) Errors disappear
- B) You write the steps once and use them many times
- C) You never need to test
- D) The program runs backwards
Answer: B
Why: Less typing, and less to read. It also means there is one place to fix a bug.

**3. Pick one**
You copied the same 5 lines into 4 places and then found a bug in them. With a function, how many places would you fix?
- A) 4
- B) 20
- C) 1
- D) 5
Answer: C
Why: The steps live in one place, the function. Fix them there and every use is fixed.

**4. Pick one**
Which job fits a function best?
- A) Showing a score box that appears in many places in a program
- B) Writing a comment
- C) Showing one line of text, one time
- D) Storing a single number
Answer: A
Why: If the same steps are needed in many places, a function saves you from repeating them.

**5. True or false**
Functions are only for experts.
Answer: False
Why: Beginners use functions too. You have already used some: `print`, `input`, `len` and `int` are all functions.

**6. Pick one**
You have already used functions. Which one of these is a function?
- A) `==`
- B) `+`
- C) `print`
- D) `#`
Answer: C
Why: print has a name and brackets, and you use it by writing its name. That is what a function looks like.

**Recap**
A function is a named group of steps. Write it once, use it many times.

---

## Lesson 10.2: def and calling

**Teach**
You create a function with `def`, short for define. Then you use it by writing its name with brackets. That is called calling the function.

```python
def say_hi():
    print("Hi!")

say_hi()
say_hi()
```
```output
Hi!
Hi!
```

Take it apart:
- `def say_hi():` is the first line. It has the word `def`, the name, brackets and a colon.
- The indented lines are the body, the steps the function runs.
- `say_hi()` calls the function, and the body runs.

Two things to remember:
- Writing the `def` does not run anything. It only teaches Python the steps. The steps run when you call the function.
- You need the brackets to call it. `say_hi` on its own does nothing.

Python reads from the top down. A function must be defined before it is called.

**1. Predict the output**
```python
def say_hi():
    print("Hi!")

say_hi()
say_hi()
```
```output
Hi!
Hi!
```
- A) Hi! once
- B) An error
- C) Nothing is shown
- D) Hi! twice
Answer: D
Why: The function is called twice, so its body runs twice.

**2. Predict the output**
```python
def say_hi():
    print("Hi!")
```
```output
```
- A) Nothing is shown
- B) An error
- C) Hi!
- D) say_hi
Answer: A
Why: The def only teaches Python the steps. Nothing calls the function, so nothing runs.

**3. Predict the output**
Look carefully at the last line.
```python
def say_hi():
    print("Hi!")

say_hi
```
```output
```
- A) Hi!
- B) say_hi
- C) Nothing is shown
- D) An error
Answer: C
Why: Without the brackets, the function is not called. You need `say_hi()`.

**4. Predict**
What happens when this runs?
```error NameError
say_hi()

def say_hi():
    print("Hi!")
```
- A) It shows nothing
- B) It gives a NameError
- C) It gives an IndentationError
- D) It shows Hi!
Answer: B
Why: Python reads from the top. When it reaches the call, it has not met the def yet, so it does not know the name say_hi.

**5. Put in order**
Put the lines in the right order so the program shows Hooray!
Pieces: `cheer()`, `def cheer():`, `    print("Hooray!")`
Correct order:
1. `def cheer():`
2. `    print("Hooray!")`
3. `cheer()`
Why: Define the function first, with its steps indented, then call it.

**6. Fill the blank**
Which word starts a function?
`___ cheer():`
- A) function
- B) def
- C) make
- D) fun
Answer: B
Why: In Python a function starts with def.

**7. Write it yourself**
Define a function called cheer that shows Hooray!. Then call it twice.
Accepted: the program prints `Hooray!` on two lines.
```python
def cheer():
    print("Hooray!")

cheer()
cheer()
```
```output
Hooray!
Hooray!
```

Hint: Start with `def cheer():`, then indent the print. Call it by writing `cheer()` twice.

**Recap**
`def name():` with an indented body defines a function. `name()` calls it. Define before you call, and do not forget the brackets.

---

## Lesson 10.3: Parameters

**Teach**
A function becomes much more useful when you can give it something to work with. The names you list in the brackets of the def line are called parameters. They act like variables that the caller fills in.

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Sam")
greet("Mia")
```
```output
Hello, Sam!
Hello, Mia!
```

Words to know:
- `name` in the def line is the parameter. It is a placeholder.
- `"Sam"` in `greet("Sam")` is the argument. It is the real value the function gets.

A function can have more than one parameter. Separate them with commas. The order matters: the first argument goes to the first parameter, and so on.

```python
def add(a, b):
    print(a + b)

add(3, 4)
```
```output
7
```

If you forget an argument, Python complains:

```error TypeError
def greet(name):
    print(f"Hello, {name}!")

greet()
```

Python says: `TypeError: greet() missing 1 required positional argument: 'name'`.

**1. Predict the output**
```python
def greet(name):
    print(f"Hello, {name}!")

greet("Sam")
greet("Mia")
```
```output
Hello, Sam!
Hello, Mia!
```
- A) An error
- B) Hello, Sam! only
- C) Hello, name! twice
- D) Hello, Sam! then Hello, Mia!
Answer: D
Why: Each call gives the function a different argument, which is put in place of name.

**2. Predict the output**
```python
def add(a, b):
    print(a + b)

add(3, 4)
```
```output
7
```
- A) 34
- B) An error
- C) 7
- D) a + b
Answer: C
Why: a is 3 and b is 4. Both are numbers, so + adds them.

**3. Predict the output**
Order matters.
```python
def show(name, age):
    print(f"{name} is {age}")

show(12, "Sam")
```
```output
12 is Sam
```
- A) An error
- B) name is age
- C) 12 is Sam
- D) Sam is 12
Answer: C
Why: The first argument, 12, goes to the first parameter, name. The second, "Sam", goes to age. The mix-up is the caller's fault, not Python's.

**4. Predict**
What error does this give?
```error TypeError
def greet(name):
    print(f"Hello, {name}!")

greet()
```
- A) TypeError
- B) IndexError
- C) NameError
- D) ValueError
Answer: A
Why: The function needs one argument, and the call gave none.

**5. Predict the output**
```python
def square(n):
    print(n * n)

square(5)
```
```output
25
```
- A) 55
- B) 25
- C) 10
- D) n * n
Answer: B
Why: n is 5, so n * n is 25.

**6. Pick one**
In `greet("Sam")`, what is "Sam" called?
- A) A comment
- B) A parameter
- C) An argument
- D) A function
Answer: C
Why: The argument is the real value you pass in. The parameter is the placeholder name in the def line.

**7. Write it yourself**
Define a function called double that has one parameter n and shows n times 2. Call it with 21.
Accepted: the program prints `42`.
```python
def double(n):
    print(n * 2)

double(21)
```
```output
42
```

Hint: Put n inside the brackets of the def line, and print `n * 2` in the body.

**Recap**
Parameters are placeholders in the def line. Arguments are the real values you give when calling. The order matters.

---

## Lesson 10.4: return

**Teach**
So far the functions have shown things on the screen. More often, you want a function to work something out and hand the answer back, so you can use it. That is what `return` does.

```python
def add(a, b):
    return a + b

result = add(3, 4)
print(result)
```
```output
7
```

`return a + b` sends the value back to where the function was called. Here it lands in the variable `result`.

`print` and `return` are different:
- `print` shows something on the screen. The value is gone afterwards.
- `return` gives the value back so the rest of the program can use it.

What if a function has no `return`? It gives back `None`, which means "nothing":

```python
def add_print(a, b):
    print(a + b)

result = add_print(3, 4)
print(result)
```
```output
7
None
```

Also, `return` ends the function right away. Lines after it never run.

**1. Predict the output**
```python
def add(a, b):
    return a + b

result = add(3, 4)
print(result)
```
```output
7
```
- A) None
- B) a + b
- C) 7
- D) 34
Answer: C
Why: return hands the value 7 back, and it is stored in result.

**2. Predict the output**
```python
def add_print(a, b):
    print(a + b)

result = add_print(3, 4)
print(result)
```
```output
7
None
```
- A) None, then 7
- B) 7, then None
- C) 7, then 7
- D) Only 7
Answer: B
Why: Inside the function, print shows 7. But the function has no return, so result holds None.

**3. Predict the output**
```python
def double(n):
    return n * 2

print(double(5) + 1)
```
```output
11
```
- A) An error
- B) 51
- C) 11
- D) 10
Answer: C
Why: double(5) gives back 10, and then 1 is added.

**4. Pick one**
What is the difference between print and return?
- A) print is for numbers, return is for text
- B) return shows it on the screen, print hands it back
- C) They are the same
- D) print shows a value on the screen, return hands a value back to the program
Answer: D
Why: Use print to show things to a person. Use return when the rest of the program needs the value.

**5. Predict the output**
Return ends the function.
```python
def test():
    return "first"
    print("never")

print(test())
```
```output
first
```
- A) never
- B) first, then never
- C) An error
- D) first
Answer: D
Why: The function stops at return. The print after it never runs.

**6. Predict the output**
```python
def double(n):
    return n * 2

print(double(double(3)))
```
```output
12
```
- A) 33
- B) 9
- C) 12
- D) 6
Answer: C
Why: The inner double(3) is 6, and then double(6) is 12.

**7. Write it yourself**
Define a function called square with one parameter n that returns n times n. Then show square(6).
Accepted: the program prints `36`.
```python
def square(n):
    return n * n

print(square(6))
```
```output
36
```

Hint: Use return, not print, inside the function. Print the result where you call it.

**Recap**
`return` hands a value back to the caller and ends the function. Without it you get `None`. Use print to show, return to give back.

---

## Lesson 10.5: Functions using functions, and scope

**Teach**
Functions can call other functions. That is how big programs are built from small pieces.

```python
def double(n):
    return n * 2

def double_plus_one(n):
    return double(n) + 1

print(double_plus_one(5))
```
```output
11
```

Now a rule about where variables live, called scope. A variable created inside a function exists only inside that function. When the function ends, it is gone.

```error NameError
def make():
    secret = 42
    return secret

make()
print(secret)
```

Python says: `NameError: name 'secret' is not defined`.

The function made `secret`, but only the function can see it. To get the value out, use `return`:

```python
def make():
    secret = 42
    return secret

answer = make()
print(answer)
```
```output
42
```

Parameters are local too. A parameter called `n` is a different variable from a `n` outside the function.

```python
n = 100

def add_five(n):
    return n + 5

print(add_five(1))
print(n)
```
```output
6
100
```

**1. Predict the output**
```python
def double(n):
    return n * 2

def double_plus_one(n):
    return double(n) + 1

print(double_plus_one(5))
```
```output
11
```
- A) 12
- B) An error
- C) 10
- D) 11
Answer: D
Why: double_plus_one calls double, which gives back 10, then adds 1.

**2. Predict the output**
```python
def add_one(n):
    return n + 1

def add_two(n):
    return add_one(add_one(n))

print(add_two(5))
```
```output
7
```
- A) 5
- B) 8
- C) 6
- D) 7
Answer: D
Why: add_one(5) is 6, and add_one(6) is 7.

**3. Predict**
What happens when this runs?
```error NameError
def make():
    secret = 42
    return secret

make()
print(secret)
```
- A) It gives a NameError
- B) It shows 42
- C) It shows secret
- D) It shows nothing
Answer: A
Why: secret only exists while the function runs. Outside it, Python has never heard of it.

**4. Pick one**
Why does `secret` not exist outside the function?
- A) The name is too short
- B) Variables created inside a function exist only inside it
- C) The function was never called
- D) Python deletes all variables
Answer: B
Why: This is called scope. It keeps functions from accidentally changing each other's variables.

**5. Predict the output**
A parameter is a separate variable.
```python
n = 100

def add_five(n):
    return n + 5

print(add_five(1))
print(n)
```
```output
6
100
```
- A) 105, then 105
- B) 6, then 6
- C) 6, then 100
- D) 105, then 100
Answer: C
Why: Inside add_five, n is 1, because it is the parameter. The outside n stays 100.

**6. Put in order**
Put the lines in the right order so the program shows 8.
Pieces: `print(double(4))`, `def double(n):`, `    return n * 2`
Correct order:
1. `def double(n):`
2. `    return n * 2`
3. `print(double(4))`
Why: The function must be defined before you use it.

**7. Write it yourself**
add_one is already defined. Define add_three, which uses add_one three times, then show add_three(10).
Starter:
```
def add_one(n):
    return n + 1
```
Accepted: the program prints `13`.
```python
def add_one(n):
    return n + 1

def add_three(n):
    return add_one(add_one(add_one(n)))

print(add_three(10))
```
```output
13
```

Hint: Call add_one inside add_three, and give its answer to the next add_one.

**Recap**
Functions can call other functions. Variables made inside a function stay inside. Use `return` to get a value out.

---

## Lesson 10.6: Bugs inside functions

**Teach**
Functions bring three common bugs. You know the routine from Unit 9: read, predict, compare, locate, change one thing, run again.

**Bug 1: forgetting to return.** The function works out the answer and throws it away. The caller gets `None`.

```python
def add(a, b):
    a + b

print(add(2, 3))
```
```output
None
```

**Bug 2: arguments in the wrong order.** The order matters.

```python
def subtract(a, b):
    return a - b

print(subtract(2, 10))
```
```output
-8
```

**Bug 3: using a function's own variable outside it.** That is the `NameError` from the last lesson.

A related trap is using `print` when you meant `return`, and then trying to use the result:

```error TypeError
def double(n):
    print(n * 2)

result = double(5)
print(result + 1)
```

Python says: `TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'`. Reading it: `NoneType` is the type of `None`. The function gave back `None`, and you cannot add 1 to nothing.

When a function gives you `None` and you did not expect it, the first thing to check is whether the function has a `return`.

**1. Predict the output**
```python
def add(a, b):
    a + b

print(add(2, 3))
```
```output
None
```
- A) An error
- B) 23
- C) 5
- D) None
Answer: D
Why: The function adds the numbers but never returns the answer, so the caller gets None.

**2. Predict the output**
```python
def subtract(a, b):
    return a - b

print(subtract(2, 10))
```
```output
-8
```
- A) 210
- B) -8
- C) 8
- D) 12
Answer: B
Why: a is 2 and b is 10, so a - b is 2 minus 10.

**3. Pick one**
This gives a TypeError. What is the fix?
```error TypeError
def double(n):
    print(n * 2)

result = double(5)
print(result + 1)
```
- A) Change `+ 1` to `+ 2`
- B) Remove the def
- C) Change `print(n * 2)` to `return n * 2`
- D) Change double to Double
Answer: C
Why: The function needs to give the answer back, so the caller can add 1 to it.

**4. Pick one**
A function gives you `None` and you expected a number. What do you check first?
- A) The comments
- B) Whether the function has a return line
- C) The colors
- D) Whether the computer is on
Answer: B
Why: A function with no return gives back None.

**5. Fix it yourself**
This should show the average, 5.0, but shows None. Fix it.
Starter:
```
def average(a, b):
    (a + b) / 2

print(average(4, 6))
```
Accepted: the program prints `5.0`.
```python
def average(a, b):
    return (a + b) / 2

print(average(4, 6))
```
```output
5.0
```

Hint: The function works out the answer but never hands it back. Which word is missing?

**6. Fix it yourself**
This should show 7, but shows -7. Fix it by changing how the function is called.
Starter:
```
def subtract(a, b):
    return a - b

print(subtract(3, 10))
```
Accepted: the program prints `7`.
```python
def subtract(a, b):
    return a - b

print(subtract(10, 3))
```
```output
7
```
Hint: the first argument goes to a.

**7. Pick one**
Which bug is this?
```
def double(n):
    n * 2

print(double(4))
```
- A) The function forgets to return, so it shows None
- B) It is a SyntaxError
- C) The argument is in the wrong order
- D) The function has too many parameters
Answer: A
Why: n * 2 is worked out and thrown away.

**Recap**
Watch for a missing return (None), arguments in the wrong order, and variables used outside the function that made them.

---

## Unit 10 project: A toolkit of helpers

**Goal**
Write three small functions and test them.

- `is_even(n)` gives back True if n is even, and False if not.
- `average(a, b)` gives back the average of two numbers.
- `max_of_three(a, b, c)` gives back the biggest of three numbers. Do it with `if`, not with the built-in `max`.

**Guided steps**
1. `is_even`: n is even when `n % 2` is 0, so you can return the comparison directly: `return n % 2 == 0`.
2. `average`: add the two numbers, divide by 2, and return the result.
3. `max_of_three`: start with `biggest = a`, then use an `if` for b and one for c, replacing `biggest` when you find a bigger one. Return `biggest`.
4. Under the functions, show the results of a few calls.

**Accepted**
```python
def is_even(n):
    return n % 2 == 0

def average(a, b):
    return (a + b) / 2

def max_of_three(a, b, c):
    biggest = a
    if b > biggest:
        biggest = b
    if c > biggest:
        biggest = c
    return biggest

print(is_even(4))
print(is_even(7))
print(average(4, 10))
print(max_of_three(3, 9, 5))
print(max_of_three(8, 2, 8))
```
```output
True
False
7.0
9
8
```
The app checks your functions by calling them with test values, like the five calls above, and comparing what comes back.

**Recap**
You wrote three functions that each take values in and give a value back. Functions like these are the building blocks of every program.

---

## Unit 10 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (10.1)** What is a function?
- A) A comment
- B) A named group of steps you can use again
- C) A kind of number
- D) A type of error
Answer: B

**Q2 (10.1)** Why use a function?
- A) To make text bigger
- B) To make the program slower
- C) To hide errors
- D) To avoid repeating the same steps
Answer: D

**Q3 (10.2)** What does this show?
```python
def hello():
    print("Hello")

hello()
hello()
```
```output
Hello
Hello
```
- A) Nothing is shown
- B) An error
- C) Hello once
- D) Hello twice
Answer: D

**Q4 (10.2)** What does this show?
```python
def hello():
    print("Hello")
```
```output
```
- A) hello
- B) Nothing is shown
- C) An error
- D) Hello
Answer: B

**Q5 (10.2)** Which line calls the function?
- A) `def hello():`
- B) `hello`
- C) `hello()`
- D) `"hello"`
Answer: C

**Q6 (10.2)** What error does this give?
```error NameError
hello()

def hello():
    print("Hello")
```
- A) NameError
- B) TypeError
- C) ValueError
- D) IndexError
Answer: A

**Q7 (10.3)** What does this show?
```python
def greet(name):
    print(f"Hi {name}")

greet("Mia")
```
```output
Hi Mia
```
- A) Hi name
- B) Hi {name}
- C) Hi Mia
- D) An error
Answer: C

**Q8 (10.3)** What does this show?
```python
def add(a, b):
    print(a + b)

add(2, 5)
```
```output
7
```
- A) 25
- B) An error
- C) 7
- D) a + b
Answer: C

**Q9 (10.3)** In `def greet(name):`, what is name?
- A) A parameter
- B) A comment
- C) A function
- D) An argument
Answer: A

**Q10 (10.3)** What error does this give?
```error TypeError
def greet(name):
    print(name)

greet()
```
- A) TypeError
- B) ValueError
- C) IndexError
- D) NameError
Answer: A

**Q11 (10.4)** What does this show?
```python
def add(a, b):
    return a + b

print(add(4, 5))
```
```output
9
```
- A) 45
- B) None
- C) 9
- D) An error
Answer: C

**Q12 (10.4)** What does this show?
```python
def add(a, b):
    print(a + b)

result = add(1, 2)
print(result)
```
```output
3
None
```
- A) None, then 3
- B) 3, then 3
- C) 3, then None
- D) Only 3
Answer: C

**Q13 (10.4)** What does this show?
```python
def double(n):
    return n * 2

print(double(3) + 1)
```
```output
7
```
- A) 7
- B) An error
- C) 31
- D) 6
Answer: A

**Q14 (10.4)** What does this show?
```python
def check():
    return "yes"
    print("no")

print(check())
```
```output
yes
```
- A) no
- B) An error
- C) yes, then no
- D) yes
Answer: D

**Q15 (10.5)** What does this show?
```python
def add_one(n):
    return n + 1

def add_two(n):
    return add_one(add_one(n))

print(add_two(1))
```
```output
3
```
- A) 2
- B) 3
- C) 1
- D) 4
Answer: B

**Q16 (10.5)** What error does this give?
```error NameError
def make():
    secret = 7
    return secret

make()
print(secret)
```
- A) NameError
- B) TypeError
- C) IndexError
- D) ValueError
Answer: A

**Q17 (10.5)** What does this show?
```python
n = 50

def f(n):
    return n + 1

print(f(1))
print(n)
```
```output
2
50
```
- A) 2, then 2
- B) 51, then 50
- C) 2, then 50
- D) 51, then 51
Answer: C

**Q18 (10.6)** What does this show?
```python
def double(n):
    n * 2

print(double(4))
```
```output
None
```
- A) An error
- B) 4
- C) 8
- D) None
Answer: D

**Q19 (10.6)** What does this show?
```python
def sub(a, b):
    return a - b

print(sub(3, 10))
```
```output
-7
```
- A) 310
- B) 7
- C) -7
- D) 13
Answer: C

**Q20 (mixed)** True or false: a function must always have a parameter.
Answer: False
Why: A function can have none, one or many.

**Q21 (10.2)** What does this show?
```python
def hello():
    print("Hello")

hello()
```
```output
Hello
```
- A) hello
- B) Nothing is shown
- C) An error
- D) Hello
Answer: D

**Q22 (10.3)** What does this show?
```python
def show(a, b):
    print(a - b)

show(10, 4)
```
```output
6
```
- A) 6
- B) -6
- C) 104
- D) 14
Answer: A

**Q23 (10.4)** What does this show?
```python
def triple(n):
    return n * 3

print(triple(4))
```
```output
12
```
- A) None
- B) 12
- C) 7
- D) 43
Answer: B

**Q24 (10.5)** What does this show?
```python
def add_one(n):
    return n + 1

def add_three(n):
    return add_one(add_one(add_one(n)))

print(add_three(0))
```
```output
3
```
- A) An error
- B) 3
- C) 1
- D) 0
Answer: B

**Q25 (10.6)** What does this show?
```python
def total(a, b):
    a + b

print(total(1, 2))
```
```output
None
```
- A) 12
- B) An error
- C) None
- D) 3
Answer: C

Note: this bank has 25 questions.
