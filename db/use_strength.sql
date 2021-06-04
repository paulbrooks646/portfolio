update clearing
set strength_used = true
where user_id = $1;

update inventory
set strength = false
where user_id = $1;

select * from inventory
where user_id = $1