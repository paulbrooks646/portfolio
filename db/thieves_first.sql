update thieves
set first_time = false
where user_id = $1;

select * from thieves
where user_id = $1