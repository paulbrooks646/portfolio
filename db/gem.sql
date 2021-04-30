update inventory
set gem = true
where user_id = $1;

update pass
set gem_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;