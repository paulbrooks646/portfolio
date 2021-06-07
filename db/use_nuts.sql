update inventory
set nuts = false
where user_id = $1;

update castle
set nuts_given = true
where user_id = $1;

select * from inventory
where user_id = $1;