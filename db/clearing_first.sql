update clearing
set first_time = false
where user_id = $1;

select * from clearing
where user_id = $1