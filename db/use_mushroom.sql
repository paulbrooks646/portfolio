update glade
set use_mushroom = true
where user_id = $1;

update inventory
set mushroom = false
where user_id = $1;

select * from inventory
where user_id = $1