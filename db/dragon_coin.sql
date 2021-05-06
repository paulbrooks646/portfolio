update dragon
set coin_taken = true
where user_id = $1;

select * from dragon
where user_id = $1