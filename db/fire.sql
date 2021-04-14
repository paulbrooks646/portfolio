update inventory
set fire = true
where user_id = $1;

update magic
set fire_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;