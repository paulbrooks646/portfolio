update inventory
set open = true
where user_id = $1;

update magic
set open_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;