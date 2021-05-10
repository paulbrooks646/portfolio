update inventory
set pod = true
where user_id = $1;

update cottage
set pod_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;