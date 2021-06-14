update throne
set gem_used = true
where user_id = $1;

update inventory
set gem = false
where user_id = $1;

select * from inventory
where user_id = $1