# Python, Unit 11: Lists in depth

This unit builds on Unit 7, Meet lists. Learners already know how to make a list, read an item by position, loop over it, and use `append` and `len`. Here they learn to count from the end, change items, search, sort and slice.

Format notes: same as Units 1 to 10. The error messages quoted in the teach text are checked by `check.py`.

---

## Lesson 11.1: Indexes in depth

**Teach**
A quick reminder: positions start at 0.

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])
```
```output
apple
```

Python also lets you count from the end with negative positions. `-1` is the last item, `-2` is the one before it, and so on.

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[-1])
print(fruits[-2])
```
```output
cherry
banana
```

This is handy, because you do not need to know how long the list is to get its last item.

A list of 3 items has the valid positions 0, 1, 2 and also -1, -2, -3. Anything else gives an `IndexError`.

```error IndexError
nums = [1, 2, 3]
print(nums[-4])
```

Python says: `IndexError: list index out of range`.

A list can also mix types, like `["a", 2, True]`. Each item keeps its own type.

**1. Predict the output**
```python
fruits = ["apple", "banana", "cherry"]
print(fruits[-1])
```
```output
cherry
```
- A) cherry
- B) apple
- C) An error
- D) banana
Answer: A
Why: -1 is the last item.

**2. Predict the output**
```python
fruits = ["apple", "banana", "cherry"]
print(fruits[-2])
```
```output
banana
```
- A) banana
- B) apple
- C) cherry
- D) An error
Answer: A
Why: -2 is the second item from the end.

**3. Predict the output**
Each item keeps its own type.
```python
items = ["a", 2, True]
print(items[1] + 1)
```
```output
3
```
- A) 3
- B) a1
- C) 21
- D) An error
Answer: A
Why: items[1] is the number 2, so adding 1 gives 3.

**4. Pick one**
A list has 5 items. Which positions are valid?
- A) 0 to 4, and -1 to -5
- B) -5 to 5
- C) 0 to 5
- D) 1 to 5
Answer: A
Why: Counting from the front you get 0 to 4. Counting from the back you get -1 to -5.

**5. Predict**
What happens when this runs?
```error IndexError
nums = [1, 2, 3]
print(nums[-4])
```
- A) It shows 1
- B) It shows nothing
- C) It shows -4
- D) It gives an IndexError
Answer: D
Why: A list of 3 items only goes back as far as -3.

**6. Predict the output**
```python
nums = [5, 6, 7]
print(nums[len(nums) - 1] == nums[-1])
```
```output
True
```
- A) 7
- B) False
- C) An error
- D) True
Answer: D
Why: The last position is len minus 1, and that is exactly what -1 means.

**7. Write it yourself**
Show the last color in the list, using a negative position.
Starter:
```
colors = ["red", "green", "blue"]
```
Accepted: the program prints `blue`.
```python
colors = ["red", "green", "blue"]
print(colors[-1])
```
```output
blue
```

Hint: Negative positions count from the end. Which one is the last item?

**Recap**
Negative positions count from the end: `-1` is the last item. A position outside the list gives an IndexError.

---

## Lesson 11.2: Changing lists

**Teach**
Lists can be changed after you make them.

Change one item by giving its position a new value:

```python
nums = [1, 2, 3]
nums[1] = 20
print(nums)
```
```output
[1, 20, 3]
```

Add or remove items:
- `insert(position, item)` adds an item at a position, and pushes the others along.
- `remove(item)` removes the first matching item.
- `pop()` removes the last item and gives it back to you. `pop(position)` removes the item at a position.

```python
letters = ["a", "c"]
letters.insert(1, "b")
print(letters)
```
```output
['a', 'b', 'c']
```

```python
nums = [1, 2, 3]
last = nums.pop()
print(last)
print(nums)
```
```output
3
[1, 2]
```

If `remove` cannot find the item, you get a `ValueError`:

```error ValueError
nums = [1, 2]
nums.remove(9)
```

Python says: `ValueError: list.remove(x): x not in list`.

**1. Predict the output**
```python
nums = [1, 2, 3]
nums[1] = 20
print(nums)
```
```output
[1, 20, 3]
```
- A) `[1, 2, 3, 20]`
- B) `[1, 20, 3]`
- C) `[20, 2, 3]`
- D) `[1, 2, 20]`
Answer: B
Why: nums[1] is the second item, and it gets the new value.

**2. Predict the output**
```python
letters = ["a", "c"]
letters.insert(1, "b")
print(letters)
```
```output
['a', 'b', 'c']
```
- A) `['a', 'b', 'c']`
- B) `['a', 'c', 'b']`
- C) `['b', 'a', 'c']`
- D) `['a', 'c']`
Answer: A
Why: insert puts "b" at position 1 and pushes "c" along.

**3. Predict the output**
```python
nums = [4, 5, 6]
nums.remove(5)
print(nums)
```
```output
[4, 6]
```
- A) `[4, 5]`
- B) `[4, 6]`
- C) `[4, 5, 6]`
- D) `[5, 6]`
Answer: B
Why: remove takes out the item with the value 5.

**4. Predict the output**
```python
nums = [1, 2, 3]
last = nums.pop()
print(last)
print(nums)
```
```output
3
[1, 2]
```
- A) 3, then `[1, 2, 3]`
- B) 1, then `[2, 3]`
- C) 3, then `[1, 2]`
- D) `[1, 2]`, then 3
Answer: C
Why: pop removes the last item and gives it back. So last holds 3, and nums has lost it.

**5. Pick one**
What error does this give?
```error ValueError
nums = [1, 2]
nums.remove(9)
```
- A) TypeError
- B) ValueError
- C) NameError
- D) IndexError
Answer: B
Why: 9 is not in the list, so remove cannot find it.

**6. Predict the output**
```python
nums = [7, 8, 9]
nums.pop(0)
print(nums)
```
```output
[8, 9]
```
- A) `[8, 9]`
- B) `[7]`
- C) `[7, 8]`
- D) `[9]`
Answer: A
Why: pop(0) removes the item at position 0, the first one.

**7. Write it yourself**
Change the second item to "x", then show the list.
Starter:
```
letters = ["a", "b", "c"]
```
Accepted: the program prints `['a', 'x', 'c']`.
```python
letters = ["a", "b", "c"]
letters[1] = "x"
print(letters)
```
```output
['a', 'x', 'c']
```

Hint: Give the position its new value, like `letters[1] = ...`. The second item is at position 1.

**Recap**
Change an item with `list[position] = value`. Use `insert`, `remove` and `pop` to add and take away items.

---

## Lesson 11.3: Looping with positions

**Teach**
In Unit 7 you looped over a list with `for item in list`. Sometimes you need the position too, or you want to change the items. Then loop over the positions with `range(len(list))`.

```python
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")
```
```output
0: apple
1: banana
2: cherry
```

`len(fruits)` is 3, so `range(3)` gives the positions 0, 1, 2. Then `fruits[i]` is the item at each position.

```trace line=3 vars=i
nums = [5, 6, 7]
for i in range(len(nums)):
    print(nums[i])
```
```table
i=0
i=1
i=2
final i=2
```

To change items in place, you have to use the position:

```python
nums = [1, 2, 3]
for i in range(len(nums)):
    nums[i] = nums[i] * 2
print(nums)
```
```output
[2, 4, 6]
```

The plain `for item in list` loop cannot do this. The loop variable is a copy:

```python
nums = [1, 2, 3]
for n in nums:
    n = n * 2
print(nums)
```
```output
[1, 2, 3]
```

Here `n` gets doubled each round, but the list never changes.

**1. Predict the output**
```python
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")
```
```output
0: apple
1: banana
2: cherry
```
- A) 1: apple, 2: banana, 3: cherry
- B) 0: apple, 1: banana, 2: cherry
- C) 0, 1, 2
- D) apple, banana, cherry
Answer: B
Why: i is the position, starting at 0, and fruits[i] is the item there.

**2. Fill in the table**
Fill in i each time the print line is about to run, then after the loop.
```trace line=3 vars=i
nums = [5, 6, 7]
for i in range(len(nums)):
    print(nums[i])
```
```table
i=0
i=1
i=2
final i=2
```
Why: The list has 3 items, so i takes the positions 0, 1 and 2.

**3. Predict the output**
```python
nums = [1, 2, 3]
for i in range(len(nums)):
    nums[i] = nums[i] * 2
print(nums)
```
```output
[2, 4, 6]
```
- A) `[2, 4, 6]`
- B) `[1, 2, 3]`
- C) `[2, 4, 3]`
- D) `[1, 4, 9]`
Answer: A
Why: Each round changes the item at position i, so the list itself is doubled.

**4. Predict the output**
Look carefully. This loop does not use positions.
```python
nums = [1, 2, 3]
for n in nums:
    n = n * 2
print(nums)
```
```output
[1, 2, 3]
```
- A) An error
- B) `[1, 2, 3]`
- C) `[2, 4, 6]`
- D) `[1, 4, 9]`
Answer: B
Why: n is only a copy of each item. Doubling the copy leaves the list alone.

**5. Pick one**
When do you need `for i in range(len(list))`?
- A) When you need the position, or want to change the items
- B) Only for text
- C) Always
- D) Never
Answer: A
Why: For just reading each item, `for item in list` is simpler.

**6. Predict the output**
Why does the loop use `len(nums) - 1`? Because it looks at nums[i + 1], and the last item has no neighbor after it.
```python
nums = [3, 5, 4]
for i in range(len(nums) - 1):
    if nums[i] > nums[i + 1]:
        print(f"drop after {nums[i]}")
```
```output
drop after 5
```
- A) drop after 4
- B) drop after 3
- C) Nothing is shown
- D) drop after 5
Answer: D
Why: 3 is not bigger than 5, but 5 is bigger than 4, so the drop is after 5. Stopping at len minus 1 keeps `nums[i + 1]` from running off the end.

**7. Write it yourself**
Add 10 to every item in the list, in place, then show the list.
Starter:
```
nums = [1, 2, 3, 4]
```
Accepted: the program prints `[11, 12, 13, 14]`.
```python
nums = [1, 2, 3, 4]
for i in range(len(nums)):
    nums[i] = nums[i] + 10
print(nums)
```
```output
[11, 12, 13, 14]
```

Hint: You need the positions, so loop over `range(len(nums))` and change `nums[i]` inside.

**Recap**
`for i in range(len(list))` gives the positions, so you can read neighbors and change items. The loop variable in `for item in list` is only a copy.

---

## Lesson 11.4: Searching

**Teach**
Often you need to ask a question about a list.

- `item in list` is True if the item is in the list. `not in` asks the opposite.
- `list.count(item)` tells you how many times it appears.
- `list.index(item)` tells you the position of the first match.

```python
fruits = ["apple", "banana", "cherry"]
print("banana" in fruits)
print("kiwi" in fruits)
print(fruits.index("cherry"))
```
```output
True
False
2
```

`in` works nicely inside an `if`:

```python
fruits = ["apple", "banana"]
if "banana" in fruits:
    print("yes")
else:
    print("no")
```
```output
yes
```

If `index` cannot find the item, you get a `ValueError`:

```error ValueError
print(["a"].index("z"))
```

Python says: `ValueError: list.index(x): x not in list`. (Some versions of Python word it as `'z' is not in list`. The kind of error, ValueError, is the same.) So check with `in` first if the item might be missing.

**1. Predict the output**
```python
print("b" in ["a", "b"])
```
```output
True
```
- A) b
- B) True
- C) False
- D) An error
Answer: B
Why: "b" is one of the items.

**2. Predict the output**
```python
print(5 in [1, 2, 3])
```
```output
False
```
- A) An error
- B) False
- C) 5
- D) True
Answer: B
Why: 5 is not in the list.

**3. Predict the output**
```python
print([1, 2, 1, 1].count(1))
```
```output
3
```
- A) 2
- B) 1
- C) 3
- D) 4
Answer: C
Why: The value 1 appears three times.

**4. Predict the output**
```python
print(["a", "b", "c"].index("c"))
```
```output
2
```
- A) c
- B) 2
- C) 3
- D) 1
Answer: B
Why: index gives the position, and positions start at 0.

**5. Predict**
What error does this give?
```error ValueError
print(["a"].index("z"))
```
- A) NameError
- B) ValueError
- C) TypeError
- D) IndexError
Answer: B
Why: "z" is not in the list, so index cannot find it.

**6. Predict the output**
```python
fruits = ["apple", "banana"]
if "banana" in fruits:
    print("yes")
else:
    print("no")
```
```output
yes
```
- A) yes
- B) An error
- C) no
- D) banana
Answer: A
Why: "banana" is in the list, so the if block runs.

**7. Write it yourself**
Show True or False for whether "cat" is in the list.
Starter:
```
pets = ["dog", "cat"]
```
Accepted: the program prints `True`.
```python
pets = ["dog", "cat"]
print("cat" in pets)
```
```output
True
```

Hint: The word `in` asks whether an item is in a list. Print the answer.

**Recap**
`in` asks if an item is there, `count` counts it, and `index` finds its position. `index` fails if the item is missing.

---

## Lesson 11.5: Sorting and totals

**Teach**
Python can sort a list for you.

- `sorted(list)` gives you a new sorted list. The original stays as it was.
- `list.sort()` sorts the list itself, in place. It gives back `None`.
- Add `reverse=True` to sort from biggest to smallest.

```python
nums = [3, 1, 2]
print(sorted(nums))
print(nums)
```
```output
[1, 2, 3]
[3, 1, 2]
```

```python
nums = [3, 1, 2]
nums.sort()
print(nums)
```
```output
[1, 2, 3]
```

A common trap: `.sort()` gives back `None`, so `result = nums.sort()` makes result `None`.

Three more helpers work on a list of numbers: `sum` adds them up, `min` finds the smallest and `max` finds the biggest.

```python
nums = [4, 9, 2]
print(sum(nums))
print(min(nums))
print(max(nums))
```
```output
15
2
9
```

Text sorts alphabetically.

**1. Predict the output**
```python
nums = [3, 1, 2]
print(sorted(nums))
print(nums)
```
```output
[1, 2, 3]
[3, 1, 2]
```
- A) `[3, 1, 2]`, then `[1, 2, 3]`
- B) `[3, 1, 2]`, then `[3, 1, 2]`
- C) `[1, 2, 3]`, then `[1, 2, 3]`
- D) `[1, 2, 3]`, then `[3, 1, 2]`
Answer: D
Why: sorted gives a new list. The original is not changed.

**2. Predict the output**
```python
nums = [5, 3, 9]
nums.sort()
print(nums)
```
```output
[3, 5, 9]
```
- A) `[9, 5, 3]`
- B) `[3, 5, 9]`
- C) `[5, 3, 9]`
- D) None
Answer: B
Why: sort() changes the list itself, putting it in order.

**3. Predict the output**
```python
print(sorted([1, 3, 2], reverse=True))
```
```output
[3, 2, 1]
```
- A) `[1, 3, 2]`
- B) `[1, 2, 3]`
- C) An error
- D) `[3, 2, 1]`
Answer: D
Why: reverse=True sorts from biggest to smallest.

**4. Predict the output**
```python
nums = [4, 9, 2]
print(max(nums) - min(nums))
```
```output
7
```
- A) 15
- B) 5
- C) 11
- D) 7
Answer: D
Why: The biggest is 9 and the smallest is 2, so the difference is 7.

**5. Predict the output**
Look carefully at the second line.
```python
nums = [3, 1, 2]
result = nums.sort()
print(result)
```
```output
None
```
- A) None
- B) `[1, 2, 3]`
- C) `[3, 1, 2]`
- D) An error
Answer: A
Why: sort() changes the list in place and gives back None. If you want the sorted list as a result, use sorted().

**6. Predict the output**
```python
print(sorted(["pear", "apple", "fig"]))
```
```output
['apple', 'fig', 'pear']
```
- A) `['apple', 'fig', 'pear']`
- B) `['pear', 'fig', 'apple']`
- C) An error
- D) `['pear', 'apple', 'fig']`
Answer: A
Why: Text sorts alphabetically.

**7. Write it yourself**
Show the scores sorted from biggest to smallest.
Starter:
```
scores = [70, 95, 82]
```
Accepted: the program prints `[95, 82, 70]`.
```python
scores = [70, 95, 82]
print(sorted(scores, reverse=True))
```
```output
[95, 82, 70]
```

Hint: `sorted` makes a new sorted list. Add `reverse=True` to put the biggest first.

**Recap**
`sorted()` gives a new sorted list, `.sort()` sorts in place and gives back `None`. `sum`, `min` and `max` work on number lists.

---

## Lesson 11.6: Slicing

**Teach**
A slice is a piece of a list. You write two positions with a colon: `list[start:stop]`. It works like `range`: the start is included, the stop is not.

```python
nums = [10, 20, 30, 40, 50]
print(nums[1:3])
```
```output
[20, 30]
```

You can leave out one side:
- `nums[:2]` starts at the beginning, so it gives the first 2 items.
- `nums[2:]` goes to the end, so it gives everything from position 2.
- `nums[-2:]` gives the last 2 items.

```python
nums = [10, 20, 30, 40, 50]
print(nums[:2])
print(nums[2:])
print(nums[-2:])
```
```output
[10, 20]
[30, 40, 50]
[40, 50]
```

A slice is a new list. It does not change the original. And unlike a single position, a slice that goes past the end does not give an error. It just stops at the end.

The number of items in a slice is stop minus start, just like with `range`.

**1. Predict the output**
```python
nums = [10, 20, 30, 40, 50]
print(nums[1:3])
```
```output
[20, 30]
```
- A) `[10, 20, 30]`
- B) `[20, 30, 40]`
- C) `[20, 30]`
- D) `[10, 20]`
Answer: C
Why: It starts at position 1 and stops before position 3.

**2. Predict the output**
```python
nums = [10, 20, 30, 40, 50]
print(nums[:2])
```
```output
[10, 20]
```
- A) `[50]`
- B) `[10, 20, 30]`
- C) `[10, 20]`
- D) `[20, 30]`
Answer: C
Why: Leaving out the start means start at the beginning, and stop before position 2.

**3. Predict the output**
```python
nums = [10, 20, 30, 40, 50]
print(nums[2:])
```
```output
[30, 40, 50]
```
- A) `[30]`
- B) `[30, 40, 50]`
- C) `[20, 30, 40, 50]`
- D) `[10, 20]`
Answer: B
Why: Leaving out the stop means go all the way to the end.

**4. Predict the output**
```python
nums = [10, 20, 30, 40, 50]
print(nums[-2:])
```
```output
[40, 50]
```
- A) `[30, 40, 50]`
- B) `[40, 50]`
- C) `[50]`
- D) `[10, 20]`
Answer: B
Why: -2 is the second item from the end, and the slice runs to the end.

**5. Predict the output**
```python
nums = [10, 20, 30, 40, 50]
print(len(nums[1:4]))
```
```output
3
```
- A) 5
- B) 4
- C) 3
- D) 2
Answer: C
Why: The slice has stop minus start items, 4 minus 1.

**6. Predict the output**
```python
nums = [10, 20, 30, 40, 50]
print(nums[3:100])
```
```output
[40, 50]
```
- A) An IndexError
- B) `[40, 50, 0, 0]`
- C) `[]`
- D) `[40, 50]`
Answer: D
Why: A slice stops quietly at the end of the list. Only a single position causes an IndexError.

**7. Write it yourself**
Show the first three letters in the list.
Starter:
```
letters = ["a", "b", "c", "d", "e"]
```
Accepted: the program prints `['a', 'b', 'c']`.
```python
letters = ["a", "b", "c", "d", "e"]
print(letters[:3])
```
```output
['a', 'b', 'c']
```

Hint: A slice with the start left out begins at the first item. How many items do you want?

**Recap**
`list[start:stop]` gives a new list. The start is included, the stop is not. Leave one side out to go to the beginning or the end.

---

## Unit 11 project: Score board

**Goal**
Ask for four scores. Then show the list of scores, the highest, the lowest, the average, and the top three from best to worst.

If the person types 70, 95, 82 and 60, the program shows:
```
Scores: [70, 95, 82, 60]
Highest: 95
Lowest: 60
Average: 76.75
Top 3: [95, 82, 70]
```

**Guided steps**
1. Start with an empty list, `scores = []`.
2. Use a for loop that runs 4 times. Ask for a score, turn it into a whole number, and `append` it.
3. Show `Scores:` and the list.
4. Show `Highest:` using `max`, and `Lowest:` using `min`.
5. Show `Average:` using `sum` divided by `len`.
6. Make `ranked = sorted(scores, reverse=True)`, then show `Top 3:` with the slice `ranked[:3]`.

**Accepted**
```python inputs=70,95,82,60
scores = []
for i in range(4):
    score = int(input("Score? "))
    scores.append(score)
print(f"Scores: {scores}")
print(f"Highest: {max(scores)}")
print(f"Lowest: {min(scores)}")
print(f"Average: {sum(scores) / len(scores)}")
ranked = sorted(scores, reverse=True)
print(f"Top 3: {ranked[:3]}")
```
```output
Scores: [70, 95, 82, 60]
Highest: 95
Lowest: 60
Average: 76.75
Top 3: [95, 82, 70]
```
```python inputs=10,20,30,40
scores = []
for i in range(4):
    score = int(input("Score? "))
    scores.append(score)
print(f"Scores: {scores}")
print(f"Highest: {max(scores)}")
print(f"Lowest: {min(scores)}")
print(f"Average: {sum(scores) / len(scores)}")
ranked = sorted(scores, reverse=True)
print(f"Top 3: {ranked[:3]}")
```
```output
Scores: [10, 20, 30, 40]
Highest: 40
Lowest: 10
Average: 25.0
Top 3: [40, 30, 20]
```

**Recap**
You combined a loop, `append`, `max`, `min`, `sum`, `len`, `sorted` and a slice into one useful program.

---

## Unit 11 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (11.1)** What does this show?
```python
nums = [5, 6, 7]
print(nums[-1])
```
```output
7
```
- A) 6
- B) 7
- C) An error
- D) 5
Answer: B

**Q2 (11.1)** What does this show?
```python
nums = [5, 6, 7]
print(nums[-2])
```
```output
6
```
- A) 6
- B) 7
- C) 5
- D) An error
Answer: A

**Q3 (11.1)** What error does this give?
```error IndexError
nums = [1, 2]
print(nums[-3])
```
- A) NameError
- B) TypeError
- C) IndexError
- D) ValueError
Answer: C

**Q4 (11.2)** What does this show?
```python
nums = [1, 2, 3]
nums[0] = 9
print(nums)
```
```output
[9, 2, 3]
```
- A) `[9, 2, 3]`
- B) `[1, 2, 3, 9]`
- C) `[9]`
- D) `[1, 2, 9]`
Answer: A

**Q5 (11.2)** What does this show?
```python
nums = [1, 2, 3]
nums.remove(2)
print(nums)
```
```output
[1, 3]
```
- A) `[1, 2]`
- B) `[2, 3]`
- C) `[1, 3]`
- D) `[1, 2, 3]`
Answer: C

**Q6 (11.2)** What does this show?
```python
nums = [1, 2, 3]
print(nums.pop())
```
```output
3
```
- A) 3
- B) `[1, 2]`
- C) None
- D) 1
Answer: A

**Q7 (11.3)** What does this show?
```python
nums = [1, 2, 3]
for i in range(len(nums)):
    nums[i] = nums[i] + 1
print(nums)
```
```output
[2, 3, 4]
```
- A) `[1, 2, 3, 1]`
- B) `[1, 2, 3]`
- C) `[2, 3, 4]`
- D) An error
Answer: C

**Q8 (11.3)** What does this show?
```python
nums = [1, 2, 3]
for n in nums:
    n = n + 1
print(nums)
```
```output
[1, 2, 3]
```
- A) `[1, 2, 3, 1]`
- B) An error
- C) `[2, 3, 4]`
- D) `[1, 2, 3]`
Answer: D

**Q9 (11.3)** Fill in i each time the print line is about to run, then after the loop.
```trace line=3 vars=i
words = ["x", "y"]
for i in range(len(words)):
    print(words[i])
```
```table
i=0
i=1
final i=1
```

**Q10 (11.4)** What does this show?
```python
print("a" in ["a", "b"])
```
```output
True
```
- A) An error
- B) True
- C) False
- D) a
Answer: B

**Q11 (11.4)** What does this show?
```python
print([1, 2, 1].count(1))
```
```output
2
```
- A) 0
- B) 3
- C) 1
- D) 2
Answer: D

**Q12 (11.4)** What does this show?
```python
print(["a", "b", "c"].index("b"))
```
```output
1
```
- A) 1
- B) 2
- C) 0
- D) b
Answer: A

**Q13 (11.5)** What does this show?
```python
print(sorted([3, 1, 2]))
```
```output
[1, 2, 3]
```
- A) `[3, 2, 1]`
- B) `[3, 1, 2]`
- C) An error
- D) `[1, 2, 3]`
Answer: D

**Q14 (11.5)** What does this show?
```python
nums = [2, 1]
print(nums.sort())
```
```output
None
```
- A) `[2, 1]`
- B) `[1, 2]`
- C) An error
- D) None
Answer: D

**Q15 (11.5)** What does this show?
```python
print(sum([1, 2, 3, 4]))
```
```output
10
```
- A) 10
- B) 4
- C) An error
- D) 1234
Answer: A

**Q16 (11.6)** What does this show?
```python
nums = [10, 20, 30, 40]
print(nums[1:3])
```
```output
[20, 30]
```
- A) `[10, 20, 30]`
- B) `[20, 30, 40]`
- C) `[10, 20]`
- D) `[20, 30]`
Answer: D

**Q17 (11.6)** What does this show?
```python
nums = [10, 20, 30, 40]
print(nums[:2])
```
```output
[10, 20]
```
- A) `[20]`
- B) `[10, 20, 30]`
- C) `[10, 20]`
- D) `[30, 40]`
Answer: C

**Q18 (11.6)** What does this show?
```python
nums = [10, 20, 30, 40]
print(nums[-2:])
```
```output
[30, 40]
```
- A) `[30, 40]`
- B) `[10, 20]`
- C) `[20, 30, 40]`
- D) `[40]`
Answer: A

**Q19 (11.6)** How many items are in `nums[1:4]`?
- A) 5
- B) 2
- C) 4
- D) 3
Answer: D

**Q20 (mixed)** Which makes a new sorted list and leaves the original unchanged?
- A) `sort(nums)`
- B) `nums.sort()`
- C) `nums.sorted()`
- D) `sorted(nums)`
Answer: D

**Q21 (11.1)** What does this show?
```python
letters = ["x", "y", "z"]
print(letters[-3])
```
```output
x
```
- A) z
- B) An error
- C) x
- D) y
Answer: C

**Q22 (11.2)** What does this show?
```python
nums = [3, 6, 9]
nums.insert(1, 4)
print(nums)
```
```output
[3, 4, 6, 9]
```
- A) `[3, 6, 4, 9]`
- B) `[4, 3, 6, 9]`
- C) `[3, 4, 6, 9]`
- D) `[3, 6, 9, 4]`
Answer: C

**Q23 (11.4)** What does this show?
```python
print(["a", "b", "a"].count("a"))
```
```output
2
```
- A) 2
- B) 1
- C) 0
- D) 3
Answer: A

**Q24 (11.5)** What does this show?
```python
print(min([8, 3, 5]))
```
```output
3
```
- A) 3
- B) 8
- C) 16
- D) 5
Answer: A

**Q25 (11.6)** What does this show?
```python
print([1, 2, 3, 4, 5][1:4])
```
```output
[2, 3, 4]
```
- A) `[2, 3, 4]`
- B) `[1, 2, 3]`
- C) `[1, 2, 3, 4]`
- D) `[2, 3, 4, 5]`
Answer: A

Note: this bank has 25 questions.
