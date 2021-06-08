update tower
set coin_taken = true
where user_id = $1;

select * from tower
where user_id = $1