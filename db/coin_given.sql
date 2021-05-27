update alley
set coin_given = true
where user_id = $1;

select * from alley
where user_id = $1;