update inventory
set mushroom = true
where user_id = $1;

update cabin
set mushroom_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;