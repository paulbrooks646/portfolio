update inventory
set flute = true
where user_id = $1;

update store
set flute_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;