update inventory
set cheese = true
where user_id = $1;

update grocer
set cheese_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;