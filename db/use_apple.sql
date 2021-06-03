update glade
set use_apple = true
where user_id = $1;

update inventory
set apple = false
where user_id = $1;

select * from inventory
where user_id = $1