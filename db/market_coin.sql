update market
set coin_taken = true
where user_id = $1;

select * from market
where user_id = $1;