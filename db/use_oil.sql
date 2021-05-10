update town
set oil_used = true
where user_id = $1;

update inventory
set oil = false
where user_id = $1;

select * from inventory
where user_id = $1