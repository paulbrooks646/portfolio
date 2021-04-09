update tower
set ribbon_given = true
where user_id = $1;

update inventory
set ribbon = false
where user_id = $1;

update inventory
set letter = true
where user_id = $1;

select * from inventory
where user_id = $1