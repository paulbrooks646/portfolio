update inventory
set toy = true
where user_id = $1;

update cabin
set toy_received = true
where user_id = $1;

select * from inventory
where user_id = $1;