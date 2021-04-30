update dashboard
set home_placed = false
where user_id = $1;

select * from dashboard
where user_id = $1;