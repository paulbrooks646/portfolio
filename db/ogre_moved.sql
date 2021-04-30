update pass
set ogre_moved = true
where user_id = $1;

select * from pass
where user_id = $1;