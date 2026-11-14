# Python, Unit 13: Working with text

Text is everywhere in programs: names, messages, file contents, what people type. This unit shows how to measure, clean, cut, search and split text. A lot of it will feel familiar, because text behaves much like a list of characters.

Format notes: same as Units 1 to 12. In an `inputs=` header, `~` stands for a space, because the header cannot hold real spaces. The error messages quoted in the teach text are checked by `check.py`.

---

## Lesson 13.1: Length and positions

**Teach**
Text is a row of characters, a bit like a list. You can count them with `len` and pick one by its position. Positions start at 0, and negative positions count from the end, exactly as with lists.

```python
word = "hello"
print(len(word))
print(word[0])
print(word[-1])
```
```output
5
h
o
```

Spaces and punctuation count as characters too: `len("hi there")` is 8.

A position that is too big gives an `IndexError`:

```error IndexError
word = "cat"
print(word[3])
```

Python says: `IndexError: string index out of range`.

One difference from lists: text cannot be changed in place. You cannot swap a single letter.

```error TypeError
word = "cat"
word[0] = "b"
```

Python says: `TypeError: 'str' object does not support item assignment`. To get a different word, you make new text.

**1. Predict the output**
```python
print(len("hello"))
```
```output
5
```
- A) 6
- B) 4
- C) 5
- D) hello
Answer: C
Why: len counts the characters. "hello" has five.

**2. Predict the output**
```python
print("hello"[0])
```
```output
h
```
- A) h
- B) e
- C) o
- D) hello
Answer: A
Why: Position 0 is the first character.

**3. Predict the output**
```python
word = "python"
print(word[-1])
```
```output
n
```
- A) p
- B) n
- C) An error
- D) o
Answer: B
Why: -1 is the last character.

**4. Predict the output**
```python
print(len("hi there"))
```
```output
8
```
- A) 9
- B) 2
- C) 7
- D) 8
Answer: D
Why: The space counts as a character. h, i, space, t, h, e, r, e is eight.

**5. Predict**
What happens when this runs?
```error IndexError
word = "cat"
print(word[3])
```
- A) It shows nothing
- B) An IndexError
- C) It shows 3
- D) It shows t
Answer: B
Why: "cat" has positions 0, 1 and 2. There is no position 3.

**6. Pick one**
Why does this give a TypeError?
```error TypeError
word = "cat"
word[0] = "b"
```
- A) Text cannot be changed in place, you must make new text
- B) The position is wrong
- C) The letter b is not allowed
- D) The word is too short
Answer: A
Why: Text is read-only in that way. To get "bat" you would build a new piece of text.

**7. Write it yourself**
Show the first and last letter of the word, joined together.
Starter:
```
word = "Codeling"
```
Accepted: the program prints `Cg`.
```python
word = "Codeling"
print(word[0] + word[-1])
```
```output
Cg
```

Hint: Position 0 is the first letter and -1 is the last. Join them with +.

**Recap**
`len` counts characters, spaces included. Positions work like lists, starting at 0 with -1 as the last. Text cannot be changed in place.

---

## Lesson 13.2: Text methods

**Teach**
Text has handy tools called methods. You use them with a dot after the text, like `append` on a list.

- `upper()` makes every letter a capital.
- `lower()` makes every letter small.
- `title()` makes the first letter of each word a capital.
- `strip()` removes spaces from the start and end.

```python
name = "  sam  "
print(name.strip())
print(name.strip().title())
print("hello".upper())
print("HELLO".lower())
```
```output
sam
Sam
HELLO
hello
```

You can chain methods: `name.strip().title()` cleans first, then fixes the capital.

Very important: methods give back new text. They do not change the original. If you want to keep the result, you have to save it.

```python
word = "hi"
word.upper()
print(word)
```
```output
hi
```

The result of `word.upper()` was thrown away. The fix is to store it:

```python
word = "hi"
word = word.upper()
print(word)
```
```output
HI
```

**1. Predict the output**
```python
print("sam".upper())
```
```output
SAM
```
- A) sam
- B) Sam
- C) SAM
- D) An error
Answer: C
Why: upper makes every letter a capital.

**2. Predict the output**
```python
print("  hi  ".strip() + "!")
```
```output
hi!
```
- A) hi !
- B) hi!
- C) An error
- D) `  hi  !`
Answer: B
Why: strip removes the spaces at both ends, then + joins the exclamation mark.

**3. Predict the output**
```python
print("hello world".title())
```
```output
Hello World
```
- A) Hello world
- B) hello world
- C) Hello World
- D) HELLO WORLD
Answer: C
Why: title gives every word a capital first letter.

**4. Predict the output**
Look carefully. The result is not saved.
```python
word = "hi"
word.upper()
print(word)
```
```output
hi
```
- A) HI
- B) An error
- C) Hi
- D) hi
Answer: D
Why: upper() gave back new text, but nothing stored it. The variable word still holds the original.

**5. Predict the output**
```python
word = "hi"
word = word.upper()
print(word)
```
```output
HI
```
- A) hi
- B) HI
- C) Hi
- D) An error
Answer: B
Why: This time the new text is stored back into word.

**6. Predict the output**
```python
print("  aNNa ".strip().title())
```
```output
Anna
```
- A) `  Anna `
- B) aNNa
- C) Anna
- D) ANNA
Answer: C
Why: strip removes the outside spaces, and then title fixes the capitals.

**7. Write it yourself**
Clean up the name so it shows Mia.
Starter:
```
name = "  mIA  "
```
Accepted: the program prints `Mia`.
```python
name = "  mIA  "
print(name.strip().title())
```
```output
Mia
```

Hint: `strip` removes the spaces and `title` fixes the capitals. You can chain them.

**Recap**
`upper`, `lower`, `title` and `strip` give back new text. The original stays the same unless you store the result.

---

## Lesson 13.3: Slicing text

**Teach**
You slice text with the same rule as lists. `text[start:stop]` takes the characters from start up to, but not including, stop.

```python
word = "python"
print(word[0:3])
print(word[:3])
print(word[3:])
print(word[-3:])
print(word[1:4])
```
```output
pyt
pyt
hon
hon
yth
```

- Leave out the start to begin at the beginning.
- Leave out the stop to go to the end.
- A negative start counts from the end, so `[-3:]` is the last three characters.

A slice never gives an error. If it goes past the end, it just stops there. The number of characters in a slice is stop minus start.

**1. Predict the output**
```python
print("python"[0:2])
```
```output
py
```
- A) py
- B) yt
- C) pyt
- D) An error
Answer: A
Why: It takes positions 0 and 1, and stops before 2.

**2. Predict the output**
```python
print("python"[2:])
```
```output
thon
```
- A) ython
- B) py
- C) thon
- D) pyth
Answer: C
Why: It starts at position 2 and goes to the end.

**3. Predict the output**
```python
print("python"[-2:])
```
```output
on
```
- A) on
- B) py
- C) n
- D) ho
Answer: A
Why: -2 is the second character from the end, and the slice goes to the end.

**4. Predict the output**
```python
print("python"[1:4])
```
```output
yth
```
- A) ytho
- B) yt
- C) pyth
- D) yth
Answer: D
Why: Positions 1, 2 and 3 are y, t and h.

**5. Predict the output**
```python
print(len("python"[1:4]))
```
```output
3
```
- A) 4
- B) 5
- C) 2
- D) 3
Answer: D
Why: The slice has stop minus start characters, 4 minus 1.

**6. Predict the output**
```python
print("hi"[0:100])
```
```output
hi
```
- A) h
- B) An IndexError
- C) hi
- D) hi followed by empty spaces
Answer: C
Why: A slice that goes past the end just stops at the end.

**7. Write it yourself**
Show the first three letters of the word.
Starter:
```
word = "Codeling"
```
Accepted: the program prints `Cod`.
```python
word = "Codeling"
print(word[:3])
```
```output
Cod
```

Hint: A slice with the start left out begins at the first letter. How many letters do you want?

**Recap**
Slicing text works like slicing lists. The start is included, the stop is not, and a slice never gives an error.

---

## Lesson 13.4: Searching and replacing

**Teach**
More tools for looking inside text.

- `a in b` is True if text `a` appears inside text `b`.
- `find` tells you the position where text first appears, or `-1` if it does not.
- `count` tells you how many times it appears.
- `replace(old, new)` gives back text with every `old` swapped for `new`.
- `startswith` and `endswith` check the beginning and the end.

```python
sentence = "I like cats and cats like me"
print("cats" in sentence)
print(sentence.find("cats"))
print(sentence.count("cats"))
print(sentence.replace("cats", "dogs"))
```
```output
True
7
2
I like dogs and dogs like me
```

Just like lesson 13.2, `replace` gives back new text. Store it if you want to keep it.

**1. Predict the output**
```python
print("cat" in "concatenate")
```
```output
True
```
- A) An error
- B) True
- C) cat
- D) False
Answer: B
Why: The letters c, a, t appear in a row inside "concatenate".

**2. Predict the output**
```python
print("hello".find("l"))
```
```output
2
```
- A) -1
- B) 2
- C) 3
- D) 1
Answer: B
Why: find gives the position of the first match. The first l is at position 2.

**3. Predict the output**
```python
print("hello".find("z"))
```
```output
-1
```
- A) An error
- B) 0
- C) -1
- D) None
Answer: C
Why: find gives -1 when the text is not found. It does not cause an error.

**4. Predict the output**
```python
print("a-b-c".replace("-", "+"))
```
```output
a+b+c
```
- A) abc
- B) a-b-c
- C) a+b-c
- D) a+b+c
Answer: D
Why: replace swaps every dash for a plus.

**5. Predict the output**
```python
print("banana".count("a"))
```
```output
3
```
- A) 6
- B) 1
- C) 3
- D) 2
Answer: C
Why: "banana" has three a's.

**6. Predict the output**
```python
print("python".startswith("py"))
```
```output
True
```
- A) True
- B) py
- C) False
- D) An error
Answer: A
Why: "python" begins with py.

**7. Write it yourself**
Replace red with green and show the new sentence.
Starter:
```
text = "I like red apples"
```
Accepted: the program prints `I like green apples`.
```python
text = "I like red apples"
print(text.replace("red", "green"))
```
```output
I like green apples
```

Hint: `replace` takes the old text first and the new text second.

**Recap**
`in`, `find`, `count`, `replace`, `startswith` and `endswith` look inside text. `find` gives -1 for no match.

---

## Lesson 13.5: Split, join and cleaning input

**Teach**
Two very useful tools turn text into a list and back.

`split` cuts text into a list of pieces. With nothing inside the brackets, it cuts at spaces and ignores extra ones. You can also give it a character to cut at.

```python
words = "one two three".split()
print(words)
print(len(words))
```
```output
['one', 'two', 'three']
3
```

```python
print("a,b,c".split(","))
```
```output
['a', 'b', 'c']
```

`join` does the opposite. It glues a list of text together, using the text before the dot as the glue.

```python
print("-".join(["x", "y", "z"]))
```
```output
x-y-z
```

Putting them together cleans up messy spaces:

```python
messy = "  hello   world  "
print(" ".join(messy.split()))
```
```output
hello world
```

`split()` gets rid of the extra spaces, and `" ".join` puts back exactly one between words.

**1. Predict the output**
```python
print("one two three".split())
```
```output
['one', 'two', 'three']
```
- A) `['one', 'two', 'three']`
- B) `one two three`
- C) An error
- D) `['one two three']`
Answer: A
Why: split cuts the text at the spaces and gives a list of the words.

**2. Predict the output**
```python
print("a,b,c".split(","))
```
```output
['a', 'b', 'c']
```
- A) `a b c`
- B) An error
- C) `['a,b,c']`
- D) `['a', 'b', 'c']`
Answer: D
Why: With a comma inside the brackets, the text is cut at every comma.

**3. Predict the output**
```python
print("-".join(["x", "y", "z"]))
```
```output
x-y-z
```
- A) x-y-z
- B) xyz
- C) An error
- D) `['x-y-z']`
Answer: A
Why: join glues the items together with a dash between them.

**4. Predict the output**
```python
print("  hello   world ".split())
```
```output
['hello', 'world']
```
- A) An error
- B) `['hello', 'world']`
- C) `['hello', '', '', 'world']`
- D) `['  hello', 'world ']`
Answer: B
Why: split with nothing inside the brackets ignores extra spaces.

**5. Predict the output**
```python
print(len("the quick brown fox".split()))
```
```output
4
```
- A) 3
- B) 4
- C) 5
- D) 19
Answer: B
Why: split makes a list of four words, and len counts the items.

**6. Predict the output**
```python
print(" ".join("  hello   world ".split()))
```
```output
hello world
```
- A) `  hello   world `
- B) An error
- C) hello world
- D) helloworld
Answer: C
Why: split removes the messy spaces, and join puts back exactly one.

**7. Write it yourself**
The text has commas between colors. Show the colors with the word and between them.
Starter:
```
colors = "red,green,blue"
```
Accepted: the program prints `red and green and blue`.
```python
colors = "red,green,blue"
print(" and ".join(colors.split(",")))
```
```output
red and green and blue
```

Hint: Cut the text at the commas with `split`, then glue the pieces together with `" and ".join(...)`.

**Recap**
`split` turns text into a list. `join` turns a list into text. Together they clean up spacing.

---

## Unit 13 project: Name tidy-up

**Goal**
People type their names messily: wrong capitals, extra spaces. Ask for a full name, clean it up, and show it with the initials and the length.

If the person types `  aNNa   mARIE smith  ` (with extra spaces), the program shows:
```
Name: Anna Marie Smith
Initials: A.M.S.
Length: 16
```

**Guided steps**
1. Ask for the name with `input` and store it in `raw`.
2. Clean it: `name = " ".join(raw.split()).title()`. The split and join fix the spaces, and `title` fixes the capitals.
3. Show `Name:` and the clean name.
4. Build the initials: start with `initials = ""`, loop over `name.split()`, and add the first letter of each word and a dot.
5. Show `Initials:` and the initials.
6. Show `Length:` and `len(name)`.

**Accepted**
```python inputs=~~aNNa~~~mARIE~smith~~
raw = input("Full name? ")
name = " ".join(raw.split()).title()
print(f"Name: {name}")
initials = ""
for word in name.split():
    initials += word[0] + "."
print(f"Initials: {initials}")
print(f"Length: {len(name)}")
```
```output
Name: Anna Marie Smith
Initials: A.M.S.
Length: 16
```
```python inputs=sam
raw = input("Full name? ")
name = " ".join(raw.split()).title()
print(f"Name: {name}")
initials = ""
for word in name.split():
    initials += word[0] + "."
print(f"Initials: {initials}")
print(f"Length: {len(name)}")
```
```output
Name: Sam
Initials: S.
Length: 3
```

**Recap**
You used split, join, title, a loop and a slice-style position to clean user input. Cleaning what people type is one of the most common jobs in real programs.

---

## Unit 13 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (13.1)** What does this show?
```python
print(len("abc"))
```
```output
3
```
- A) 4
- B) abc
- C) 3
- D) 2
Answer: C

**Q2 (13.1)** What does this show?
```python
print("abc"[1])
```
```output
b
```
- A) An error
- B) b
- C) a
- D) c
Answer: B

**Q3 (13.1)** What does this show?
```python
print("abc"[-1])
```
```output
c
```
- A) An error
- B) a
- C) b
- D) c
Answer: D

**Q4 (13.1)** What error does this give?
```error IndexError
word = "hi"
print(word[2])
```
- A) ValueError
- B) NameError
- C) IndexError
- D) TypeError
Answer: C

**Q5 (13.1)** What error does this give?
```error TypeError
word = "hi"
word[0] = "H"
```
- A) ValueError
- B) TypeError
- C) NameError
- D) IndexError
Answer: B

**Q6 (13.2)** What does this show?
```python
print("hello".upper())
```
```output
HELLO
```
- A) hello
- B) An error
- C) Hello
- D) HELLO
Answer: D

**Q7 (13.2)** What does this show?
```python
print(" hi ".strip())
```
```output
hi
```
- A) ` hi `
- B) HI
- C) An error
- D) hi
Answer: D

**Q8 (13.2)** What does this show?
```python
print("ada lovelace".title())
```
```output
Ada Lovelace
```
- A) ADA LOVELACE
- B) ada lovelace
- C) Ada Lovelace
- D) Ada lovelace
Answer: C

**Q9 (13.2)** What does this show?
```python
word = "hey"
word.upper()
print(word)
```
```output
hey
```
- A) An error
- B) HEY
- C) hey
- D) Hey
Answer: C

**Q10 (13.2)** What does this show?
```python
print("  bOB ".strip().title())
```
```output
Bob
```
- A) BOB
- B) bOB
- C) An error
- D) Bob
Answer: D

**Q11 (13.3)** What does this show?
```python
print("python"[:2])
```
```output
py
```
- A) py
- B) pyt
- C) on
- D) An error
Answer: A

**Q12 (13.3)** What does this show?
```python
print("python"[3:])
```
```output
hon
```
- A) pyt
- B) An error
- C) ho
- D) hon
Answer: D

**Q13 (13.3)** What does this show?
```python
print("python"[-3:])
```
```output
hon
```
- A) pyt
- B) hon
- C) An error
- D) tho
Answer: B

**Q14 (13.4)** What does this show?
```python
print("banana".find("n"))
```
```output
2
```
- A) -1
- B) 1
- C) 3
- D) 2
Answer: D

**Q15 (13.4)** What does this show?
```python
print("cold".replace("c", "b"))
```
```output
bold
```
- A) bold
- B) An error
- C) bld
- D) cold
Answer: A

**Q16 (13.4)** What does this show?
```python
print("mississippi".count("s"))
```
```output
4
```
- A) 5
- B) 2
- C) 3
- D) 4
Answer: D

**Q17 (13.5)** What does this show?
```python
print("a b c".split())
```
```output
['a', 'b', 'c']
```
- A) `['a b c']`
- B) `['a', 'b', 'c']`
- C) `a b c`
- D) An error
Answer: B

**Q18 (13.5)** What does this show?
```python
print("+".join(["1", "2", "3"]))
```
```output
1+2+3
```
- A) An error
- B) 6
- C) 1+2+3
- D) 123
Answer: C

**Q19 (13.5)** What does this show?
```python
print(" ".join("  a    b  ".split()))
```
```output
a b
```
- A) a b
- B) An error
- C) ab
- D) `  a    b  `
Answer: A

**Q20 (mixed)** True or false: `word.upper()` changes the variable word to capitals.
Answer: False
Why: upper() gives back new text. The variable only changes if you store the result.

**Q21 (13.1)** What does this show?
```python
print(len("a b"))
```
```output
3
```
- A) 2
- B) 4
- C) 3
- D) 1
Answer: C

**Q22 (13.2)** What does this show?
```python
print("PyThOn".lower())
```
```output
python
```
- A) An error
- B) Python
- C) PYTHON
- D) python
Answer: D

**Q23 (13.3)** What does this show?
```python
print("hello"[1:3])
```
```output
el
```
- A) el
- B) he
- C) ell
- D) hel
Answer: A

**Q24 (13.4)** What does this show?
```python
print("a.b.c".replace(".", "-"))
```
```output
a-b-c
```
- A) a.b.c
- B) a-b-c
- C) abc
- D) An error
Answer: B

**Q25 (13.5)** What does this show?
```python
print(" ".join(["Hello", "world"]))
```
```output
Hello world
```
- A) Helloworld
- B) `['Hello', 'world']`
- C) Hello world
- D) An error
Answer: C

Note: this bank has 25 questions.
