update glade
set magic_user = true
where user_id = $1;

update magic
set magic_user = true
where user_id = $1;

select * from glade
where user_id = $1