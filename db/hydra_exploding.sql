update bog
set hydra_exploding = true
where user_id = $1;

select * from bog
where user_id = $1