update thieves
set chest_used = true
where user_id = $1;

update inventory
set chest = false
where user_id = $1;

select * from inventory
where user_id = $1