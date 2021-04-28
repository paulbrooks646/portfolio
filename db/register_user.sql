insert into players (name, password, coins, last)
values ($1, $2, $3, "home");

select * from players
where name = $1;