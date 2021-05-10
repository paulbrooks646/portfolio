update cottage
set coin_taken = true
where user_id = $1;

select * from cottage
where user_id = $1