update mountain
set first_time = false
where id = $1;

select * from mountain
where id = $1