update stables
set clean_permission = true
where user_id = $1;

select * from stables
where user_id = $1

