update housefive
set unicorn_gone = true
where user_id = $1;

select * from housefive
where user_id = $1