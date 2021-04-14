update inventory
set protection = true
where user_id = $1;

update magic
set protection_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;