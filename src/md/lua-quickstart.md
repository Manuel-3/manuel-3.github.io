---
title: Lua Quickstart
article: true
description: Short introduction to the lua programming language for absolute beginners.
modified: Nov 2025
---

This is a beginners guide to programming in Lua. We will only cover the absolute basics you need to know to make simple <a href="https://www.curseforge.com/minecraft/mc-mods/figura" target="_blank" rel="noopener noreferrer">Figura ↗</a> scripts. If you want to learn more about Lua check out the <a href="https://www.lua.org/pil/1.html" target="_blank" rel="noopener noreferrer">Lua Documentation ↗</a>. Here is its <a href="https://www.lua.org/pil/contents.html#1" target="_blank" rel="noopener noreferrer">Table of Contents ↗</a>.

# How a computer reads code

Computers read code line by line from the top to the bottom of the file. Each line is just a command telling the computer what to do.

We will now cover the most important concepts you need to know.

# Comments

The first thing we will look at are comments, which ironically are actually not code. The point of them is to write additional human readable information into your code that does not actually change anything other than making the code easier to follow.

```lua
-- anything after two minus symbols is a comment, and the text is in this color for this tutorial
```

# Variables

Variables in code are used to store information in them and do operations on that information. To create a new variable you use the `local` keyword which denotes you want to make a new local variable here. You give it a name and then assign a value to it using an `=` symbol.

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

The answer is, yeah you can do that. But the point of variables is, that often times you don't know what values they will have when writing the code. Normally you write code to do a task in a flexible way so any value could be inside the variable.

# Functions

To make this a little more clear we can take a look at functions. Functions are just wrappers around multiple lines of code, so that you can reuse them later. Instead of re-writing the code every time, you can just call the function and any code inside of it will be executed. (To "call" a function basically just means to execute it)

```lua
function test(args)
    -- anything you put inside here will be executed when the function is called
end
```

The `function` keyword lets us create a function. After it, you put the name of the function, in this case we named it "test" followed by `(`, a list of arguments, and a `)`. You close this block by putting the `end` keyword. Any code after the `)` up until the `end` keyword is considered to be inside the function. The arguments are a list of variables that you want your function to work with. Don't worry it will become clear with a few examples.

Remember when I said that code is read top to bottom? Well there are a few exceptions. When making a function, it doesn't immediately run the code that is inside of it. Instead it will just remember it for the future. Only when you call the function, the code inside of it is executed top to bottom line by line. And when the function is done, it will continue right after where the function was called. Lets look at an example.

Now lets do an example of a function that calculates a sum. So instead of just writing 3 + 7 like before we can use variables to make the code very flexible and allow to calculate the sum of any two numbers.

```lua
function add(x, y)
    print(x + y)
end
```

Now we can reuse this for any numbers that we want.

```lua
add(1, 2) -- "3"
add(5, 9) -- "14"
add(1874, 917834) -- "919708"
```

So what happens is, the list of arguments can be set to specific values whenever you call the function from the outide.

But you can also just leave the arguments empty:

```lua
local myNumber = 1

function increase()
    myNumber = myNumber + 1 -- this takes whatever myNumber currently is, adds 1 to it, and then stores it again into myNumber
end

print(myNumber) -- prints "1", because the function code has not been executed yet
increase() -- jump up into the function and execute the code inside of it
print(myNumber) -- then continue here afterwards, this prints "2"
```

In this following function, we just print a message depending on what name you give to the function. (To tell the computer that some text is just supposed to be a string instead of a command surround it with "quotes". To concatenate strings together use `..` two dots.)

```lua
function greeting(name) -- we want a parameter for the name, can be anything you want to put here
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
function add(x, y)
    local c = x + y -- Make a new local variable to store the sum
    return c -- Use the return keyword to give back a value to the caller
end

-- Now somewhere else in your code:
local result = add(3, 5) -- jump up into the sum function with the given x=3 and y=5, and we store the return value inside the "result" variable
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

Note that multiple `end`s can follow each other for example if you have staggered ifs and functions and what not, like this:

```lua
function checkAge(age)
    if age > 18 then
        print("allowed")
    else
        print("not allowed")
    end
end -- some people forget multiple ends
```

This is also why it's good to indent your code properly to easily tell where blocks begin and where they end.

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

Read about Figura specific lua things [here](/figura-scripts).