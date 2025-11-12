---
title: Ping Misconceptions
article: true
---

This page is meant to explain how Figura actually works behind the scenes, specifically for lua scripts and pings. This should clear up some common misconceptions a lot of Figura beginners have, and make you much more confident when making your lua scripts.

## Misconception "I need pings for anything to work in multiplayer"

Pings are only needed in very specific situations. After reading this section, you should understand exactly when pings are required and when they are not.

### How do scripts even work?

The most important thing to understand when writing a Figura script is that your script does not only run on your computer. Actually, when you upload your avatar (models, textures, scripts...) to the cloud, every other player on your server has to download this avatar to their own computers in order to display the avatar on your player character. And that means they also download your script, and **run your script on their own PC**.

![How uploading an avatar works](./assets/misconceptions/cloud-upload.png)

This of course also applies for the opposite direction, any avatar from your friends on the minecraft server are also sent to you!

But what does that mean and why does it matter? Well, if you think about it, if the script is already running on the other peoples computers, running the same functions and logic that you scripted it to do on your own computer, then you dont need to use pings to send more stuff to other people! Neat! Buttttt... there are a few exceptions of course, otherwise pings wouldn't need to exist.

### When do I actually need pings?

What even is a ping? It is really simple: A ping is just like a regular function in lua, except that it also goes across the Figura cloud to every other player that has downloaded your script and runs the function there too. This means you only need a ping if you must send **additional information** to other players **that they do not already know about**.

Lets first understand when you **don't** need pings. To do this, you can imagine looking at your friend in multiplayer and thinking about what pieces of **information** you know about them. For example, you know where they are (`player:getPos()`), you know what armor they are wearing (`player:getItem()`), you know what item they are holding in their hand `player:getHeldItem()`, you can see how fast they are moving (`player:getVelocity()`), you can see their head turn and look around `vanilla_model.HEAD:getOriginRot()`, you can see if they are mining blocks `player:isSwingingArm()`, and much more.

So your own PC already knows all these things about your friend, and because your friends script is running on your PC as well, all of these things just work. If the script wants to check if the player is under water it can just do that by itself.

![Regular function call without a ping](./assets/misconceptions/regular-fn.png)

Both instances of the script in this case are in sync and just carry on like normal. So now lets use the action wheel as an example on why pings are necessary. Consider: If you look at another player, can you see their action wheel opening and can you see them click an action? No, you do not have the information if another player is using the action wheel right now. If you just use regular functions it would look like this:

![Action wheel without ping](./assets/misconceptions/action-no-ping.png)

But if you use a ping, it will notify every other instance of your script to also run this ping.

![Action wheel without ping](./assets/misconceptions/action-with-ping.png)

So in conclusion, you only need pings if **the information youre using is not available to other people**.

### Do I need a ping to play an animation?

Now that you understand how scripts are executed and what pings do exactly, you should be able to answer this question. Except... you will notice that this question actually doesn't make any sense. Whether or not you need pings does not depend on **what you are doing**, it actually depends on **what is triggering it**. For example, if you want to play an animation when you walk or swim or whatever other movement a player can make, this of course does not need a ping! Remember, everyone can already see if you are walking. But if you want to play an animation when you click an action in your action wheel, or maybe if you want to play a special animation if you have any arrows anywhere in your inventory, then you must use a ping to let other people know about it! (Can you see another players inventory? No.)

### What is a reliable way of knowing if information is already available or not?

You already know the trick to just think about what information you can see on other players. But that is not always 100% reliable. For example, Minecraft itself for some reason does not actually tell you if someone is currently using creative flight. Even though you can technically see them floating in the air, the information you have is just the position of that player, not actually wheter or not they have flight active or not. A similar thing happens for status effects (potion effects), even though you can see potion particles on other players, the Minecraft server actually only sends commands to spawn particles in the world, and does not tell you what potion effect that player actually has.

But Figura makes these things very clear by introducing the `HostAPI`. Any code that starts with `host` is giving you things that **are only known by you** and not other players! (e.g. `host:getStatusEffects()`, `host:isFlying()`). The term "host" in Figura is describing the instance of the script that is running on the player that owns the avatar. Quick tip: you can use `host:isHost()` which returns true if the current script is running as host (you the owner on your pc), or false if it runs on anyone elses PC.

So the list of the most important things that require pings is:

- Most important stuff
    - HostAPI
    - Action Wheel
    - Keybinds
- Input events
    - events.mouse_scroll
    - events.mouse_move
    - events.mouse_press
    - events.key_press
    - events.char_typed
- Miscellaneous
    - Player Inventory (except main/offhand/armor)
    - events.chat_send_message
    - events.chat_receive_message (both chat message events only run on host)
    - Anything that triggers by something happening at only one point in time

### Hidden desyncs.

There are some situations that you can create in your script that, even with all knowledge you have so far kept in mind, can still cause things to desync in multiplayer. This only happens for relatively advanced things, so if all youre doing is adding some animations and action wheel cosmetics you are fine.

To demonstrate this, let me give you two snippets that are very very similar.

This first snippet is totally fine and has no issues.

```lua
local wasCrouching = false
function events.tick()
    local isCrouching = player:isCrouching()
    if isCrouching and not wasCrouching then
        sounds:playSound("fart", player:getPos())
    end
end
```

And now look at this second snippet, which can easily desync, even though we haven't used any unsynced or host only code.

```lua
local wasCrouching = false
function events.tick()
    local isCrouching = player:isCrouching()
    if isCrouching and not wasCrouching then
        models.model.World.Statue:setPos(player:getPos()*16)
    end
end
```

The reason here lies in the actual logic that we are doing: We are placing our Statue model at the player position **only when we are crouching**. Now imagine you have placed your statue and then afterwards a player comes by that wasn't nearby when you crouched, and therefore didn't have the information that you crouched. This player will not see the statue placed at the correct position. I will show you how to fix this as part of the next section.

In contrast to the sound from the first snippet, the actual thing we triggered (sound) didn't have any long lasting effects, it doesn't matter that someone who isn't nearby doesn't hear the sound.

And people not being nearby is already bringing us to the next topic...

### When sending pings isn't enough to prevent desyncs.

Yes you have read that right. If you are using the action wheel, and you are even using pings in the action wheel, it will still desync in multiplayer. 😱

Now why might this happen? I already hinted at it in the previous section, the issue is **not everyone on the entire server can see you in their render distance, or even has your avatar (+script) downloaded and running.**

Figura only loads an avatar from the cloud if it is necessary. This is to prevent lag, unnecessary network downloads and more. In general an avatar is only loaded if that person is visible to you, for example by them being inside your render distance or if the tab menu is viewed (some avatars edit tab menu) or a chat message from them is received (some avatars change chat name) or maybe if you have a player head of theirs (figura avatars can attach to player head blocks).

So what this means is, if you send an action wheel ping, but no one has loaded your avatar, then no one will know that you have just switched into your awesome new outfit. If they come into your render distance they will still see the boring old you.

![Desync when someone isnt in render distance](./assets/misconceptions/render-dist.png)

To fix this, you will need to continuously update your status by sending pings to everyone who might not have gotten the memo yet.

```lua
local statuePos = vec(0,0,0)

local wasCrouching = false
function events.tick()
    local isCrouching = player:isCrouching()
    if isCrouching and not wasCrouching then
        statuePos = player:getPos()*16
        models.model.World.Statue:setPos(statuePos)
    end
end

function pings.updateStatuePos(pos)
    statuePos = pos
    models.model.World.Statue:setPos(statuePos)
end

function events.tick()
    if world.getTime() % 200 == 0 then -- every 10 seconds (200 ticks)
        pings.updateStatuePos(statuePos)
    end
end
```

### I did all of this but there is still desync

It is kind of getting old now with how many things can still cause desync even after so many precautions. But don't worry, this one will be very intuitive now that you understand all of the concept of script instances on different computers and pings like a pro!

To demonstrate this I have a snippet for an outfit toggle in an action wheel.

```lua
local outfitEnabled = false

function pings.toggleOutfit()
    outfitEnabled = not outfitEnabled -- flip the boolean

    -- show outfit if its enabled and otherwise the normal model
    models.model.outfit:setVisible(outfitEnabled)
    models.model.normal:setVisible(not outfitEnabled)
end

-- we call the ping in the action! should all be synced right? ...right?
action:setOnLeftClick(function()
    pings.toggleOutfit()
end)
```

This builds on top of the previos issue with people not having your avatar loaded when you send a ping. Consider the same situation as before where we have a desynced outfit due to the person not being nearby. The issue with the above code is, that if the value is already desynced, it is impossible for it to sync back up. This is because each instance of the script is working with a different state already, simply flipping its own state when the ping is called.

![Unfixable desync](./assets/misconceptions/unfixable-desync.png)

When you use pings it is important to consider what data is used as the "input" or "trigger" for code that happens inside the ping. If a ping uses input from the local instance of the script then this can always cause desync! In the toggleOutfit ping you can see that we use ("input") the value (or state) of a regular variable in this instance of the script.

```lua
local outfitEnabled = false

function pings.toggleOutfit()
--                          input
--                      vvvvvvvvvvvvv
    outfitEnabled = not outfitEnabled
--  ^^^^^^^^^^^^^
--     output
end
```

What **must** happen instead in order to fix the desync is to **send the actually correct value from the host** to everyone else. (Note that this is for demonstration purposes and normally you would use a toggle action here which automatically sends the flipped state to the ping, the concept applies if you send different data such as switching between more than two outfits or something)

```lua
local outfitEnabled = false

function pings.setOutfit(state) -- this state is provided by the host
--                  input               ^
--                  vvvvv               |
    outfitEnabled = state--             |
--  ^^^^^^^^^^^^^                       |
--     output                           |
end--                                   |
--                                      |
action:setOnLeftClick(function()--      |
    pings.setOutfit(not outfitEnabled)--+
end)
```

![Unfixable desync](./assets/misconceptions/send-state.png)

Finally, the best practice is to make sure the data being sent is synced, but also occasionally resync on a timer anyway because you might not click the action wheel for some time and it wouldn't be nice to only resync when you press the button again.

```lua
local outfitEnabled = false

function pings.setOutfit(state)
    outfitEnabled = state

    models.model.outfit:setVisible(outfitEnabled)
    models.model.normal:setVisible(not outfitEnabled)
end

action:setOnLeftClick(function()
    pings.setOutfit(not outfitEnabled)
end)

function events.tick()
    if world.getTime() % 200 == 0 then
        pings.setGlassesEnabled(glassesEnabled)
    end
end
```

### You are a pro now!

Congratulations, you have successfully mastered pings! Anything thrown at you is easily deflected by using pings in the correct situations! Thank you for taking your time reading this guide!