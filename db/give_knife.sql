update cabin
set knife_given = true
where user_id = $1;

update inventory
set knife = false
where user_id = $1;

select * from inventory
where user_id = $1