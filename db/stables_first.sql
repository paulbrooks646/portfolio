update stables
set first_time = false
where user_id = $1;

select * from stables
where user_id = $1