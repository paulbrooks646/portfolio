update forest
set coin_taken = true
where user_id = $1;

select * from forest
where user_id = $1