likes(john, mary). % facts
likes(kim, pinky) :- not(likes(lee, pinky)). % represent of conditional
likes(john, pinky) :- not(likes(john, mary)).
likes(lee, mary).
likes(jim, lee).
likes(pinky, john).
