update nest
set coin_taken = true
where user_id = $1;

select * from nest
where user_id = $1