update housefive
set glasses_used = true
where user_id = $1;

update inventory
set glasses = false
where user_id = $1;

select * from inventory
where user_id = $1