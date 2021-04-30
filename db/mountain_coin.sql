update mountain
set coin_taken = true
where user_id = $1;

select * from mountain
where user_id = $1