update housefive
set cage_open = true
where user_id = $1;

select * from housefive
where user_id = $1