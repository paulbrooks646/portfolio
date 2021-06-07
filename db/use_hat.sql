update inventory
set hat = false
where user_id = $1;

update castle
set hat_given = true
where user_id = $1;

select * from inventory
where user_id = $1;