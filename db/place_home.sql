update dashboard
set home_placed = true
where user_id = $1;

update inventory
set home = false
where user_id = $1;

select * from dashboard
where user_id = $1;