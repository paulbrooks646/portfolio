update thieves
set toy_used = true
where user_id = $1;

update inventory
set toy = false
where user_id = $1;

select * from inventory
where user_id = $1