update cabin
set first_time = false
where user_id = $1;

select * from cabin
where user_id = $1