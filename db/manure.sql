update inventory
set manure = true
where user_id = $1;

select * from inventory
where user_id = $1