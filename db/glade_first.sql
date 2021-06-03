update glade
set first_time = false
where user_id = $1;

select * from glade
where user_id = $1