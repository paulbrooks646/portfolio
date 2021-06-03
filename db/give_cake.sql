update pass
set cake_given = true
where user_id = $1;

update glade
set cake_given = true
where user_id = $1;

update inventory
set cake = false
where user_id = $1;

select * from inventory
where user_id = $1