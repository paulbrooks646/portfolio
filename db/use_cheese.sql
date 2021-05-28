update alley
set cheese_used = true
where user_id = $1;

update inventory
set cheese = false, rag = true
where user_id = $1;

select * from inventory
where user_id = $1