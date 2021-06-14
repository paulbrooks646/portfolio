update inventory
set axe = true
where user_id = $1;

update throne
set axe_received = true
where user_id = $1;

select * from inventory
where user_id = $1;