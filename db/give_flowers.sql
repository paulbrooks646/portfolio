update tower
set flowers_given = true
where user_id = $1;

update inventory
set flowers = false
where user_id = $1;

select * from inventory
where user_id = $1