update inventory
set nuts = true
where user_id = $1;

update grocer
set nuts_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;