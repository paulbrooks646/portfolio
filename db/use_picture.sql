update valley
set picture_used = true
where user_id = $1;

update inventory
set picture = false
where user_id = $1;

select * from inventory
where user_id = $1