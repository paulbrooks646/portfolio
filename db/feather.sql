update inventory
set feather = true
where user_id = $1;

update nest
set feather_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;