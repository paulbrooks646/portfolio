update bog
set hydra_dead = true
where user_id = $1;

select * from bog
where user_id = $1