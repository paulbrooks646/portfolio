update dashboard
set first_time = false
where user_id = $1;

select * from dashboard
where user_id = $1