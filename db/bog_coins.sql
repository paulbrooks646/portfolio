update bog
set coins_taken = true
where user_id = $1;

select * from bog
where user_id = $1