update alley
set glasses_used = true
where user_id = $1;

select * from alley
where user_id = $1