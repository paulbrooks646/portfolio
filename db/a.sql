DECLARE cow VARCHAR(100)=$1;

select * from cow
where user_id = $2