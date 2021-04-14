update inventory
set cake = true
where user_id = $1;

update store
set cake_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;