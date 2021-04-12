update inventory
set bone = true
where user_id = $1;

update cave
set bone_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;