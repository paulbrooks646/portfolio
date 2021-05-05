update inventory
set grow = true
where user_id = $1;

update dragon
set grow_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;