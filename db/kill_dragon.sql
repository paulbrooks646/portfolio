update dragon
set dragon_killed = true
where user_id = $1;

select * from dragon
where user_id = $1