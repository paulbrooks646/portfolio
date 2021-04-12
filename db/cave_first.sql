update cave
set first_time = false
where user_id = $1;

select * from cave
where user_id = $1