---
title: Lua Quickstart
article: true
description: Introduction to the lua programming language for absolute beginners.
modified: Feb 2026
---

This is a beginners guide to programming in Lua. We will cover the basics you need to know to make simple <a href="https://www.curseforge.com/minecraft/mc-mods/figura" target="_blank" rel="noopener noreferrer">Figura ↗</a> scripts and also go a bit deeper into intermediate topics if you would like to keep reading. If you want to learn more about Lua check out the <a href="https://www.lua.org/pil/1.html" target="_blank" rel="noopener noreferrer">Lua Documentation ↗</a>, here is its <a href="https://www.lua.org/pil/contents.html#1" target="_blank" rel="noopener noreferrer">Table of Contents ↗</a>. To learn more about Figura check out the <a href="https://figura-wiki.pages.dev" target="_blank" rel="noopener noreferrer">Figura Wiki ↗</a>.

# Lua Basics

## How a computer reads code

Computers read code line by line from the top to the bottom of the file. Each line is just a command telling the computer what to do. You can pretty much consider these commands to be run one after the other really really fast, to the point where most of the time you can consider it to be instant. Some people have misconceptions about this. Consider the following code:

```lua
enableRightArmModel()
waveWithRightArmAnimation:play()
disableRightArmModel()
```

This code will enable the right arm model, then set the wave animation to start. Here is the important part, it then immediately disables the arm model again. It does not wait for the animation to finish, it simply starts the animation and then immediately goes to the next line instantly. So during the animation the arm will actually not be enabled here. To wait for things to finish we need more advanced code that we can look at later.

We will now cover the most important concepts you need to know.

## Comments

The first thing we will look at are comments, which ironically are actually not code. The point of them is to write additional human readable information into your code that does not actually change anything other than making the code easier to follow.

```lua
-- anything after two minus symbols is a comment, and comments will be in this color for this tutorial
enableRightArmModel() -- comments can start in the same line after some code too
```

## Variables

Now lets really get started. Variables in code are used to store data in them and do operations on data. Data can be anything from numbers, text, or more complex things like tables or objects. For example some data could be a cat that has some information in it such as its name, age, and favorite food. To create a new variable you use the `local` keyword which denotes you want to make a new local variable here. You give it a name and then assign a value to it using an `=` symbol.

```lua
local myVar = 3
```

The name can be whatever you want, as long as you dont include spaces or other special characters, and you don't name it an already existing lua keyword (like local).

Whenever you use this same variable again, it will use this value to do things. As an example, here is a short snippet of code that calculates the sum of two numbers that are stored in variables.

```lua
local num1 = 1 -- Creates a new variable and assigns it the value 1
local num2 = 7 -- Creates another variable and assigns it the value 7
num1 = 3 -- Store the value 3 in our num1 variable (overwrite), no local keyword because the variable already exists
local sum = num1 + num2 -- Calculate the sum and store the result inside another variable
print(sum) -- Prints "10" as the output
```

You may be wondering why we couldnt just write the numbers directly like this:

```lua
local sum = 3 + 7
print(sum) -- Prints "10" as the output
```

The answer is, yeah you can do that. But the point of variables is, that often times you don't know what values they will have when writing the code. Normally you write code to solve a problem in a flexible way so any value could be inside the variable. For example, a calculator program would listen for the user to type numbers on their keyboard and then add those variable numbers together.

As already mentioned you could also store text (also called "strings") in variables, like this:

```lua
local name = "Steve"
```

The `" "` tells lua that it is supposed to be treated as plain text instead of trying to run code.

## Functions

You have already seen the `print` function in the snippets before. It is an inbuilt function, but the most powerful ones are your own custom functions. These are just wrappers around multiple lines of code, so that you can reuse them later. Instead of re-writing the code every time, you can just call the function and any code inside of it will be executed. (To "call" a function basically just means to execute it)

```lua
local function test(arguments)
    -- anything you put inside here will be executed when the function is called
end
```

The `local function` keyword lets us create a new function. After it, you put the name of the function, in this case we named it "test" followed by `(`, a list of arguments, and a `)`. You can also notice that we have the word `end` at the bottom. This tells lua where your function code ends and other regular code keeps going. Any code after the `)` up until the `end` keyword is considered to be inside the function. The arguments are a list of variables that you want your function to work with. Don't worry it will become clear with a few examples.

Remember when I said that code is read top to bottom? Well there are a few exceptions. When making a function, it doesn't immediately run the code that is inside of it. Instead it will just remember it for the future. Only when you call the function, the code inside of it is executed top to bottom line by line. And when the function is done, it will continue right after where the function was called.

Lets look at an example of a function that calculates a sum. So instead of just writing 3 + 7 like before we can use variables to make the code very flexible and allow to calculate the sum of any two numbers.

```lua
local function sum(x, y)
    local result = x + y
    print(result)
end
```

This function called "sum" can take a number `x` and a number `y` as inputs, and then prints the sum of them. Now we can reuse this for any numbers that we want.

```lua
local function sum(x, y)
    local result = x + y
    print(result)
end

sum(1, 2) -- "3"
sum(5, 9) -- "14"
sum(1874, 917834) -- "919708"
local num1 = 54
local num2 = 46
sum(num1, num2) -- "100"
```

So what happens is, the list of arguments can be set to specific values whenever you call the function from the outide. When the `sum` function is called with `()` symbols, for example `sum(1, 2)` then the code in the function with the given values is executed, and then after that the next line `sum(5, 9)` will be executed.

But you can also just leave the arguments empty:

```lua
local myNumber = 1

local function increase()
    myNumber = myNumber + 1 -- this takes whatever myNumber currently is, adds 1 to it, and then stores it again into myNumber
end

print(myNumber) -- prints "1", because the function code has not been executed yet
increase() -- jump up into the function and execute the code inside of it
print(myNumber) -- then continue here afterwards, this prints "2" because added 1 to it using the function
```

In this following function, we just print a message depending on what name you give to the function. In lua you can stick two strings together with the `..` operator. For example `"Hello " .. "Steve"` will become `"Hello Steve"`

```lua
local function greeting(name) -- we want a parameter/argument for the name, can be anything you want to put here
    print("Hello " .. name) -- then we use this name variable to print it with "Hello" in front of it
end
```

Now somewhere else in your code you can call the function and give it any value for this ``name`` parameter.

```lua
greeting("Barry") -- > Hello Barry
-- you can also use a variable instead:
local person = "Cynthia"
greeting(person)  -- > Hello Cynthia
```

Functions can also return a value back to wherever it was called from, here is an example:

```lua
local function add(x, y)
    local c = x + y -- Make a new local variable to store the sum
    return c -- Use the return keyword to give back a value to the caller
end

-- Now somewhere else in your code:
local result = add(3, 5) -- jump up into the sum function with the given x=3 and y=5, and we store the return value inside the "result" variable
print(result) -- Prints "8"
```

## Conditions

In order to do something under some condition we use the `if` keyword. You can think of it as "if X happens do this, otherwise do something else".

```lua
if condition then
    -- do something if condition is true
else
    -- if not, do something else
end
```

Similar to functions, we have whats called a "code block" here. Two of them actually, one between the ``then`` and the ``else``, which gets executed when the condition is met, and another one between the ``else`` and the ``end`` which gets executed if the condition is not met.

Most of the time we want to compare variables in our conditions. 

```lua
num = 10
if num > 5 then
    print("This number is greater than 5")
else
    print("This number is smaller or equal to 5")
end
```

To compare variables we can use `==` to test if something is equal, `<` to test if something is smaller or `>` to test if something is greater. Note that we use double equals `==` here, because a single equals `=` symbol is used to assign values to variables. There is also `<=` for "smaller or equal to", and `>=` for "greater or equal to".

```lua
name = "Dawn"

if name == "Lucas" then
    print("Hey Lucas!")
elseif name == "Dawn" then
    print("Hello Dawn!")
else
    print("Who are you??")
end
```

In a function, you could have a situation where you want to cancel early when some condition is true or maybe you just want to return a different result. You can simply use `return` to immediately stop the function and return back to where the function was called. And of course you can also return with a value as usual.

```lua
local particleCount = 0
function myParticleEffect()
    if particleCount > 10 then
        return -- If the count is more than 10 I want to stop the function and not spawn any more
    end
    createNewParticle()
    particleCount = particleCount + 1
end
```

Note that multiple `end`s can follow each other for example if you have staggered ifs and functions and whatever else, like this:

```lua
function checkAge(age)
    if age > 18 then
        print("allowed")
    else
        print("not allowed")
    end -- this end closes the block for the if-else
end -- some people forget multiple ends, this one is to end the function
```

This is also why it's good to indent your code properly to easily tell where blocks begin and where they end. Whenver a new block starts, add tabs to the left of the code to move the lines farther to the right. This immensely helps with seeing where blocks begin and end at a glance.

```lua
-- good:

function test(thing, otherthing)
    if thing then
        print("yes")
        if otherthing then
            print("definitely")
        else
            print("maybe")
        end
    else
        print("no")
    end
end

-- bad:

function test(thing, otherthing)
if thing then
print("yes")
    if otherthing then
    print("definitely")
    else
print("maybe")
end
else
    print("no")
        end
    end
```

## Tables

To store more complex data other than just simple numbers or text, we can use tables in lua. Tables are very powerful and do the job of a lot of different data structures all at once.

The basic idea of a table is that it is a variable that contains more variables. A table stores key-value-pairs inside of it. As an example, we can make a cat table, and the cat has a key called `name` with the text value `Jellie`.

```lua
local cat = {
    name = "Jellie",
    age = 17,
    favoriteFood = "Fish"
}

print("My name is " .. cat.name)
```

An alternative to using the `.` to access a table value is with `[]` which also allows variables to be used.

```lua
print("My name is " .. cat["name"])

local key = "name"
print("My name is " .. cat[key])
```

By the way, this also works when creating the table, which allows for special characters in the keys, such as spaces:

```lua
local cat = {
    name = "Jellie",
    age = 17,
    ["favorite food"] = "Fish"
}
```

You can use the table values just like normal variables and assign new values to them or use them to calculate things.

```lua
cat.age = 18

local twiceTheAge = cat.age * 2
```

You can even put functions inside of tables to model functionality of our cat.

```lua
local cat = {
    name = "Jellie",
    age = 17,
    favoriteFood = "Fish",
    celebrateBirthdays = function(self, amountOfYears)
        self.age = self.age + amountOfYears
    end
}

print(cat.age) -- 17
cat.celebrateBirthdays(cat, 1)
print(cat.age) -- 18
```

You can see that we have `cat.celebrateBirthdays` to access the function inside of the cat, and then we call it and pass in the `cat` itself as the argument. That way we can increase this cats age by 1. Because this is a super common pattern in lua, there is an inbuilt way to make this a bit nicer, and that is with using `:` instead of the `.` when calling a function inside a table.

```lua
cat.celebrateBirthdays(cat, 1)
-- is equivalent to
cat:celebrateBirthdays(1)
```

Basically, the `:` just makes sure that the table itself is automatically passed into the function as the very first argument. That is all it does, but it makes the code a lot nicer to read and write.

Another use case of tables is to store a list of things, also called an array. This works by making the keys just numbered in order starting at number 1.

```lua
local shoppingList = {
    [1] = "Meat",
    [2] = "Milk",
    [3] = "Veggies"
}
-- or more simply you can achieve the same with just this:
local shoppingList = {"Meat", "Milk", "Veggies"}
```

## Loops

Let's say you want to buy each item in your shopping list. To do this you could write it out like this (let's also just assume we have a `buy` function):

```lua
buy(shoppingList[1])
buy(shoppingList[2])
buy(shoppingList[3])
```

But this is really ugly and static code. Its almost the same line 3 times in a row. What if you add more things to the shopping list later? You would also need to update these lines here too. And what if there are 100 items in the list, that would be really tedious, or even worse, what if you dont know how many items there are?

This is what loops are for. Loops repeat the lines of code inside of them a certain number of times.

The next snippet makes a loop with an variable `i` that starts at 1 and repeats the code inside until it reaches 3 times.

```lua
for i=1, 3 do
    buy(shoppingList[i])
end
```

But we said we dont know how many items we will have in the list. To get the length of a list we can use the `#` operator. In our case `#shoppingList` will be the value `3` but if the list had more items it would give us that amount.

```lua
for i=1, #shoppingList do
    buy(shoppingList[i])
end
```

In lua there is also a special version of loops that can be used for our two types of tables we have seen. Lua has `ipairs` for lists like these, and it has `pairs` for key value pairs like our `cat`.

```lua
-- consider this loop:
for i=1, #shoppingList do
    local item = shoppingList[i]
    buy(item)
end
-- it is the same as:
for i, item in ipairs(shoppingList) do
    buy(item)
end
```

As you can see, the `ipairs` automatically gives us the key `i` (what number the current item has) and a variable for the value `item` too. You can name those two whatever you want, the general structure is:

```lua
for index, value in ipairs(list) do

end
```

Importantly `ipairs` also repeats the loop in the correct order starting from 1 up to the last item in the list, and most importantly it only works for tables that are a list. If you would like to make a loop for a table with key-value-pairs such as our cat, you have to use `pairs`.

```lua
local cat = {
    name = "Jellie",
    age = 17,
    favoriteFood = "Fish"
}

for key, value in pairs(cat) do
    print("My " .. key .. " is " .. value)
end
```

The output of this would be:

```
My age is 17
My name is Jellie
My favoriteFood is Fish
```

But wait, this isn't the same order as we defined it! That is because only numbered lists have an order in lua, and key-value tables do not. You have to always consider those to be in a random very internally optimized order, so don't rely on it!

## Require

If you want to use any kind of library then you will likely come across the instructions telling you to "require" that script. But what does that mean?

Basically, an entire lua file works similar to a function. If you make a file, at the bottom of it you can write `return` to give a value to whoever requires this script.

```lua
-- In library.lua
local theCat = { name = "Jellie" }

theCat.age = 10 + 7

return theCat
```

```lua
-- In script.lua
local someCat = require("library") -- this matches the library.lua file name

print(someCat.name) -- "Jellie"
print(someCat.age) -- 17
```

One difference to functions though is that when you require a script, the code in it will only ever run one time, even if you later require that same script again. Instead of running the entire file again, lua remembers that this file has already been ran, and can now just return the already known result immediately. This is different for functions which will always run again and again every time you call them.

## Randomness

Sometimes you want to add some random variation to your script. Here are some common things you might wanna do.

The basic function to use for this is the `math.random()` function. It will return a random value between 0.0 (inclusive) and 1.0 (exclusive).

Here is an assortment of different ranges other than just 0 to 1.

```lua
-- Float Range [0.0, 1.0)
math.random()

-- Float Range [n, m)
math.lerp(n, m, math.random())

-- Integer Range [1, n]
math.random(n)

-- Integer Range [n, m]
math.random(n, m)

-- Random Sign (returns either -1 or 1)
(math.random(2)*2-3)
```

An example would be to get a random value between -10 and 10:

```lua
math.lerp(-10, 10, math.random())
```

But I'm sure you could have figured that out.

One very useful application is to select a random item from a list:

```lua
-- Random List Item
list[math.random(#list)]
```

## Scopes

A scope in lua is basically just a block which we have seen before already. Blocks begin with functions or with conditions (if statements). Whenever you make a new variable, this variable can only be accessed/seen inside of this scope and any child scopes inside of it. Once the block ends, the variable also is no longer accessible. Here is an example:

```lua
-- this is a new scope

local a = 1
local b = 2

local function f()
    -- this is a new scope
    local c = 3
    local a = 4
    b = 5
    if a == 4 then
        -- this is a new scope
        local d = 6
        a = 7
    else
        -- this is a new scope
        c = 8
    end
    print(a) -- this prints `7` because the condition is true and the if scope has access to variables of the parent scope
    print(c) -- this prints `3` because the else path is not being taken when executing the code (a is 4 so the condition is true)
    print(d) -- this prints `nil` because the if scope has ended and we can no longer see the local variable d
end

f()

print(a) -- this prints `1` because the other local variable is only local to its own scope inside of the function
print(b) -- this prints `5` because function f is defined inside of the outer scope and thus has access to the parent scope b and is able to edit b to be 5
print(c) -- this prints `nil` because c does not exist in this scope
print(d) -- this prints `nil` because d does not exist in this scope
```

# Figura Basics

You are now ready to go to the [Figura scripts page](/figura-scripts), or stay here and continue reading.

# Lua Intermediate

## Pass By Value And Pass By Reference

This is always a hot topic when discussing any programming language, and it is also very often misunderstood by beginners and can cause unexpected results when not understanding whats going on.

Its a very easy concept though. In lua any time you call a function with an argument, this argument is passed only by its value. That pretty much means a copy of the value is made and passed into the function.

```lua
local number = 5

local function addOne(a)
    a = a + 1
end

addOne(number)
addOne(number)
addOne(number)

print(number) -- still 5
```

If you wanted the outer number to change, you have to return the result and then update the number with an assignment.

```lua
local number = 5

local function addOne(a)
    return a + 1
end

number = addOne(number)
number = addOne(number)
number = addOne(number)

print(number) -- 8
```

Now, the only exception is when you pass a table. When you pass a table (and we will not get stuck on technicalities here) then the table is passed as a reference to where it is stored in the memory. Tables can be quite big and it would be very inefficient to always make copies of them when passing, and additionally being able to pass by reference is incdedibly useful.

So this means when you pass a table, anything you change in this table will be changed in any variable that is a reference to this table.

```lua
local num = 5
local num2 = num

print(num) -- 5
print(num2) -- 5
num2 = 20
print(num) -- 5
print(num2) -- 20


local cat = { name = "Jellie" }
local cat2 = cat
print(cat.name) -- Jellie
print(cat2.name) -- Jellie
cat2.name = "Momo"
print(cat.name) -- Momo
print(cat2.name) -- Momo
-- They are the same exact cat table!
-- There is only 1 cat here!
-- We never made a second table!
-- Both variables reference the same table!
```

Knowing this, we can now also apply this to functions:

```lua
local numberTbl = {number = 5}

local function addOne(a)
    a.number = a.number + 1
end

addOne(numberTbl)
addOne(numberTbl)
addOne(numberTbl)

print(numberTbl.number) -- 8, the table was updated inside the function
```

## First Class Functions / Higher Order Functions

Lua has first class functions, and all that means is that functions can be treated as regular values that can be stored in variables and passed into functions.

```lua
local function add(x,y)
    return x+y
end

local function multiply(x,y)
    return x*y
end

local function processListItems(list, operation)
    local result = list[1]
    for i=2, #list do
        result = operation(result, list[i])
    end
    return result
end

local numbers = {1,2,3,4,5}

print(processListItems(numbers, add)) -- 1+2+3+4+5 = 15
print(processListItems(numbers, multiply)) -- 1*2*3*4*5 = 120
```

## Varargs / Multiple Return Values

A function can take an arbitrary amount of arguments by using `...` in the parameters. This can be converted into a table either with `{...}` or using `table.pack(...)`.

```lua
local function addAllNumbers(...)
    local argsAsList = {...}
    local sum = 0
    for i,number in ipairs(argsAsList) do
        sum = sum + number
    end
    return sum
end

print(addAllNumbers(1,5,8,3)) -- 17
```

This can always be used at the end of the arguments list even if there are already other named arguments present.

```lua
function concatStrings(delimiter, ...)
    local argsAsList = {...}
    local result = argsAsList[1]
    for i=2,#argsAsList do
        result = result .. delimiter .. argsAsList[i]
    end
    return result
end

print(concatStrings(" ", "My", "name", "is", "Steve.")) -- "My name is Steve."
print(concatStrings(",", "Meat", "Milk", "Veggies")) -- "Meat,Milk,Veggies"
```

Functions can also return multiple values.

```lua
local function getNameAndAge()
    return "Jellie", 17
end

local name, age = getNameAndAge()

print(name) -- "Jellie"
print(age) -- 17
```

You can use `table.pack()` to combine varargs or multiple returns into a list.

```lua
local t = table.pack(getNameAndAge())

print(t[1]) -- "Jellie"
print(t[2]) -- 17
```

And you can use `table.unpack()` to convert a list into varargs.

```lua
local list = {"My", "name", "is", "Steve."}

print(concatStrings(" ", table.unpack(list)))
```

# Advanced

## Metatables / Classes

Metatables are tables that describe the functionality of other tables. You can use `setmetatable(targetTable, metaTable)` to apply a meta table to a table. It will then be internally used to look up certain things about this table.

For example, you can use the `__index` key in the meta table, in order to define where to look when that table is indexed but the key is not in that table. This is most commonly used for making classes for object oriented programming.

Here is an example of a `Cat` class. In this case we use the `Cat` table as the metatable for new instances of this class. When calling the `new` method on the `Cat` class, it sets the metatable of a passed in or new table to `Cat`. This means whenever this instance is indexed, e.g. by trying to call `jellie:meow()` then it will first notice that there is no meow method in this table, so then we check the metatable to see where `__index` points to. Since it points to `Cat` we call the `Cat.meow` method instead. With the `:` it will automatically pass itself into the function, giving it access to that instance.

```lua
local Cat = {}
Cat.__index = Cat
function Cat:new(o)
    return setmetatable(o or {}, self)
end
function Cat:meow()
    print("Meow! My name is " .. self.name)
end

local jellie = Cat:new({name="Jellie"})
jellie:meow() -- Meow! My name is Jellie

local momo = Cat:new({name="Momo"})
momo:meow() -- Meow! My name is Momo
```

There are also other metamethods or metafields that you can use such as `__add` which defines what should happen when the `+` operator is used.

```lua
local Vector2D = {}
Vector2D.__index = Vector2D
function Vector2D:new(x, y)
    return setmetatable({x=x, y=y}, self)
end
Vector2D.__add = function(a,b)
    return Vector2D:new(
        a.x + b.x,
        a.y + b.y
    )
end

local v1 = Vector2D:new(2,5)
local v2 = Vector2D:new(3,9)
local v3 = v1 + v2

print(v3.x) -- 5
print(v3.y) -- 14
```

To read more about metatables read <a href="https://www.lua.org/pil/13.html" target="_blank" rel="noopener noreferrer">chapter 13 of PIL ↗</a>
