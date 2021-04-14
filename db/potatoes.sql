update inventory
set potatoes = true
where user_id = $1;

update grocer
set potatoes_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;