update garden
set manure_given = true
where user_id = $1;

update inventory
set manure = false
where user_id = $1;

select * from inventory
where user_id = $1