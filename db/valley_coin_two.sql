update valley
set coin_two_taken = true
where user_id = $1;

select * from valley
where user_id = $1