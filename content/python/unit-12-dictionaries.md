# Python, Unit 12: Dictionaries

A list stores items by position. A dictionary stores them by name. This unit covers how to make, read, change and loop over dictionaries, how to keep a list of them, and how they relate to JSON, the text format that apps use to save and share data.

Format notes: same as Units 1 to 11. A `json` block means the text must be valid JSON, and a `badjson` block means it must not be. `check.py` verifies both, and the error messages quoted in the teach text.

---

## Lesson 12.1: Key and value

**Teach**
Think of a real dictionary: you look up a word and get its meaning. A Python dictionary works the same way. Each entry has a key (what you look up) and a value (what you get back).

A dictionary uses curly braces. Each pair is `key: value`, and pairs are separated by commas.

```python
student = {"name": "Sam", "age": 15}
print(student["name"])
print(student["age"])
```
```output
Sam
15
```

You get a value by putting its key in square brackets. Keys are usually text, and values can be anything: text, numbers, lists, even other dictionaries.

Printing the whole dictionary shows it with quotes and braces:

```python
student = {"name": "Sam", "age": 15}
print(student)
```
```output
{'name': 'Sam', 'age': 15}
```

If you ask for a key that is not there, you get a `KeyError`:

```error KeyError
student = {"name": "Sam"}
print(student["grade"])
```

Python says: `KeyError: 'grade'`.

`len` counts the pairs.

**1. Predict the output**
```python
student = {"name": "Sam", "age": 15}
print(student["name"])
```
```output
Sam
```
- A) name
- B) Sam
- C) 15
- D) An error
Answer: B
Why: The key "name" looks up its value, which is Sam.

**2. Predict the output**
```python
student = {"name": "Sam", "age": 15}
print(student["age"] + 1)
```
```output
16
```
- A) age
- B) 16
- C) An error
- D) 151
Answer: B
Why: The value for "age" is the number 15, so adding 1 gives 16.

**3. Predict the output**
```python
student = {"name": "Sam", "age": 15}
print(student)
```
```output
{'name': 'Sam', 'age': 15}
```
- A) `name Sam age 15`
- B) `["name", "Sam"]`
- C) An error
- D) `{'name': 'Sam', 'age': 15}`
Answer: D
Why: Printing a dictionary shows its braces, keys and values.

**4. Pick one**
In `{"color": "red"}`, which is the key?
- A) "color"
- B) "red"
- C) The colon
- D) The braces
Answer: A
Why: The key is on the left of the colon. It is what you look up.

**5. Predict**
What happens when this runs?
```error KeyError
student = {"name": "Sam"}
print(student["grade"])
```
- A) It shows None
- B) It shows nothing
- C) A KeyError
- D) It shows grade
Answer: C
Why: The dictionary has no key called "grade".

**6. Predict the output**
```python
print(len({"a": 1, "b": 2, "c": 3}))
```
```output
3
```
- A) 3
- B) 6
- C) 1
- D) 2
Answer: A
Why: len counts the key and value pairs, and there are three.

**7. Write it yourself**
Make a dictionary called pet with the name "Rex" and the species "dog". Then show the pet's name.
Accepted: the program prints `Rex`.
```python
pet = {"name": "Rex", "species": "dog"}
print(pet["name"])
```
```output
Rex
```

Hint: Use curly braces with "key": value pairs. Read the name with `pet["name"]`.

**Recap**
A dictionary holds key and value pairs in curly braces. Use `d[key]` to get a value. A missing key gives a KeyError.

---

## Lesson 12.2: Adding, changing and removing

**Teach**
Dictionaries can be changed after you make them. Assigning to a key does two jobs: if the key is new, it adds a pair, and if the key already exists, it changes the value.

```python
student = {"name": "Sam"}
student["age"] = 12
print(student)
student["age"] = 13
print(student)
```
```output
{'name': 'Sam', 'age': 12}
{'name': 'Sam', 'age': 13}
```

To remove a pair, use `del`:

```python
d = {"a": 1, "b": 2}
del d["a"]
print(d)
```
```output
{'b': 2}
```

To ask whether a key exists, use `in`:

```python
print("age" in {"name": "Sam"})
```
```output
False
```

To read a key safely, use `get`. It gives `None` if the key is missing, or a default value you choose:

```python
d = {"a": 1}
print(d.get("b"))
print(d.get("b", 0))
```
```output
None
0
```

Keys are unique. A dictionary cannot have the same key twice.

**1. Predict the output**
```python
student = {"name": "Sam"}
student["age"] = 12
print(student)
```
```output
{'name': 'Sam', 'age': 12}
```
- A) `{'name': 'Sam'}`
- B) `{'name': 'Sam', 'age': 12}`
- C) An error
- D) `{'age': 12}`
Answer: B
Why: "age" is a new key, so assigning to it adds a pair.

**2. Predict the output**
```python
d = {"score": 5}
d["score"] = 9
print(d)
```
```output
{'score': 9}
```
- A) `{'score': 14}`
- B) `{'score': 5, 'score': 9}`
- C) `{'score': 9}`
- D) `{'score': 5}`
Answer: C
Why: "score" already exists, so the new value replaces the old one.

**3. Predict the output**
```python
d = {"a": 1, "b": 2}
del d["a"]
print(d)
```
```output
{'b': 2}
```
- A) `{'b': 2}`
- B) `{}`
- C) An error
- D) `{'a': 1}`
Answer: A
Why: del removes the pair with the key "a".

**4. Predict the output**
```python
print("age" in {"name": "Sam"})
```
```output
False
```
- A) False
- B) age
- C) True
- D) An error
Answer: A
Why: in checks the keys, and "age" is not one of them.

**5. Predict the output**
```python
print({"a": 1}.get("b", 0))
```
```output
0
```
- A) 1
- B) An error
- C) None
- D) 0
Answer: D
Why: "b" is missing, so get gives back the default you asked for, 0.

**6. Predict the output**
```python
print({"a": 1}.get("b"))
```
```output
None
```
- A) An error
- B) 0
- C) 1
- D) None
Answer: D
Why: With no default given, get gives None for a missing key, instead of an error.

**7. Write it yourself**
Sam's score is 10. Add 5 to it, then show Sam's score.
Starter:
```
scores = {"Sam": 10}
```
Accepted: the program prints `15`.
```python
scores = {"Sam": 10}
scores["Sam"] = scores["Sam"] + 5
print(scores["Sam"])
```
```output
15
```

Hint: Read the old score, add 5, and put the new value back with `scores["Sam"] = ...`.

**Recap**
`d[key] = value` adds or changes a pair. `del d[key]` removes it. `key in d` checks for a key, and `d.get(key, default)` reads safely.

---

## Lesson 12.3: Looping over a dictionary

**Teach**
A `for` loop over a dictionary goes through its keys.

```python
d = {"a": 1, "b": 2}
for key in d:
    print(key)
```
```output
a
b
```

You can use each key to look up its value:

```python
d = {"x": 1, "y": 2}
for key in d:
    print(d[key] * 10)
```
```output
10
20
```

To get the key and the value together, use `.items()` with two loop variables:

```python
prices = {"apple": 3, "kiwi": 5}
for name, price in prices.items():
    print(f"{name} costs {price}")
```
```output
apple costs 3
kiwi costs 5
```

If you only need the values, use `.values()`:

```python
total = 0
for v in {"a": 3, "b": 4}.values():
    total += v
print(total)
```
```output
7
```

Dictionaries keep their pairs in the order you added them.

**1. Predict the output**
```python
d = {"a": 1, "b": 2}
for key in d:
    print(key)
```
```output
a
b
```
- A) a: 1, b: 2
- B) 1, 2 (two lines)
- C) a, b (two lines)
- D) An error
Answer: C
Why: A plain loop over a dictionary gives the keys.

**2. Predict the output**
```python
d = {"a": 1, "b": 2}
for k, v in d.items():
    print(f"{k}={v}")
```
```output
a=1
b=2
```
- A) 1=a, 2=b (two lines)
- B) a=1, b=2 (two lines)
- C) a, b (two lines)
- D) An error
Answer: B
Why: items() gives each key with its value. k is the key and v is the value.

**3. Predict the output**
```python
total = 0
for v in {"a": 3, "b": 4}.values():
    total += v
print(total)
```
```output
7
```
- A) 7
- B) 34
- C) 12
- D) 0
Answer: A
Why: values() gives 3 and 4, and they add up to 7.

**4. Predict the output**
```python
d = {"x": 1, "y": 2}
for key in d:
    print(d[key] * 10)
```
```output
10
20
```
- A) 30
- B) 1, 2 (two lines)
- C) 10, 20 (two lines)
- D) x, y (two lines)
Answer: C
Why: Each round, the key is used to look up the value, and the value is multiplied by 10.

**5. Pick one**
Which loop gives both the key and the value?
- A) `for item in d.item():`
- B) `for key in d:`
- C) `for value in d.values():`
- D) `for key, value in d.items():`
Answer: D
Why: items() gives pairs, and the two loop variables take one part of each.

**6. Fill in the table**
Fill in k and v each time the print line is about to run, then after the loop.
```trace line=3 vars=k,v
d = {"a": 1, "b": 2}
for k, v in d.items():
    print(k)
```
```table
k='a' v=1
k='b' v=2
final k='b' v=2
```
Why: Each round takes the next pair. After the loop, k and v still hold the last pair.

**7. Write it yourself**
Show each fruit and its price in the form apple costs 3.
Starter:
```
prices = {"apple": 3, "kiwi": 5}
```
Accepted: the program prints `apple costs 3` and `kiwi costs 5`.
```python
prices = {"apple": 3, "kiwi": 5}
for name, price in prices.items():
    print(f"{name} costs {price}")
```
```output
apple costs 3
kiwi costs 5
```

Hint: Use `.items()` with two loop variables, one for the fruit and one for the price. An f-string builds each line.

**Recap**
A loop over a dictionary gives the keys. Use `.items()` for key and value together, and `.values()` for just the values.

---

## Lesson 12.4: Lists of dictionaries

**Teach**
Real data usually comes as many records of the same shape: many students, many products, many contacts. Put each record in a dictionary, and the dictionaries in a list.

```python
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
]
for s in students:
    print(s["name"])
```
```output
Sam
Mia
```

Two steps to read one value: first pick the record by its position in the list, then pick the field by its key.

```python
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
]
print(students[1]["name"])
```
```output
Mia
```

Inside an f-string, use single quotes for the key, so they do not clash with the double quotes around the string:

```python
students = [{"name": "Sam", "age": 12}]
print(f"{students[0]['name']} is {students[0]['age']}")
```
```output
Sam is 12
```

The usual loop patterns still work: count, add up, find. You just read `s["age"]` instead of the item itself.

**1. Predict the output**
```python
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
]
for s in students:
    print(s["name"])
```
```output
Sam
Mia
```
- A) Sam, Mia (two lines)
- B) An error
- C) 12, 14 (two lines)
- D) `{'name': 'Sam', 'age': 12}`, and one more
Answer: A
Why: Each round, s is one whole dictionary, and s["name"] picks the name from it.

**2. Predict the output**
```python
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
]
print(students[1]["name"])
```
```output
Mia
```
- A) Sam
- B) 14
- C) Mia
- D) An error
Answer: C
Why: students[1] is the second dictionary, and ["name"] picks its name.

**3. Predict the output**
```python
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
]
total = 0
for s in students:
    total += s["age"]
print(total)
```
```output
26
```
- A) 12
- B) 14
- C) 26
- D) 1214
Answer: C
Why: 12 plus 14 is 26. The loop adds each student's age.

**4. Predict the output**
```python
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
]
for s in students:
    if s["age"] > 12:
        print(s["name"])
```
```output
Mia
```
- A) Sam
- B) Mia
- C) Nothing is shown
- D) Sam, Mia (two lines)
Answer: B
Why: Only Mia's age is greater than 12.

**5. Predict the output**
```python
students = [{"name": "Sam", "age": 12}]
print(f"{students[0]['name']} is {students[0]['age']}")
```
```output
Sam is 12
```
- A) Sam is 12
- B) students[0] is students[0]
- C) name is age
- D) An error
Answer: A
Why: Inside the f-string, the braces look up the values. Single quotes keep the quotes from clashing.

**6. Pick one**
How do you read Mia's age from this list?
```
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
]
```
- A) `students[0]["age"]`
- B) `students[1]["age"]`
- C) `students["Mia"]["age"]`
- D) `students["age"][1]`
Answer: B
Why: Mia is the second item in the list, at position 1, and "age" is her key.

**7. Write it yourself**
Count how many students are older than 11, then show the count.
Starter:
```
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
    {"name": "Leo", "age": 10},
]
```
Accepted: the program prints `2`.
```python
students = [
    {"name": "Sam", "age": 12},
    {"name": "Mia", "age": 14},
    {"name": "Leo", "age": 10},
]
count = 0
for s in students:
    if s["age"] > 11:
        count += 1
print(count)
```
```output
2
```

Hint: Start a counter at 0. Loop over the students and check `s["age"] > 11`.

**Recap**
A list of dictionaries holds many records. Pick a record by position and a field by key. The loop patterns from earlier still work.

---

## Lesson 12.5: What JSON looks like

**Teach**
JSON is a text format for storing and sharing data. Apps, websites and games use it all the time. Your own dictionaries and lists can be turned into JSON and back.

JSON looks a lot like a Python dictionary, but it is plain text with stricter rules:
- Keys and text use double quotes only. Single quotes are not allowed.
- No comma after the last item.
- `true`, `false` and `null` are lowercase (Python has `True`, `False` and `None`).

This is valid JSON:

```json
{"name": "Sam", "age": 12, "likes_math": true}
```

These are not:

```badjson
{'name': 'Sam'}
```

```badjson
{"name": "Sam",}
```

Python comes with a toolbox for this, called the `json` module. A module is a ready-made set of tools that ships with Python. To use one, you bring it in with `import` at the top of your program: `import json`. You already did this in the guessing game with `import random`.

Two of the json tools matter here. `json.dumps` turns Python data into JSON text, and `json.loads` turns JSON text back into Python data.

```python
import json
student = {"name": "Sam", "age": 12, "likes_math": True}
text = json.dumps(student)
print(text)
```
```output
{"name": "Sam", "age": 12, "likes_math": true}
```

```python
import json
text = '{"name": "Sam", "age": 12}'
student = json.loads(text)
print(student["name"])
```
```output
Sam
```

If the text is not valid JSON, `json.loads` gives an error:

```error json.decoder.JSONDecodeError
import json
print(json.loads("{'name': 'Sam'}"))
```

Python says: `json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes`.

**1. Predict the output**
```python
import json
print(json.dumps({"a": 1}))
```
```output
{"a": 1}
```
- A) An error
- B) `{'a': 1}`
- C) `{"a": 1}`
- D) `a: 1`
Answer: C
Why: dumps makes JSON text, which always uses double quotes.

**2. Predict the output**
```python
import json
print(json.dumps({"ok": True}))
```
```output
{"ok": true}
```
- A) `{"ok": true}`
- B) `{'ok': true}`
- C) `{"ok": True}`
- D) An error
Answer: A
Why: JSON writes true in lowercase. Python's True becomes true.

**3. Predict the output**
```python
import json
print(json.loads('{"n": 5}')["n"] + 1)
```
```output
6
```
- A) An error
- B) 51
- C) n
- D) 6
Answer: D
Why: loads turns the text into a dictionary, so ["n"] is the number 5, plus 1.

**4. Pick one**
Which one is valid JSON?
- A) `{'a': 1}`
- B) `{"a": 1,}`
- C) `{a: 1}`
- D) `{"a": 1}`
Answer: D
Why: `{'a': 1}` uses single quotes, `{"a": 1,}` has a trailing comma, and `{a: 1}` has an unquoted key.

**5. Pick one**
Why is `{'name': 'Sam'}` not valid JSON?
- A) JSON only allows double quotes
- B) It is too short
- C) It has a colon
- D) It uses curly braces
Answer: A
Why: In JSON, keys and text must use double quotes.

**6. Predict the output**
```python
import json
print(type(json.loads("[1, 2]")))
```
```output
<class 'list'>
```
- A) `<class 'list'>`
- B) `<class 'dict'>`
- C) `<class 'str'>`
- D) An error
Answer: A
Why: The JSON text [1, 2] is a list, so loads gives a Python list.

**7. Match**
Match each Python value to how JSON writes it.
- `True`: `true`
- `False`: `false`
- `None`: `null`
- `"text"`: `"text"` with double quotes
Why: JSON has its own spelling for these values.

**8. Write it yourself**
Turn the dictionary into JSON text and show it.
Starter:
```
import json
data = {"name": "Mia", "age": 9}
```
Accepted: the program prints `{"name": "Mia", "age": 9}`.
```python
import json
data = {"name": "Mia", "age": 9}
print(json.dumps(data))
```
```output
{"name": "Mia", "age": 9}
```

Hint: `json.dumps` turns the dictionary into text. Print what it gives back.

**Recap**
JSON is text that looks like a dictionary, with double quotes only and `true`, `false`, `null`. `json.dumps` writes it, and `json.loads` reads it.

---

## Unit 12 project: Contact lookup

**Goal**
A small contact book. Ask for a name. If the contact is in the book, show their name and phone number. If not, show Not found.

If the person types Mia, the program shows `Mia: 555-0102`. If they type Zed, it shows `Not found`.

**Guided steps**
1. Make a list of dictionaries called `contacts`, each with `"name"` and `"phone"`.
2. Ask for the name to look for with `input`.
3. Start with `found = False`.
4. Loop over the contacts. If a contact's name matches, show the name and phone, and set `found = True`.
5. After the loop, if `found` is still False, show Not found.

**Accepted**
```python inputs=Mia
contacts = [
    {"name": "Sam", "phone": "555-0101"},
    {"name": "Mia", "phone": "555-0102"},
    {"name": "Leo", "phone": "555-0103"},
]
search = input("Name? ")
found = False
for contact in contacts:
    if contact["name"] == search:
        print(f"{contact['name']}: {contact['phone']}")
        found = True
if not found:
    print("Not found")
```
```output
Mia: 555-0102
```
```python inputs=Zed
contacts = [
    {"name": "Sam", "phone": "555-0101"},
    {"name": "Mia", "phone": "555-0102"},
    {"name": "Leo", "phone": "555-0103"},
]
search = input("Name? ")
found = False
for contact in contacts:
    if contact["name"] == search:
        print(f"{contact['name']}: {contact['phone']}")
        found = True
if not found:
    print("Not found")
```
```output
Not found
```
```python inputs=Sam
contacts = [
    {"name": "Sam", "phone": "555-0101"},
    {"name": "Mia", "phone": "555-0102"},
    {"name": "Leo", "phone": "555-0103"},
]
search = input("Name? ")
found = False
for contact in contacts:
    if contact["name"] == search:
        print(f"{contact['name']}: {contact['phone']}")
        found = True
if not found:
    print("Not found")
```
```output
Sam: 555-0101
```

**Recap**
You used a list of dictionaries, a search loop with a flag, and an f-string with nested quotes. This pattern, a list of records you search through, is behind most real apps.

---

## Unit 12 checkpoint quiz bank

Draw 10 at random. Pass is 7 of 10.

**Q1 (12.1)** What does this show?
```python
d = {"a": 1, "b": 2}
print(d["b"])
```
```output
2
```
- A) 1
- B) 2
- C) b
- D) An error
Answer: B

**Q2 (12.1)** What does this show?
```python
print(len({"x": 1, "y": 2}))
```
```output
2
```
- A) 4
- B) 2
- C) 1
- D) An error
Answer: B

**Q3 (12.1)** What error does this give?
```error KeyError
d = {"a": 1}
print(d["z"])
```
- A) ValueError
- B) NameError
- C) IndexError
- D) KeyError
Answer: D

**Q4 (12.2)** What does this show?
```python
d = {"a": 1}
d["b"] = 2
print(d)
```
```output
{'a': 1, 'b': 2}
```
- A) `{'a': 1}`
- B) `{'a': 1, 'b': 2}`
- C) `{'b': 2}`
- D) An error
Answer: B

**Q5 (12.2)** What does this show?
```python
d = {"a": 1}
d["a"] = 5
print(d)
```
```output
{'a': 5}
```
- A) `{'a': 1, 'a': 5}`
- B) `{'a': 1}`
- C) `{'a': 6}`
- D) `{'a': 5}`
Answer: D

**Q6 (12.2)** What does this show?
```python
d = {"a": 1}
del d["a"]
print(d)
```
```output
{}
```
- A) None
- B) `{}`
- C) An error
- D) `{'a': 1}`
Answer: B

**Q7 (12.2)** What does this show?
```python
print("a" in {"a": 1, "b": 2})
```
```output
True
```
- A) a
- B) True
- C) An error
- D) False
Answer: B

**Q8 (12.2)** What does this show?
```python
print({"a": 1}.get("z", 0))
```
```output
0
```
- A) None
- B) An error
- C) 1
- D) 0
Answer: D

**Q9 (12.3)** What does this show?
```python
d = {"a": 1, "b": 2}
for key in d:
    print(key)
```
```output
a
b
```
- A) a=1, b=2
- B) An error
- C) a, b (two lines)
- D) 1, 2 (two lines)
Answer: C

**Q10 (12.3)** What does this show?
```python
d = {"a": 1, "b": 2}
for k, v in d.items():
    print(f"{k}:{v}")
```
```output
a:1
b:2
```
- A) 1:a, 2:b (two lines)
- B) An error
- C) a:1, b:2 (two lines)
- D) a, b (two lines)
Answer: C

**Q11 (12.3)** What does this show?
```python
total = 0
for v in {"a": 2, "b": 5}.values():
    total += v
print(total)
```
```output
7
```
- A) 0
- B) 10
- C) 25
- D) 7
Answer: D

**Q12 (12.3)** Fill in k and v each time the print line is about to run, then after the loop.
```trace line=3 vars=k,v
d = {"x": 10, "y": 20}
for k, v in d.items():
    print(v)
```
```table
k='x' v=10
k='y' v=20
final k='y' v=20
```

**Q13 (12.4)** What does this show?
```python
people = [{"name": "Ann"}, {"name": "Bo"}]
print(people[0]["name"])
```
```output
Ann
```
- A) Bo
- B) An error
- C) name
- D) Ann
Answer: D

**Q14 (12.4)** What does this show?
```python
people = [{"name": "Ann", "age": 20}, {"name": "Bo", "age": 30}]
for p in people:
    if p["age"] > 25:
        print(p["name"])
```
```output
Bo
```
- A) Nothing is shown
- B) Ann, Bo (two lines)
- C) Ann
- D) Bo
Answer: D

**Q15 (12.4)** What does this show?
```python
people = [{"age": 20}, {"age": 30}]
total = 0
for p in people:
    total += p["age"]
print(total)
```
```output
50
```
- A) 20
- B) 2030
- C) 50
- D) 30
Answer: C

**Q16 (12.5)** What does this show?
```python
import json
print(json.dumps({"ok": False}))
```
```output
{"ok": false}
```
- A) `{'ok': false}`
- B) An error
- C) `{"ok": false}`
- D) `{"ok": False}`
Answer: C

**Q17 (12.5)** What does this show?
```python
import json
data = json.loads('{"x": 4}')
print(data["x"] * 2)
```
```output
8
```
- A) 8
- B) x
- C) 44
- D) An error
Answer: A

**Q18 (12.5)** Which one is valid JSON?
- A) `{"id": 7,}`
- B) `{"id": 7}`
- C) `{'id': 7}`
- D) `{id: 7}`
Answer: B

**Q19 (12.5)** How does JSON write Python's `None`?
- A) nothing
- B) None
- C) null
- D) 0
Answer: C

**Q20 (mixed)** True or false: a dictionary can have the same key twice.
Answer: False
Why: Keys are unique. Assigning to an existing key changes its value.

**Q21 (12.1)** What does this show?
```python
d = {"name": "Sam", "age": 12}
print(d["name"])
```
```output
Sam
```
- A) 12
- B) name
- C) An error
- D) Sam
Answer: D

**Q22 (12.2)** What does this show?
```python
d = {"a": 1}
d["b"] = 2
print(len(d))
```
```output
2
```
- A) An error
- B) 2
- C) 3
- D) 1
Answer: B

**Q23 (12.3)** What does this show?
```python
prices = {"tea": 2, "cake": 5}
print(sum(prices.values()))
```
```output
7
```
- A) An error
- B) 7
- C) 2
- D) 25
Answer: B

**Q24 (12.4)** What does this show?
```python
people = [{"name": "Ann"}, {"name": "Bo"}]
for p in people:
    print(p["name"])
```
```output
Ann
Bo
```
- A) Ann, Bo (two lines)
- B) An error
- C) Bo, Ann (two lines)
- D) name, name (two lines)
Answer: A

**Q25 (12.5)** What does this show?
```python
import json
print(json.dumps({"a": None}))
```
```output
{"a": null}
```
- A) An error
- B) `{"a": null}`
- C) `{'a': null}`
- D) `{"a": None}`
Answer: B

Note: this bank has 25 questions.
