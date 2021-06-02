update inventory
set mirror = true
where user_id = $1;

update valley
set mirror_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;