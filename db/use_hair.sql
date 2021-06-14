update throne
set hair_used = true
where user_id = $1;

update inventory
set hair = false
where user_id = $1;

select * from inventory
where user_id = $1