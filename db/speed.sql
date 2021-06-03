update inventory
set speed = true
where user_id = $1;

update glade
set speed_received = true
where user_id = $1;

select * from inventory
where user_id = $1;