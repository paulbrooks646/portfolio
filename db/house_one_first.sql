update houseOne
set first_time = false
where user_id = $1;

select * from houseOne
where user_id = $1