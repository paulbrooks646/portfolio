update inventory
set apple = true
where user_id = $1;

update inventory
set bow = false
where user_id = $1;

update forest
set apple_gotten = true
where user_id = $1;

select * from inventory
where user_id = $1;