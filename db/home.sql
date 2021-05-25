update inventory
set home = true
where user_id = $1;

update housefive
set house_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;