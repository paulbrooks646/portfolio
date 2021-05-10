update cottage
set door_unlocked = true
where user_id = $1;

select * from cottage
where user_id = $1