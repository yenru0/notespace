male(jean).
male(randy).
male(charles).
male(lawrence).
male(thomas).
female(dora).
female(sharon).
female(cynthia).
female(anna).
female(ashley).

% family 1.
parent(jean, randy).
parent(jean, sharon).
parent(dora, randy).
parent(dora, sharon).

% father tree
parent(charles, jean).
parent(charles, cynthia).
parent(ashley, jean).
parent(ashley, cynthia).

% mother tree
parent(lawrence, dora).
parent(lawrence, thomas).
parent(anna, dora).
parent(anna, thomas).


father(X, Y) :- male(X), parent(X, Y).
mother(X, Y) :- female(X), parent(X, Y).
grandfather(X, Y) :- father(X, Z), parent(Z, Y).
grandmother(X, Y) :- mother(X, Z), parent(Z, Y).
sibling(X, Y) :- parent(Z, Y), parent(Z, X), X \= Y.

aunt(X, Y) :- female(X), sibling(X, Z), parent(Z, Y).
uncle(X, Y) :- male(X), sibling(X, Z), parent(Z, Y).
is_mother(X) :- mother(X, Y).
is_father(X) :- father(X, Y).
