update inventory
set strength = true
where user_id = $1;

update magic
set strength_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;