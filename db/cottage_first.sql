update cottage
set first_time = false
where user_id = $1;

select * from cottage
where user_id = $1