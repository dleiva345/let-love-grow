CREATE SCHEMA 'user_info' ;


CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `couple_key` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `birthday` DATE NULL,
  `anniversary` DATE NULL,
  `photo` LONGTEXT NULL,
  `photo_couple` LONGTEXT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  PRIMARY KEY (`id`));
