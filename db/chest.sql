update inventory
set chest = true
where user_id = $1;

update clearing
set chest_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;