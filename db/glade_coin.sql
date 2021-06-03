update glade
set coin_taken = true
where user_id = $1;

select * from glade
where user_id = $1