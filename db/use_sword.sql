update swamp
set goblin_scared = true
where user_id = $1;

update inventory
set sword = false
where user_id = $1;

select * from inventory
where user_id = $1