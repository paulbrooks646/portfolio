update inventory
set manure = true
where user_id = $1;

update inventory
set bottle = false
where user_id = $1;

update stables
set has_taken = true
where user_id = $1;

select * from inventory
where user_id = $1