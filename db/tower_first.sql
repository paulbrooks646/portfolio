update tower
set first_time = false
where user_id = $1;

select * from tower
where user_id = $1