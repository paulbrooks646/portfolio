update inventory
set shield = true
where user_id = $1;

update blacksmith
set shield_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;