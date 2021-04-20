insert into players (name, password, coins, newgame, forest_first, mountain_first, last)
values ($1, $2, $3, $4, true, true, "home");

select * from players
where name = $1;