---
title: Lua Quickstart
location: /lua-quickstart
article: true
description: Short introduction to the lua programming language for absolute beginners.
---

This is a beginners guide to programming in Lua. We will only cover the absolute basics you need to know to make simple <a href="https://www.curseforge.com/minecraft/mc-mods/figura" target="_blank" rel="noopener noreferrer">Figura ↗</a> scripts. If you want to learn more about Lua check out the <a href="https://www.lua.org/pil/1.html" target="_blank" rel="noopener noreferrer">Lua Documentation ↗</a>. Here is its <a href="https://www.lua.org/pil/contents.html#1" target="_blank" rel="noopener noreferrer">Table of Contents ↗</a>.

# How a computer reads code

Computers read code line by line from the top to the bottom of the file. Each line is just a command telling the computer what to do.

We will now cover the most important concepts you need to know.

# Variables

This is how you create a variable:

```lua
local myVar = 3
```

On the left side you put the ``local`` keyword to let lua know its a new local variable, and the variable name next to it, which can be whatever name you want, in this case I just called it "myVar". Then put a ``=`` symbol and on the right side put the value you want to assign. This stores the value `3` inside your variable. Whenever you use this same variable again, it will use this value to do things.

Note: You can make comments in your code by putting two minus symbols, anything after it in this line is ignored. This is good for descriptions or putting notes.

```lua
local num1 = 1 -- Creates a new variable and assigns it the value 1
local num2 = 7 -- Creates another variable and assigns it the value 7
num1 = 3 -- Store the value 3 in our already existing variable num1, overwriting the old value, so no local keyword here
local sum = num1 + num2 -- Calculate the sum and store the result inside another variable
print(sum) -- Prints "10"
```

# Functions

Functions are useful for things you want to use multiple times in your code. Instead of re-writing the code every time, you can just call the function and any code inside of it will be executed. (To "call" a function basically just means to execute it)

```lua
function test()
    -- anything you put inside here will be executed when the function is called
end
```

The `function` keyword lets us create a function. After it, you put the name of the function, in this case we named it "test" followed by ``()``. You close this block by putting the `end` keyword. Any code after the closing parenthesis up until the ``end`` keyword is considered to be inside the function.

Remember when I said that code is read top to bottom? Well there are a few exceptions. When making a function, it doesnt immediately run the code that is inside of it. Instead it will just remember it for the future. Only whenever you call the function, the code inside of it is executed top to bottom line by line. And when the function is done, it will continue right after where the function was called. Lets look at an example.

```lua
local myNumber = 1

function increase()
    myNumber = myNumber + 1 --this takes whatever myNumber currently is, adds 1 to it, and then stores it again into myNumber
end

print(myNumber) -- prints "1", because the function code has not been executed yet
increase() -- jump up into the function and execute the code inside of it
print(myNumber) -- then continue here afterwards, this prints "2"
```

You can put variable names inside the `()` to pass a variable to the function. These variables are called function parameters. If you have multiple you can just separate them with a comma `,` character.

In this following function, we just print a message depending on what name you give to the function. (To tell the computer that some text is just supposed to be a string instead of a command surround it with "quotes". To concatenate strings together use `..` two dots.)

```lua
function greeting(name) --we want a parameter for the name, can be anything you want to put here
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
function sum(a, b)
    local c = a + b -- Make a new local variable to store the sum
    return c -- Use the return keyword to give back a value to the caller
end

-- Now somewhere else in your code:
local result = sum(3, 5) -- jump up into the sum function with the given a=3 and b=5, and we store the return value inside the "result" variable
print(result) -- Prints "8"
```

# Conditions

In order to do something under some condition we use the `if` keyword. You can think of it as "if X happens do this, otherwise do something else".

```lua
if condition then
    -- do something if condition is true
else
    -- if not, do something else
end
```

Similar to functions, we have whats called a code block here. Two of them actually, one between the ``then`` and the ``else``, which gets executed when the condition is met, and another one between the ``else`` and the ``end`` which gets executed if the condition is not met.

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

Note: Its good to indent your code properly to easily tell where blocks begin and where they end.

```lua
-- good:

function test(thing)
    if thing then
        print("yes")
    else
        print("no")
    end
end

-- bad:

function test(thing)
if thing then
print("yes")
else
print("no")
end
end
```
