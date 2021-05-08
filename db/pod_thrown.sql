update bog
set pod_thrown = true
where user_id = $1;

update inventory
set pod = false
where user_id = $1;

select * from inventory
where user_id = $1;