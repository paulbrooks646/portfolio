update glade
set use_sulfur = true
where user_id = $1;

update inventory
set sulfur = false
where user_id = $1;

select * from inventory
where user_id = $1