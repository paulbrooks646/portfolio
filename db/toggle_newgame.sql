update players
set newgame = false
where id = $1;

select * from players
where id = $1