update inventory
set cloak = true
where user_id = $1;

update thieves
set cloak_received = true
where user_id = $1;

select * from inventory
where user_id = $1;