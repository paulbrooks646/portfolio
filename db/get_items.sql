update inventory
set blanket = true
where user_id = $1;

update inventory
set glasses = true
where user_id = $1;

update swamp
set items_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;