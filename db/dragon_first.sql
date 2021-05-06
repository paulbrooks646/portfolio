update dragon
set first_time = false
where user_id = $1;

select * from dragon
where user_id = $1