update inventory
set rock = true
where user_id = $1;

update mountain
set rock_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;