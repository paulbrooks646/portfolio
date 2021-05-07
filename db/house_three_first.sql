update houseThree
set first_time = false
where user_id = $1;

select * from houseThree
where user_id = $1