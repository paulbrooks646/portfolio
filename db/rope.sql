update inventory
set rope = true
where user_id = $1;

update store
set rope_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;