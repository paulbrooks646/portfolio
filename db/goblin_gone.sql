update swamp
set goblin_gone = true
where user_id = $1;

select * from swamp
where user_id = $1;