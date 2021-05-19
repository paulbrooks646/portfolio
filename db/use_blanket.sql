update thieves
set blanket_used = true
where user_id = $1;

update inventory
set blanket = false
where user_id = $1;

select * from inventory
where user_id = $1