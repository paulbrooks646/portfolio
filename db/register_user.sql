insert into players (name, password, coins, newgame)
values ($1, $2, $3, $4);


select * from players
where name = $1;