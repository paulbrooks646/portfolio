update dragon
set ice_used = true
where user_id = $1;

update inventory
set ice = false
where user_id = $1;

select * from inventory
where user_id = $1