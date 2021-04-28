update forest
set first_time = false
where id = $1;

select * from forest
where id = $1