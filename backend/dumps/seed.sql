create schema assessment;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(128) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `added_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  `type` int DEFAULT NULL,
  `status` int DEFAULT '1',
  `department` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `salary` double DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `parent_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user.uuid` (`uuid`)
);

INSERT INTO `assessment`.`users` (`id`, `uuid`, `name`, `email`, `password`, `phone`, `added_on`, `last_login`, `type`, `status`, `department`, `age`, `salary`, 
`token`) VALUES ('1', '7f4fb35b-916c-11eb-89d4-509a4ccb5d36', 'Pavan', 'admin@gmail.com', 'testpass', '8096477210', now(), now(), '5', '3', 'it', '25', '100000', 'dftdrfretsdgfdg');

