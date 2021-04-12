update cave
set meat_given = true
where user_id = $1;

update inventory
set meat = false
where user_id = $1;

select * from inventory
where user_id = $1