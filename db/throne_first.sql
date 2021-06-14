update throne
set first_time = false
where user_id = $1;

select * from throne
where user_id = $1