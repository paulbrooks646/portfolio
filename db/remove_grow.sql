update dashboard
set grow_used = false
where user_id = $1;

select * from dashboard
where user_id = $1;