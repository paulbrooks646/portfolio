update dashboard
set grow_used = true
where user_id = $1;

update inventory
set grow = false
where user_id = $1;

select * from dashboard
where user_id = $1;