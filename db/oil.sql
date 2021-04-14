update inventory
set oil = true
where user_id = $1;

update store
set oil_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;