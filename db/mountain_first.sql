update mountain
set first_time = false
where user_id = $1;

select * from mountain
where user_id = $1