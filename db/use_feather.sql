update cottage
set feather_used = true
where user_id = $1;

update inventory
set feather = false
where user_id = $1;

select * from inventory
where user_id = $1