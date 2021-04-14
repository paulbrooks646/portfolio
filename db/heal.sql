update inventory
set heal = true
where user_id = $1;

update magic
set heal_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;