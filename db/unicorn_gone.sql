update housefive
set unicorn_gone = true
where user_id = $1;

update glade
set unicorn_freed = true
where user_id = $1;

select * from housefive
where user_id = $1