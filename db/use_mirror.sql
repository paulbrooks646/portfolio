update housefive
set mirror_used = true
where user_id = $1;

update inventory
set mirror = false
where user_id = $1;

select * from inventory
where user_id = $1