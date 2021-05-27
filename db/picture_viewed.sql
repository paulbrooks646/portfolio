update alley
set picture_viewed = true
where user_id = $1;

select * from alley
where user_id = $1;