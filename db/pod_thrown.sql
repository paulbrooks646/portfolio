update bog
set pod_thrown = true
where user_id = $1;

select * from bog
where user_id = $1