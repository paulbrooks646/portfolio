update inventory
set bow = true
where user_id = $1;

update blacksmith
set bow_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;