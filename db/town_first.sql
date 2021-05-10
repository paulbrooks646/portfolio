update town
set first_time = false
where user_id = $1;

select * from town
where user_id = $1