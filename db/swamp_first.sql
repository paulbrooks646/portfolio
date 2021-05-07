update swamp
set first_time = false
where user_id = $1;

select * from swamp
where user_id = $1