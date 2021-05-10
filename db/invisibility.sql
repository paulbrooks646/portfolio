update inventory
set invisibility = true
where user_id = $1;

update cottage
set invisibility_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;