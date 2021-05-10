update inventory
set levitation = true
where user_id = $1;

update cottage
set levitation_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;