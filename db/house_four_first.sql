update houseFour
set first_time = false
where user_id = $1;

select * from houseFour
where user_id = $1