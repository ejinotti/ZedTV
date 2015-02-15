#ZedTV

**ZedTV** is a JavaScript browser game using HTML5 Canvas, inspired by the 1990
arcade/SuperNES title, [**SmashTV**](http://en.wikipedia.org/wiki/Smash_TV) —
([*YouTube vid*](http://youtu.be/4AapB7dW3HA)).  The objective is to
evade & destroy enemies while grabbing the cash and prizes.  The player's score
and a list of top scores are provided via jQuery/CSS and
[Firebase](https://www.firebase.com/) cloud storage.

######Design
1. The first major decision that came about was how to handle input.  Controls
for this game are not like Asteroids where you just asynchronously (with
relation to game frames) add speed to the ship by pressing the forward button.
In this game, player moves at constant speed based on which direction key(s)
are being held down.  Thus I settled on polling for which keys are down
synchronously at the start of each frame, and setting the player's velocity for
the frame accordingly.

2. Firing is handled similarly, however firing a bullet on every frame is
probably too much so I added a delay of 3 frames between shots, adjustable via
Player.RATEOFFIRE.

3. Beyond those, the only other notable choice was having all game objects
inherit from MovingObject.  This is just good OO structure and provides a base
for all objects to use the draw and move functions.

###TODO
+ Find an image for basic mobs.
+ Get a background image and draw the four doors.
+ Create Weapons, Powerups, etc.
+ Expand on Rooms: more timers, progress, end of room, bosses, etc.
+ Animate player/mob movements and explosions.
+ Background music lol?
+ Create the Level => series of rooms that player can navigate.
+ Maybe parse levels and rooms from text file.
