update inventory
set shoes = true
where user_id = $1;

update store
set shoes_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;