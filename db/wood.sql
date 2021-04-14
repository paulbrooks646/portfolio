update inventory
set wood = true
where user_id = $1;

update store
set wood_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;