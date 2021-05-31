update inventory
set pick = true
where user_id = $1;

update thieves
set pick_received = true, coins_received = true
where user_id = $1;

select * from inventory
where user_id = $1;