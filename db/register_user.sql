insert into players (name, password)
values ($1, $2);

select * from players
where name = $1;