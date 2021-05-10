update town
set lock_three = true
where user_id = $1;

select * from town
where user_id = $1