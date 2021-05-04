update cabin
set wood_given = true
where user_id = $1;

update inventory
set wood = false
where user_id = $1;

select * from inventory
where user_id = $1