update bog
set first_time = false
where user_id = $1;

select * from bog
where user_id = $1