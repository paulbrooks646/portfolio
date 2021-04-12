update players
set mountain_first = false
where id = $1;

select * from players
where id = $1