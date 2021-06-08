update garden
set first_time = false
where user_id = $1;

select * from garden
where user_id = $1