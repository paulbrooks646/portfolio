update maze
set first_time = false
where user_id = $1;

select * from maze
where user_id = $1