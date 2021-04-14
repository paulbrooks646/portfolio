insert into players (name, password, coins, newgame, forest_first, mountain_first)
values ($1, $2, $3, $4, true, true);

insert into blacksmith (user_id, sword_bought, shield_bought, armor_bought, knife_bought, dagger_bought, bow_bought)
values ($1, false, false, false, false, false, false);

insert into magic (user_id, fire_bought, ice_bought, heal_bought, strength_bought, protection_bought, open_bought)
values ($1, false, false, false, false, false, false);

insert into grocer (user_id, potatoes_bought, cheese_bought, cake_bought, candy_bought, meat_bought, nuts_bought)
values ($1, false, false, false, false, false, false);

insert into store (user_id, shoes_bought, rope_bought, flute_bought, bottle_bought, oil_bought, wood_bought)
values ($1, false, false, false, false, false, false);


select * from players
where name = $1;