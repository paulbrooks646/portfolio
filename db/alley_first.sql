update alley
set first_time = false
where user_id = $1;

select * from alley
where user_id = $1