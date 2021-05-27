update inventory
set picture = true
where user_id = $1;

update alley
set picture_received = true
where user_id = $1;

select * from inventory
where user_id = $1;