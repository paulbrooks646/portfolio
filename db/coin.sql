update players
set coins = $2
where id = $1;

select * from players
where id = $1