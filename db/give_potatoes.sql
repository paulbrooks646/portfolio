update cabin
set potatoes_given = true
where user_id = $1;

update inventory
set potatoes = false
where user_id = $1;

select * from inventory
where user_id = $1