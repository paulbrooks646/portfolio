update houseFive
set first_time = false
where user_id = $1;

select * from houseFive
where user_id = $1