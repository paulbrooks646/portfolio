update tower
set weasel_soothed = true
where user_id = $1;

update inventory
set flute = false
where user_id = $1;

select * from inventory
where user_id = $1;