update cottage
set fire_used = true
where user_id = $1;

update inventory
set fire = false
where user_id = $1;

select * from inventory
where user_id = $1