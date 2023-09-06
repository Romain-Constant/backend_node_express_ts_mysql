CREATE TABLE `thing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `thing` (`id`, `name`) VALUES
(1, 'shoes'),
(2, 'computer'),
(3, 'raclette');
