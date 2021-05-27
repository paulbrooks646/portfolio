update inventory
set rag = true
where user_id = $1;

update alley
set rag_received = true
where user_id = $1;

select * from inventory
where user_id = $1;