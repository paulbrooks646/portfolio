update inventory
set sword = true
where user_id = $1;

update blacksmith
set sword_bought = true
where user_id = $1;

select * from inventory
where user_id = $1;