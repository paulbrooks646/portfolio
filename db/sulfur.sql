update inventory
set sulfur = true
where user_id = $1;

update bog
set sulfur_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;