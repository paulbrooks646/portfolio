update market
set first_time = false
where user_id = $1;

select * from market
where user_id = $1