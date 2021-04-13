update nest
set first_time = false
where user_id = $1;

select * from nest
where user_id = $1;