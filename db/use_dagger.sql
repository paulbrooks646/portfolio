update clearing
set dagger_used = true
where user_id = $1;

update inventory
set dagger = false
where user_id = $1;

select * from inventory
where user_id = $1