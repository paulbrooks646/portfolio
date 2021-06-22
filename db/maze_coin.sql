update maze
set coin_taken = true
where user_id = $1;

select * from maze
where user_id = $1;