update inventory
set bottle = true
where user_id = $1;

update store
set bottle_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;