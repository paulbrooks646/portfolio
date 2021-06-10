update tower
set ribbon_given = true, letter_received = true
where user_id = $1;

update inventory
set ribbon = false, letter = true
where user_id = $1;

select * from inventory
where user_id = $1