update cave
set coin_taken = true
where user_id = $1;

select * from cave
where user_id = $1