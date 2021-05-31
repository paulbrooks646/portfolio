update thieves
set master_thief = true
where user_id = $1;

update cottage
set master_thief = true
where user_id = $1;

-- update clearing
-- set master_thief = true
-- where user_id = $1;

select * from thieves
where user_id = $1;