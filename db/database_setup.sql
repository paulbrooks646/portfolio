insert into blacksmith (user_id, sword_bought, shield_bought, armor_bought, knife_bought, dagger_bought, bow_bought)
values ($1, false, false, false, false, false, false);

insert into magic (user_id, fire_bought, ice_bought, heal_bought, strength_bought, protection_bought, open_bought)
values ($1, false, false, false, false, false, false);

insert into grocer (user_id, potatoes_bought, cheese_bought, cake_bought, candy_bought, meat_bought, nuts_bought)
values ($1, false, false, false, false, false, false);

insert into store (user_id, shoes_bought, rope_bought, flute_bought, bottle_bought, oil_bought, wood_bought)
values ($1, false, false, false, false, false, false);

insert into inventory (user_id, flute, bottle, rope, meat, cake, ribbon, flowers, manure, dagger, sword, shield, nuts, letter, hat, bone, feather, potatoes, candy, cheese, shoes, oil, wood, armor, knife, bow, fire, ice, heal, strength, open, protection, seed, axe, cloak, speed, levitation, invisibility, pick, glasses, rag, chest, scales, pod, apple, sulfur, blanket, mirror, hair, picture, charcoal, rock, gem, home, grow, train, mushroom)

values ($1, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);

insert into stables (user_id, clean_permission, has_cleaned, take_permission, has_taken, first_time)
values ($1, false, false, false, false, true);

insert into castle (user_id, nuts_given, letter_given, hat_given, first_time)
values ($1, false, false, false, true);

insert into garden (user_id, manure_given, flowers_taken, first_time)
values ($1, false, false, true);

insert into tower (user_id, weasel_soothed, flowers_given, ribbon_given, letter_received, first_time)
values ($1, false, false, false, false, true);

insert into cave (user_id, first_time, meat_given, bone_taken, coin_taken, hat_taken)
values ($1, true, false, false, false, false);

insert into nest (user_id, rope_used, coin_taken, ribbon_taken, feather_taken, first_time)
values ($1, false, false, false, false, true);

insert into pass (user_id, cake_given, coin_taken, gem_taken, ogre_moved, first_time)
values ($1, false, false, false, false, true);

insert into dashboard (user_id, home_placed, grow_used, first_time)
values ($1, false, false, true);

insert into mountain (user_id, rock_taken, coin_taken, first_time)
values ($1, false, false, true);

insert into forest (user_id, coin_taken, apple_gotten, first_time)
values ($1, false, false, true);

insert into cabin (user_id, mushroom_taken, knife_given, wood_given, potatoes_given, train_received, first_time)
values ($1, false, false, false, false, false, true);

insert into dragon (user_id, ice_used, charcoal_taken, seed_taken, cloak_used, armor_used, speed_used, axe_used, dragon_killed, grow_taken, coin_taken, first_time)
values ($1, false, false, false, false, false, false, false, false, false, false, true);

insert into cottage (user_id, protection_used, fire_used, coin_taken, purse_taken, open_used, levitation_taken, invisibility_taken, door_unlocked, pod_taken, master_thief, first_time)
values ($1, false, false, false, false, false, false, false, false, false, false, true);

insert into swamp (user_id, goblin_scared, goblin_gone, items_taken, first_time)
values ($1, false, false, false, true);

insert into bog (user_id, sulfur_taken, coins_taken, scales_taken, pod_thrown, hydra_exploding, hydra_dead, first_time)
values ($1, false, false, false, false, false, false, true);

insert into town (user_id, oil_used, lock_one, lock_two, lock_three, lock_four, first_time)
values ($1, false, false, false, false, false, true);

insert into houseone (user_id, bone_used, first_time)
values ($1, false, true);

insert into housetwo (user_id, first_time)
values ($1, true);

insert into housethree (user_id, levitation_used, first_time)
values ($1, false, true);

insert into housefour (user_id, heal_used, first_time)
values ($1, false, true);

insert into housefive (user_id, glasses_used, mirror_used, house_taken, unicorn_gone, cage_open, first_time)
values ($1, false, false, false, false, false, true);

insert into alley (user_id, glasses_used, rock_used, charcoal_used, cheese_used, picture_received, coin_given, coin_taken, first_time)
values ($1, false, false, false, false, false, false, false, true);

insert into thieves (user_id, rag_used, candy_used, toy_used, shoes_used, blanket_used, chest_used, cloak_received, pick_received, brigands_stopped, master_thief, coins_received, first_time)
values ($1, false, false, false, false, false, false, false, false, false, false, false, true);


