update forest
set first_time = false
where user_id = $1;

select * from forest
where user_id = $1