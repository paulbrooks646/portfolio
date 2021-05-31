update valley
set first_time = false
where user_id = $1;

select * from valley
where user_id = $1