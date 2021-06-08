update garden
set coin_taken = true
where user_id = $1;

select * from garden
where user_id = $1