update castle
set first_time = false
where user_id = $1;

select * from castle
where user_id = $1