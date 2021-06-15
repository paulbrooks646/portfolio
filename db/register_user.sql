insert into players (name, password, coins)
values ($1, $2, $3);

select * from players
where name = $1;