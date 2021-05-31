update thieves
set rag_used = true
where user_id = $1;

update inventory
set rag = false
where user_id = $1;

select * from inventory
where user_id = $1