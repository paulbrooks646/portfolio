update inventory
set armor = true
where user_id = $1;

update blacksmith
set armor_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;