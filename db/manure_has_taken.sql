update stables
set has_taken = true
where user_id = $1;

select * from stables
where user_id = $1