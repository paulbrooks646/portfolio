update inventory
set dagger = true
where user_id = $1;

update blacksmith
set dagger_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;