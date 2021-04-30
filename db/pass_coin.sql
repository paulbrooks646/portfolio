update pass
set coin_taken = true
where user_id = $1;

select * from pass
where user_id = $1