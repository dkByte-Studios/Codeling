# Python, Unit 7: Meet lists

This is a short first look at lists. It sits right after the `for` loop so the loop units that follow can use lists. Unit 11 goes deeper (negative positions, sorting, slicing).

Format notes: same as Units 1 to 6.

---

## Lesson 7.1: A list is a group of values

**Teach**
So far each variable has held one value. A list holds many values in one variable.

A list uses square brackets `[ ]`, with commas between the items.

```python
fruits = ["apple", "banana", "cherry"]
print(fruits)
```
```output
['apple', 'banana', 'cherry']
```

Notice how Python shows the list: with brackets, commas, and quotes around text.

A list can hold numbers too, or a mix:

```python
nums = [3, 1, 2]
print(nums)
```
```output
[3, 1, 2]
```

A list with nothing in it is `[]`. It is called an empty list.

**1. Predict the output**
```python
nums = [3, 1, 2]
print(nums)
```
```output
[3, 1, 2]
```
- A) `nums`
- B) `[nums]`
- C) `[3, 1, 2]`
- D) `3 1 2`
Answer: C
Why: print shows the whole list, with brackets and commas.

**2. Predict the output**
```python
fruits = ["apple", "banana", "cherry"]
print(fruits)
```
```output
['apple', 'banana', 'cherry']
```
- A) `apple banana cherry`
- B) `['apple', 'banana', 'cherry']`
- C) `fruits`
- D) `"apple", "banana", "cherry"`
Answer: B
Why: A printed list shows its brackets and quotes around text. Python uses single quotes when it shows a list.

**3. Pick one**
Which one is a list?
- A) `123`
- B) `1 2 3`
- C) `"1, 2, 3"`
- D) `[1, 2, 3]`
Answer: D
Why: A list is written with square brackets and commas. `"1, 2, 3"` is just one piece of text.

**4. Fix the bug**
This gives a SyntaxError. What is wrong?
```error SyntaxError
colors = ["red", "blue"
```
- A) The word colors is wrong
- B) The closing bracket ] is missing
- C) The quotes are wrong
- D) Nothing is wrong
Answer: B
Why: The bracket that opens the list is never closed.

**5. Predict the output**
```python
items = []
print(items)
```
```output
[]
```
- A) `[]`
- B) An error
- C) `items`
- D) `0`
Answer: A
Why: An empty list is just two brackets with nothing inside.

**6. Predict the output**
A list can mix text and numbers.
```python
print([1, "two", 3])
```
```output
[1, 'two', 3]
```
- A) An error
- B) `1 two 3`
- C) `[1, two, 3]`
- D) `[1, 'two', 3]`
Answer: D
Why: Text gets quotes when shown, numbers do not.

**7. Write it yourself**
Make a list called pets with "cat", "dog" and "fish". Then show it.
Accepted: the program prints `['cat', 'dog', 'fish']`.
```python
pets = ["cat", "dog", "fish"]
print(pets)
```
```output
['cat', 'dog', 'fish']
```

Hint: Use square brackets with commas between the items. Then print the list's name.

**Recap**
A list holds many values in square brackets, separated by commas. `[]` is an empty list.

---

## Lesson 7.2: Positions

**Teach**
Each item in a list has a position, called an index. Counting starts at 0, not 1.

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])
print(fruits[2])
```
```output
apple
cherry
```

| Position | 0 | 1 | 2 |
|---|---|---|---|
| Item | apple | banana | cherry |

Put the position in square brackets right after the list name. `fruits[0]` is the first item.

If you ask for a position that does not exist, you get an `IndexError`:

```error IndexError
fruits = ["apple", "banana", "cherry"]
print(fruits[3])
```

Python says: `IndexError: list index out of range`. A list of 3 items has positions 0, 1 and 2, so 3 is too far.

**1. Predict the output**
```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])
```
```output
apple
```
- A) apple
- B) fruits
- C) cherry
- D) banana
Answer: A
Why: Position 0 is the first item.

**2. Predict the output**
```python
fruits = ["apple", "banana", "cherry"]
print(fruits[1])
```
```output
banana
```
- A) apple
- B) An error
- C) banana
- D) cherry
Answer: C
Why: Position 1 is the second item.

**3. Pick one**
In `["apple", "banana", "cherry"]`, which position holds cherry?
- A) 2
- B) 3
- C) 1
- D) 0
Answer: A
Why: Counting from 0: apple is 0, banana is 1, cherry is 2.

**4. Predict the output**
```python
nums = [10, 20, 30]
print(nums[2])
```
```output
30
```
- A) 20
- B) 10
- C) 2
- D) 30
Answer: D
Why: Position 2 is the third item.

**5. Predict**
What happens when this runs?
```error IndexError
nums = [10, 20, 30]
print(nums[3])
```
- A) It gives an IndexError
- B) It shows nothing
- C) It shows 3
- D) It shows 30
Answer: A
Why: The list has three items, at positions 0, 1 and 2. There is no position 3.

**6. Predict the output**
```python
nums = [10, 20, 30]
print(nums[0] + nums[1])
```
```output
30
```
- A) 30
- B) An error
- C) 1020
- D) 10 + 20
Answer: A
Why: Both are numbers, so + adds them.

**7. True or false**
The first item of a list is at position 1.
Answer: False
Why: Counting starts at 0, so the first item is at position 0.

**8. Write it yourself**
Show the second item of this list.
Starter:
```
pets = ["cat", "dog", "fish"]
```
Accepted: the program prints `dog`.
```python
pets = ["cat", "dog", "fish"]
print(pets[1])
```
```output
dog
```

Hint: Positions start at 0, so the second item is at position 1.

**Recap**
Positions start at 0. `list[0]` is the first item. A position that is too big gives an IndexError.

---

## Lesson 7.3: Looping over a list

**Teach**
A `for` loop can go through a list, just like it went through text. It runs once for each item.

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```
```output
apple
banana
cherry
```

`fruit` is a name you pick. In each round it holds the next item in the list.

Here is the trace table:

```trace line=3 vars=fruit
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```
```table
fruit='apple'
fruit='banana'
fruit='cherry'
final fruit='cherry'
```

You can do maths with number lists too:

```python
total = 0
for n in [1, 2, 3]:
    total += n
print(total)
```
```output
6
```

**1. Predict the output**
```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```
```output
apple
banana
cherry
```
- A) `['apple', 'banana', 'cherry']` (one line)
- B) apple, banana, cherry (three lines)
- C) cherry only
- D) fruit, fruit, fruit
Answer: B
Why: The loop runs once per item, and each round shows the current item.

**2. Pick one**
How many times does this loop run?
`for pet in ["cat", "dog"]:`
- A) 3
- B) 0
- C) 1
- D) 2
Answer: D
Why: The list has two items, so the loop runs twice.

**3. Predict the output**
```python
for n in [3, 5]:
    print(n * 2)
```
```output
6
10
```
- A) 6, 10 (two lines)
- B) 3, 5 (two lines)
- C) 8
- D) 35
Answer: A
Why: In round one n is 3, so n * 2 is 6. In round two n is 5, so n * 2 is 10.

**4. Fill in the table**
Fill in n each time the print line is about to run, then after the loop.
```trace line=2 vars=n
for n in [4, 7, 9]:
    print(n)
```
```table
n=4
n=7
n=9
final n=9
```
Why: n takes each item in turn, and after the loop it still holds the last one.

**5. Predict the output**
```python
total = 0
for n in [1, 2, 3]:
    total += n
print(total)
```
```output
6
```
- A) 0
- B) 123
- C) 6
- D) 3
Answer: C
Why: 0 plus 1 is 1, plus 2 is 3, plus 3 is 6.

**6. Fill the blank**
Which is a valid name for the loop variable?
`for ___ in fruits:`
- A) fruit
- B) my fruit
- C) in
- D) 1st
Answer: A
Why: It follows the same naming rules as any variable. `1st` starts with a number, `my fruit` has a space, and `in` is a Python word.

**7. Write it yourself**
Show each pet on its own line.
Starter:
```
pets = ["cat", "dog", "fish"]
```
Accepted: the program prints cat, dog, fish, each on its own line.
```python
pets = ["cat", "dog", "fish"]
for pet in pets:
    print(pet)
```
```output
cat
dog
fish
```

Hint: Use `for pet in pets:` and print pet inside the loop.

**Recap**
`for item in list:` runs once per item, and the loop variable holds the current item.

---

## Lesson 7.4: Adding and counting

**Teach**
A list can grow. `append` adds a new item to the end.

```python
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)
```
```output
['apple', 'banana', 'cherry']
```

`len` tells you how many items are in a list.

```python
fruits = ["apple", "banana", "cherry"]
print(len(fruits))
```
```output
3
```

A common pattern: start with an empty list and fill it up.

```python
shopping = []
shopping.append("milk")
shopping.append("eggs")
print(shopping)
```
```output
['milk', 'eggs']
```

Because positions start at 0, the last item of a list is at position `len(list) - 1`.

**1. Predict the output**
```python
nums = [1, 2]
nums.append(3)
print(nums)
```
```output
[1, 2, 3]
```
- A) `[1, 2, 3]`
- B) `[3, 1, 2]`
- C) `[1, 2]`
- D) `[1, 2, [3]]`
Answer: A
Why: append adds the new item at the end.

**2. Predict the output**
```python
print(len(["a", "b", "c"]))
```
```output
3
```
- A) 3
- B) 2
- C) 4
- D) a
Answer: A
Why: len counts the items. There are three.

**3. Predict the output**
```python
items = []
print(len(items))
```
```output
0
```
- A) []
- B) 1
- C) An error
- D) 0
Answer: D
Why: An empty list has no items, so its length is 0.

**4. Predict the output**
```python
letters = []
letters.append("x")
letters.append("y")
print(letters)
```
```output
['x', 'y']
```
- A) `['x']`
- B) `['y', 'x']`
- C) `['x', 'y']`
- D) `[]`
Answer: C
Why: Each append adds to the end, so x goes in first and y after it.

**5. Pick one**
Which line adds 5 to the end of the list nums?
- A) `nums.add(5)`
- B) `nums.push(5)`
- C) `nums.append(5)`
- D) `nums + 5`
Answer: C
Why: In Python the word is append. The others are used by other languages.

**6. Predict the output**
```python
nums = [5, 6, 7]
print(nums[len(nums) - 1])
```
```output
7
```
- A) 5
- B) An error
- C) 6
- D) 7
Answer: D
Why: len(nums) is 3, so the position is 2, the last item.

**7. Write it yourself**
pets has two items. Add "bird" to it, then show how many items it has.
Starter:
```
pets = ["cat", "dog"]
```
Accepted: the program prints `3`.
```python
pets = ["cat", "dog"]
pets.append("bird")
print(len(pets))
```
```output
3
```

Hint: `append` adds an item to the end of a list, and `len` tells you how many items there are.

**Recap**
`append` adds to the end, and `len` counts the items. The last position is `len(list) - 1`.

---

## Unit 7 project: A shopping list

**Goal**
Ask for three items, store them in a list, then show the list and how many items it has.

If the person types milk, eggs and bread, the program shows:
```
Your list:
milk
eggs
bread
Total: 3 items
```

**Guided steps**
1. Start with an empty list: `shopping = []`.
2. Use a for loop with `range(3)`. In each round, ask for an item with `input` and add it with `append`.
3. After the loop, show `Your list:`.
4. Use a second for loop to show each item on its own line.
5. Finish with `Total:` and the number of items from `len`.

**Accepted**
```python inputs=milk,eggs,bread
shopping = []
for i in range(3):
    item = input("Item? ")
    shopping.append(item)
print("Your list:")
for item in shopping:
    print(item)
print(f"Total: {len(shopping)} items")
```
```output
Your list:
milk
eggs
bread
Total: 3 items
```
```python inputs=apple,pear,fig
shopping = []
for i in range(3):
    item = input("Item? ")
    shopping.append(item)
print("Your list:")
for item in shopping:
    print(item)
print(f"Total: {len(shopping)} items")
```
```output
Your list:
apple
pear
fig
Total: 3 items
```

**Recap**
You used a list, a loop to fill it, a loop to show it, and `len`. This is the pattern behind almost every app that keeps a collection of things.

---

## Unit 7 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (7.1)** What does this show?
```python
print(["a", "b"])
```
```output
['a', 'b']
```
- A) `['a', 'b']`
- B) `a b`
- C) `["a", "b"]`
- D) An error
Answer: A

**Q2 (7.1)** What does this show?
```python
nums = [1, 2, 3]
print(nums)
```
```output
[1, 2, 3]
```
- A) `1 2 3`
- B) `[1, 2, 3]`
- C) `123`
- D) `nums`
Answer: B

**Q3 (7.1)** What is `[]`?
- A) A list with one item
- B) An error
- C) An empty list
- D) The number 0
Answer: C

**Q4 (7.2)** What does this show?
```python
nums = [5, 6, 7]
print(nums[0])
```
```output
5
```
- A) 6
- B) 7
- C) 5
- D) 0
Answer: C

**Q5 (7.2)** What does this show?
```python
nums = [5, 6, 7]
print(nums[1])
```
```output
6
```
- A) 6
- B) 1
- C) 7
- D) 5
Answer: A

**Q6 (7.2)** A list has 4 items. What is the position of the last item?
- A) 0
- B) 4
- C) 3
- D) 5
Answer: C

**Q7 (7.2)** What happens when this runs?
```error IndexError
nums = [1, 2, 3]
print(nums[3])
```
- A) It shows nothing
- B) It shows 3
- C) An IndexError
- D) It shows 0
Answer: C

**Q8 (7.2)** True or false: a list's first position is 0.
Answer: True

**Q9 (7.3)** What does this show?
```python
for w in ["hi", "yo"]:
    print(w * 2)
```
```output
hihi
yoyo
```
- A) hiyo
- B) hi, yo (two lines)
- C) An error
- D) hihi, yoyo (two lines)
Answer: D

**Q10 (7.3)** What does this show?
```python
total = 0
for n in [2, 4, 6]:
    total += n
print(total)
```
```output
12
```
- A) 6
- B) 0
- C) 12
- D) 246
Answer: C

**Q11 (7.3)** How many times does this loop run?
`for x in ["a", "b", "c", "d"]:`
- A) 3
- B) 5
- C) 1
- D) 4
Answer: D

**Q12 (7.3)** Fill in n each time the print line is about to run, then after the loop.
```trace line=2 vars=n
for n in [2, 5, 8]:
    print(n)
```
```table
n=2
n=5
n=8
final n=8
```

**Q13 (7.4)** What does this show?
```python
print(len(["x", "y", "z", "w"]))
```
```output
4
```
- A) 4
- B) x
- C) 5
- D) 3
Answer: A

**Q14 (7.4)** What does this show?
```python
items = [1, 2, 3]
items.append(4)
print(len(items))
```
```output
4
```
- A) 1
- B) 4
- C) 3
- D) 5
Answer: B

**Q15 (7.4)** What does this show?
```python
print(len([]))
```
```output
0
```
- A) 0
- B) An error
- C) []
- D) 1
Answer: A

**Q16 (7.4)** What does this show?
```python
colors = ["red", "green"]
colors.append("blue")
print(colors[2])
```
```output
blue
```
- A) red
- B) green
- C) blue
- D) An error
Answer: C

**Q17 (7.4)** What does this show?
```python
pets = []
pets.append("cat")
pets.append("dog")
print(pets)
```
```output
['cat', 'dog']
```
- A) `['dog', 'cat']`
- B) `[]`
- C) `['cat', 'dog']`
- D) `['cat']`
Answer: C

**Q18 (mixed)** What does this show?
```python
nums = [3, 8]
print(nums[0] + nums[1])
```
```output
11
```
- A) 38
- B) 11
- C) An error
- D) 3 + 8
Answer: B

**Q19 (mixed)** Which line makes a list?
- A) `things = [1, 2, 3]`
- B) `things = (1 2 3`
- C) `things = 1, 2, 3 }`
- D) `things = "1, 2, 3"`
Answer: A

**Q20 (mixed)** What does this show?
```python
names = ["Sam", "Mia"]
for name in names:
    print("Hi " + name)
```
```output
Hi Sam
Hi Mia
```
- A) Hi Sam only
- B) Hi names
- C) An error
- D) Hi Sam, Hi Mia (two lines)
Answer: D

**Q21 (7.1)** What does this show?
```python
nums = [4, 5, 6]
print(nums)
```
```output
[4, 5, 6]
```
- A) `4 5 6`
- B) An error
- C) `[4, 5, 6]`
- D) `nums`
Answer: C

**Q22 (7.2)** What does this show?
```python
letters = ["a", "b", "c", "d"]
print(letters[3])
```
```output
d
```
- A) c
- B) a
- C) An error
- D) d
Answer: D

**Q23 (7.3)** What does this show?
```python
for n in [1, 2, 3]:
    print(n + 10)
```
```output
11
12
13
```
- A) 36
- B) An error
- C) 11, 12, 13 (three lines)
- D) 1, 2, 3 (three lines)
Answer: C

**Q24 (7.4)** What does this show?
```python
items = ["a"]
items.append("b")
items.append("c")
print(len(items))
```
```output
3
```
- A) 1
- B) 3
- C) 2
- D) An error
Answer: B

**Q25 (7.2)** What error does this give?
```error IndexError
nums = [1, 2, 3]
print(nums[5])
```
- A) ValueError
- B) TypeError
- C) NameError
- D) IndexError
Answer: D

Note: this bank has 25 questions.
