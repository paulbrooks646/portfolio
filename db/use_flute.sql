update tower
set weasel_soothed = true
where user_id = $1;

select * from tower
where user_id = $1