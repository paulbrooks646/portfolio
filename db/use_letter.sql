update inventory
set letter = false
where user_id = $1;

update castle
set letter_given = true
where user_id = $1;

select * from inventory
where user_id = $1;