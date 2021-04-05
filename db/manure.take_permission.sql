update stables
set take_permission = true
where user_id = $1;

select * from stableswhere user_id = $1