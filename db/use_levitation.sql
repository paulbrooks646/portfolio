update housethree
set levitation_used = true
where user_id = $1;

update inventory
set levitation = false
where user_id = $1;

select * from inventory
where user_id = $1