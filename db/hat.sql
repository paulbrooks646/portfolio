update inventory
set hat = true
where user_id = $1;

update cave
set hat_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;