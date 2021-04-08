update inventory
set flowers = true
where user_id = $1;

update garden
set flowers_taken = true
where user_id = $1;

select * from inventory
where user_id = $1;