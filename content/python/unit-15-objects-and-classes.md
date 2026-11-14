# Python, Unit 15: Objects and classes

A class lets you design your own kind of thing, with its own data and its own actions bundled together. This is a gentle first taste. Learners do not need to master classes yet. They need to be able to read one, make objects from it, and use their data and actions. The unit leads straight into the Store and manage data course, where a library of Book objects is built.

Format notes: same as Units 1 to 14. The error messages quoted in the teach text are checked by `check.py`.

---

## Lesson 15.1: Why classes

**Teach**
So far you have stored data in variables, lists and dictionaries, and you wrote actions as separate functions. But think about a book. It has a title, an author, and it can be borrowed or given back. Wouldn't it be neat to keep the data and the actions together?

That is what a class does. A class is a blueprint. It describes what a kind of thing has and what it can do. An object is a real thing made from that blueprint.

Think of a cookie cutter. The cutter is the class. Each cookie it makes is an object. One cutter makes as many cookies as you like.

Here is a tiny class. Do not worry about the details yet, the next lessons explain every part.

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name} says woof")

rex = Dog("Rex")
rex.bark()
```
```output
Rex says woof
```

You have already met objects without knowing it. A piece of text and a list are both objects, and that is why they have methods: `"hi".upper()` and `nums.append(3)`. Now you will make your own kind.

**1. Pick one**
What is a class?
- A) A type of error
- B) A blueprint that describes a kind of thing
- C) A kind of number
- D) A loop
Answer: B
Why: A class describes what a kind of thing has and can do. The real things are made from it.

**2. Pick one**
In the cookie cutter picture, what is an object?
- A) The cutter
- B) The oven
- C) The recipe book
- D) A cookie made with the cutter
Answer: D
Why: The cutter is the class. Each cookie it makes is an object.

**3. Pick one**
Which idea would make a good class?
- A) A single comment
- B) A Book, with a title, an author, and the actions borrow and give back
- C) The number 5
- D) The word print
Answer: B
Why: A book has several pieces of data and actions that go with them.

**4. Predict the output**
```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name} says woof")

rex = Dog("Rex")
rex.bark()
```
```output
Rex says woof
```
- A) An error
- B) Dog says woof
- C) Rex says woof
- D) name says woof
Answer: C
Why: The object rex remembers its name, and its bark action shows it.

**5. True or false**
You have already used objects: lists and text have methods like `append` and `upper`.
Answer: True
Why: Lists and text are objects. Methods are the actions that belong to them.

**6. Pick one**
How many objects can one class make?
- A) Only one
- B) As many as you like
- C) Exactly two
- D) None
Answer: B
Why: Like a cookie cutter, one class can make any number of objects.

**Recap**
A class is a blueprint. An object is a real thing made from it. Lists and text are objects too.

---

## Lesson 15.2: A class and an object

**Teach**
You write a class with the word `class`, a name that starts with a capital letter, and a colon. The simplest possible class has nothing inside, which Python writes as `pass`.

To make an object, write the class name with brackets, like calling a function.

```python
class Book:
    pass

b = Book()
b.title = "Dune"
print(b.title)
```
```output
Dune
```

`b = Book()` makes an object from the Book class. `b.title = "Dune"` gives that object a piece of data called an attribute. You read it with a dot: `b.title`.

Each object has its own attributes. Changing one does not change the others.

```python
class Book:
    pass

a = Book()
a.title = "Dune"
b = Book()
b.title = "Emma"
print(a.title)
print(b.title)
```
```output
Dune
Emma
```

If you ask an object for an attribute it does not have, Python complains:

```error AttributeError
class Book:
    pass

b = Book()
print(b.title)
```

Python says: `AttributeError: 'Book' object has no attribute 'title'`.

**1. Predict the output**
```python
class Book:
    pass

a = Book()
a.title = "Dune"
b = Book()
b.title = "Emma"
print(a.title)
```
```output
Dune
```
- A) Dune
- B) Emma
- C) title
- D) An error
Answer: A
Why: a and b are separate objects. a.title is Dune.

**2. Predict the output**
Changing b does not touch a.
```python
class Book:
    pass

a = Book()
a.title = "Dune"
b = Book()
b.title = "Emma"
b.title = "Ulysses"
print(a.title)
```
```output
Dune
```
- A) An error
- B) Ulysses
- C) Emma
- D) Dune
Answer: D
Why: Each object keeps its own attributes. Only b changed.

**3. Predict**
What happens when this runs?
```error AttributeError
class Book:
    pass

b = Book()
print(b.title)
```
- A) It shows None
- B) It shows title
- C) It shows nothing
- D) An AttributeError
Answer: D
Why: The object b was never given a title.

**4. Pick one**
Which line makes an object from the class Book?
- A) `b = Book`
- B) `b = class Book`
- C) `Book = b()`
- D) `b = Book()`
Answer: D
Why: Call the class name with brackets, just like calling a function.

**5. Put in order**
Put the lines in the right order so the program shows Dune.
Pieces: `print(b.title)`, `b = Book()`, `class Book:`, `    pass`, `b.title = "Dune"`
Correct order:
1. `class Book:`
2. `    pass`
3. `b = Book()`
4. `b.title = "Dune"`
5. `print(b.title)`
Why: Define the class first, then make the object, then give it data, then use it.

**6. Pick one**
Which is the usual way to name a class?
- A) Book, with a capital first letter
- B) 1book
- C) book
- D) BOOK_1
Answer: A
Why: A capital first letter makes it easy to tell a class from a variable.

**7. Write it yourself**
Make a class called Pet. Make an object called p from it, give it the name Rex, and show the name.
Accepted: the program prints `Rex`.
```python
class Pet:
    pass

p = Pet()
p.name = "Rex"
print(p.name)
```
```output
Rex
```

Hint: Start with `class Pet:` and `pass`. Make the object with `Pet()`, then set `p.name`.

**Recap**
`class Name:` defines a class. `Name()` makes an object. An object's data are attributes, read with a dot. Each object has its own.

---

## Lesson 15.3: Attributes and __init__

**Teach**
Setting attributes one by one gets tedious, and it is easy to forget one. A class can have a special function called `__init__`, which runs automatically every time an object is made. It sets up the attributes.

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

b = Book("Dune", "Herbert")
print(b.title)
print(b.author)
```
```output
Dune
Herbert
```

Take it apart:
- `__init__` has two underscores on each side. It is short for "initialize".
- `self` means this particular object. Python fills it in for you, so you do not pass it when you make the object.
- `self.title = title` stores the title you gave on the object.
- `Book("Dune", "Herbert")` makes the object, and the two values go to `title` and `author`.

You can also give an attribute a fixed starting value:

```python
class Book:
    def __init__(self, title):
        self.title = title
        self.borrowed = False

b = Book("Dune")
print(b.borrowed)
```
```output
False
```

If you forget an argument when making the object, you get a TypeError:

```error TypeError
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

b = Book("Dune")
```

Python says: `TypeError: Book.__init__() missing 1 required positional argument: 'author'`.

**1. Predict the output**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

b = Book("Dune", "Herbert")
print(b.title)
print(b.author)
```
```output
Dune
Herbert
```
- A) Herbert, then Dune
- B) An error
- C) Dune, then Herbert
- D) title, then author
Answer: C
Why: The first value goes to title and the second to author.

**2. Predict the output**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

b = Book("Dune", "Herbert")
print(f"{b.title} by {b.author}")
```
```output
Dune by Herbert
```
- A) An error
- B) Herbert by Dune
- C) Dune by Herbert
- D) title by author
Answer: C
Why: The f-string looks up each attribute with a dot.

**3. Predict**
What error does this give?
```error TypeError
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

b = Book("Dune")
```
- A) NameError
- B) ValueError
- C) AttributeError
- D) TypeError
Answer: D
Why: __init__ needs two values, and only one was given.

**4. Pick one**
What does `self` mean inside a class?
- A) This particular object
- B) A variable you must name yourself
- C) The programmer
- D) The class itself
Answer: A
Why: self is how an object talks about itself. Each object has its own self.

**5. Predict the output**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

a = Book("Dune", "Herbert")
b = Book("Emma", "Austen")
print(a.title + " and " + b.title)
```
```output
Dune and Emma
```
- A) Dune and Emma
- B) An error
- C) title and title
- D) Emma and Dune
Answer: A
Why: a and b are two separate objects, each with its own title.

**6. Predict the output**
Some attributes start with a fixed value.
```python
class Book:
    def __init__(self, title):
        self.title = title
        self.borrowed = False

b = Book("Dune")
print(b.borrowed)
```
```output
False
```
- A) An error
- B) True
- C) Dune
- D) False
Answer: D
Why: __init__ sets borrowed to False for every new Book.

**7. Write it yourself**
Make a class called Player. Each Player has a name, and a score that starts at 0. Make a Player called Sam, then show their score.
Accepted: the program prints `0`.
```python
class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0

p = Player("Sam")
print(p.score)
```
```output
0
```

Hint: In `__init__`, set `self.name` from the value you pass in, and set `self.score` to 0.

**Recap**
`__init__` runs when an object is made and sets up its attributes. `self` means this object. Attributes can start with a fixed value.

---

## Lesson 15.4: Methods

**Teach**
A function inside a class is called a method. It is an action that the object can do. Every method has `self` as its first parameter, so it knows which object it is working on. When you call a method, you leave self out. Python passes it in for you.

```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self):
        self.count += 1

c = Counter()
c.add()
c.add()
print(c.count)
```
```output
2
```

Methods can read and change the object's attributes, and they can return values:

```python
class Book:
    def __init__(self, title):
        self.title = title
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

b = Book("Dune")
print(b.describe())
b.borrow()
print(b.describe())
```
```output
Dune (available)
Dune (borrowed)
```

Each object has its own data. Two Counters do not share a count.

If you forget `self` in a method, you get a confusing error:

```error TypeError
class Counter:
    def __init__(self):
        self.count = 0

    def add():
        self.count += 1

c = Counter()
c.add()
```

Python says: `TypeError: Counter.add() takes 0 positional arguments but 1 was given`. It means Python passed self in, but the method had no place to receive it.

**1. Predict the output**
```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self):
        self.count += 1

c = Counter()
c.add()
c.add()
print(c.count)
```
```output
2
```
- A) 0
- B) 2
- C) 1
- D) An error
Answer: B
Why: Each call to add makes the object's count go up by 1.

**2. Predict the output**
```python
class Book:
    def __init__(self, title):
        self.title = title
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

b = Book("Dune")
print(b.describe())
```
```output
Dune (available)
```
- A) Dune (available)
- B) Dune (borrowed)
- C) Dune
- D) An error
Answer: A
Why: The book has not been borrowed yet, so borrowed is False.

**3. Predict the output**
```python
class Book:
    def __init__(self, title):
        self.title = title
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

b = Book("Dune")
b.borrow()
print(b.describe())
```
```output
Dune (borrowed)
```
- A) Dune (available)
- B) An error
- C) Dune
- D) Dune (borrowed)
Answer: D
Why: borrow changes the object's borrowed to True, and describe reads it.

**4. Pick one**
Why does every method have `self` as its first parameter?
- A) Because Python forgets otherwise
- B) It does not need it
- C) So the method knows which object it is working on
- D) To make it run faster
Answer: C
Why: Python passes in the object automatically. self is how the method reaches that object's data.

**5. Predict**
What error does this give?
```error TypeError
class Counter:
    def __init__(self):
        self.count = 0

    def add():
        self.count += 1

c = Counter()
c.add()
```
- A) ValueError
- B) AttributeError
- C) TypeError
- D) NameError
Answer: C
Why: The method is missing the self parameter, so Python cannot hand the object to it.

**6. Predict the output**
Two objects do not share their data.
```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self):
        self.count += 1

c1 = Counter()
c2 = Counter()
c1.add()
print(c2.count)
```
```output
0
```
- A) 1
- B) An error
- C) 2
- D) 0
Answer: D
Why: Only c1 was changed. c2 has its own count.

**7. Write it yourself**
Add a method called greet to the Player class. It gives back the text Hi, I am Sam, using the player's name. Then show the result of greeting for the player Sam.
Starter:
```
class Player:
    def __init__(self, name):
        self.name = name
```
Accepted: the program prints `Hi, I am Sam`.
```python
class Player:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hi, I am {self.name}"

p = Player("Sam")
print(p.greet())
```
```output
Hi, I am Sam
```

Hint: A method starts with `def greet(self):`. Use `self.name` inside an f-string.

**Recap**
A method is a function inside a class. It takes `self` first, and can read and change the object's attributes. Each object keeps its own data.

---

## Lesson 15.5: Many objects

**Teach**
Real programs usually have many objects of the same class. Keep them in a list, and loop over them, just like any other list.

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

books = [Book("Dune", "Herbert"), Book("Emma", "Austen")]
for book in books:
    print(book.describe())
```
```output
Dune (available)
Emma (available)
```

All the loop patterns you know still work: counting, searching, adding up. You use the dot to reach each object's data.

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

books = [Book("Dune", "Herbert"), Book("Emma", "Austen")]
books[0].borrow()
count = 0
for book in books:
    if book.borrowed:
        count += 1
print(count)
```
```output
1
```

You can compare this with the list of dictionaries from Unit 12. A dictionary holds the data (`book["title"]`). An object holds the data and the actions together (`book.title` and `book.borrow()`). A class is the better choice when the thing has actions.

This list of Book objects is exactly what the library app in the Store and manage data course is built on.

**1. Predict the output**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.borrowed = False

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

books = [Book("Dune", "Herbert"), Book("Emma", "Austen")]
for book in books:
    print(book.describe())
```
```output
Dune (available)
Emma (available)
```
- A) Dune, Emma
- B) Dune (available), Emma (available)
- C) An error
- D) Herbert, Austen
Answer: B
Why: The loop gives each Book object in turn, and describe is called on each one.

**2. Predict the output**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

books = [Book("Dune", "Herbert"), Book("Emma", "Austen")]
books[0].borrow()
print(books[0].describe())
```
```output
Dune (borrowed)
```
- A) Dune (available)
- B) Dune (borrowed)
- C) An error
- D) Emma (borrowed)
Answer: B
Why: books[0] is the first Book. Calling borrow changes only that object.

**3. Predict the output**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

books = [Book("Dune", "Herbert"), Book("Emma", "Austen")]
books[0].borrow()
count = 0
for book in books:
    if book.borrowed:
        count += 1
print(count)
```
```output
1
```
- A) An error
- B) 2
- C) 1
- D) 0
Answer: C
Why: Only one book was borrowed, so the count is 1.

**4. Pick one**
How do you read the title of the second book in the list `books`?
- A) `books.title[1]`
- B) `books[1].title`
- C) `title(books, 1)`
- D) `books[2].title`
Answer: B
Why: Pick the object by position, then read its attribute with a dot. The second item is at position 1.

**5. Predict the output**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

books = [Book("Dune", "Herbert"), Book("Emma", "Austen")]
for book in books:
    if book.title == "Emma":
        print(book.author)
```
```output
Austen
```
- A) Austen
- B) Emma
- C) Nothing is shown
- D) Herbert
Answer: A
Why: The loop finds the book with the title Emma, and shows its author.

**6. Pick one**
Which line reads an attribute of an object, and not a dictionary?
- A) `len(books)`
- B) `book.title`
- C) `book["title"]`
- D) `books[0]`
Answer: B
Why: A dot after the name is how you reach an object's attributes. Square brackets with a key are for dictionaries.

**7. Write it yourself**
A list already holds one Book. Add Emma by Austen to it, then show how many books the list holds.
Starter:
```
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

books = [Book("Dune", "Herbert")]
```
Accepted: the program prints `2`.
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

books = [Book("Dune", "Herbert")]
books.append(Book("Emma", "Austen"))
print(len(books))
```
```output
2
```

Hint: Use `books.append(...)` and make the new Book inside the brackets.

**Recap**
Keep many objects in a list and loop over them. Reach each object's data with a dot. A class bundles data and actions together.

---

## Unit 15 project: A tiny library

**Goal**
Build a Book class that can be borrowed and given back, then use it with a small list of books.

The Book class has:
- `title` and `author`, set when the book is made.
- `borrowed`, which starts as False.
- `borrow()`: if the book is already borrowed, it gives back `Already borrowed: ` and the title. Otherwise it sets borrowed to True and gives back `Borrowed: ` and the title.
- `give_back()`: sets borrowed to False and gives back `Returned: ` and the title.
- `describe()`: gives back the title and either `(borrowed)` or `(available)`.

**Guided steps**
1. Write `__init__` with title, author, and a starting `borrowed` of False.
2. Write `borrow`. Use an `if` on `self.borrowed`.
3. Write `give_back` and `describe`.
4. Make a list of three books: Dune, Emma and Ulysses.
5. Borrow the first book, borrow the second, try to borrow the first again, then return the second. Show each result.
6. Loop over the list and show each book's description.
7. Count the available books and show `Available:` and the count.

**Accepted**
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.borrowed = False

    def borrow(self):
        if self.borrowed:
            return f"Already borrowed: {self.title}"
        self.borrowed = True
        return f"Borrowed: {self.title}"

    def give_back(self):
        self.borrowed = False
        return f"Returned: {self.title}"

    def describe(self):
        if self.borrowed:
            return f"{self.title} (borrowed)"
        return f"{self.title} (available)"

books = [
    Book("Dune", "Herbert"),
    Book("Emma", "Austen"),
    Book("Ulysses", "Joyce"),
]

print(books[0].borrow())
print(books[1].borrow())
print(books[0].borrow())
print(books[1].give_back())

for book in books:
    print(book.describe())

available = 0
for book in books:
    if not book.borrowed:
        available += 1
print(f"Available: {available}")
```
```output
Borrowed: Dune
Borrowed: Emma
Already borrowed: Dune
Returned: Emma
Dune (borrowed)
Emma (available)
Ulysses (available)
Available: 2
```
The app checks your class by making Book objects and calling their methods with test values, not only by comparing printed output.

**Recap**
You designed a class with data and actions, made several objects, and used them in a list. This is the foundation of the library app in the next course.

---

## Unit 15 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (15.1)** What is a class?
- A) A single value
- B) A comment
- C) A loop
- D) A blueprint for a kind of thing
Answer: D

**Q2 (15.1)** True or false: one class can make many objects.
Answer: True

**Q3 (15.2)** What does this show?
```python
class Pet:
    pass

p = Pet()
p.name = "Rex"
print(p.name)
```
```output
Rex
```
- A) Rex
- B) Pet
- C) An error
- D) name
Answer: A

**Q4 (15.2)** What does this show?
```python
class Pet:
    pass

a = Pet()
b = Pet()
a.name = "Rex"
b.name = "Luna"
print(b.name)
```
```output
Luna
```
- A) Luna
- B) An error
- C) name
- D) Rex
Answer: A

**Q5 (15.2)** What error does this give?
```error AttributeError
class Pet:
    pass

p = Pet()
print(p.age)
```
- A) NameError
- B) IndexError
- C) KeyError
- D) AttributeError
Answer: D

**Q6 (15.3)** What does this show?
```python
class Pet:
    def __init__(self, name, kind):
        self.name = name
        self.kind = kind

p = Pet("Rex", "dog")
print(p.kind)
```
```output
dog
```
- A) Rex
- B) kind
- C) An error
- D) dog
Answer: D

**Q7 (15.3)** What does `self` mean?
- A) The class
- B) The programmer
- C) This particular object
- D) A number
Answer: C

**Q8 (15.3)** When does `__init__` run?
- A) Never
- B) At the end of the program
- C) Only when you print
- D) Automatically, when an object is made
Answer: D

**Q9 (15.3)** What does this show?
```python
class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0

p = Player("Sam")
print(p.score)
```
```output
0
```
- A) Sam
- B) 0
- C) score
- D) An error
Answer: B

**Q10 (15.3)** What error does this give?
```error TypeError
class Pet:
    def __init__(self, name):
        self.name = name

p = Pet()
```
- A) AttributeError
- B) TypeError
- C) ValueError
- D) NameError
Answer: B

**Q11 (15.4)** What does this show?
```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self):
        self.count += 1

c = Counter()
c.add()
c.add()
c.add()
print(c.count)
```
```output
3
```
- A) 1
- B) An error
- C) 0
- D) 3
Answer: D

**Q12 (15.4)** What does this show?
```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self):
        self.count += 1

a = Counter()
b = Counter()
a.add()
a.add()
print(b.count)
```
```output
0
```
- A) 2
- B) An error
- C) 0
- D) 1
Answer: C

**Q13 (15.4)** What does this show?
```python
class Player:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}"

print(Player("Mia").greet())
```
```output
Hello, Mia
```
- A) Hello, name
- B) An error
- C) Hello, Mia
- D) greet
Answer: C

**Q14 (15.4)** Why does every method start with `self`?
- A) To hide the object
- B) It does not need to
- C) So it knows which object it works on
- D) To make it faster
Answer: C

**Q15 (15.5)** What does this show?
```python
class Book:
    def __init__(self, title):
        self.title = title

books = [Book("A"), Book("B"), Book("C")]
print(len(books))
```
```output
3
```
- A) 0
- B) 1
- C) An error
- D) 3
Answer: D

**Q16 (15.5)** What does this show?
```python
class Book:
    def __init__(self, title):
        self.title = title

books = [Book("A"), Book("B"), Book("C")]
print(books[2].title)
```
```output
C
```
- A) C
- B) B
- C) A
- D) An error
Answer: A

**Q17 (15.5)** What does this show?
```python
class Book:
    def __init__(self, title):
        self.title = title
        self.borrowed = False

    def borrow(self):
        self.borrowed = True

books = [Book("A"), Book("B")]
books[1].borrow()
count = 0
for book in books:
    if book.borrowed:
        count += 1
print(count)
```
```output
1
```
- A) 0
- B) 1
- C) 2
- D) An error
Answer: B

**Q18 (15.5)** Which line reads an object's title?
- A) `title.book`
- B) `book(title)`
- C) `book["title"]`
- D) `book.title`
Answer: D

**Q19 (mixed)** True or false: lists and text are objects with methods.
Answer: True

**Q20 (mixed)** True or false: a class can only make one object.
Answer: False
Why: One class can make as many objects as you like.

**Q21 (15.1)** In the cookie cutter picture, what is the class?
- A) A cookie
- B) The dough
- C) The cutter
- D) The oven
Answer: C

**Q22 (15.2)** What does this show?
```python
class Cat:
    pass

c = Cat()
c.name = "Tom"
print(c.name)
```
```output
Tom
```
- A) An error
- B) Cat
- C) name
- D) Tom
Answer: D

**Q23 (15.3)** What does this show?
```python
class Box:
    def __init__(self, size):
        self.size = size

b = Box(5)
print(b.size * 2)
```
```output
10
```
- A) 5
- B) 10
- C) An error
- D) 52
Answer: B

**Q24 (15.4)** What does this show?
```python
class Lamp:
    def __init__(self):
        self.on = False

    def switch_on(self):
        self.on = True

lamp = Lamp()
lamp.switch_on()
print(lamp.on)
```
```output
True
```
- A) False
- B) True
- C) An error
- D) on
Answer: B

**Q25 (15.5)** What does this show?
```python
class Item:
    def __init__(self, price):
        self.price = price

items = [Item(2), Item(3)]
total = 0
for item in items:
    total += item.price
print(total)
```
```output
5
```
- A) 2
- B) An error
- C) 23
- D) 5
Answer: D

Note: this bank has 25 questions.
