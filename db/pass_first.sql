update pass
set first_time = false
where user_id = $1;

select * from pass
where user_id = $1;