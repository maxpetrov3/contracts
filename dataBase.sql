-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: oitis
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_direction`
--

DROP TABLE IF EXISTS `activity_direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_direction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `dir_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_direction`
--

LOCK TABLES `activity_direction` WRITE;
/*!40000 ALTER TABLE `activity_direction` DISABLE KEYS */;
INSERT INTO `activity_direction` VALUES (1,'ВТ'),(2,'КИС'),(3,'ЛИС'),(4,'Связь');
/*!40000 ALTER TABLE `activity_direction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_costs_type`
--

DROP TABLE IF EXISTS `contract_costs_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_costs_type` (
  `contract_id` bigint NOT NULL,
  `cost_type_id` bigint NOT NULL,
  KEY `FK3rjqnahcil3vpbvpkl04l6p1r` (`cost_type_id`),
  KEY `FK6p6c2n2flq8ialcv5r8f2wvbh` (`contract_id`),
  CONSTRAINT `FK3rjqnahcil3vpbvpkl04l6p1r` FOREIGN KEY (`cost_type_id`) REFERENCES `cost_type` (`id`),
  CONSTRAINT `FK6p6c2n2flq8ialcv5r8f2wvbh` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_costs_type`
--

LOCK TABLES `contract_costs_type` WRITE;
/*!40000 ALTER TABLE `contract_costs_type` DISABLE KEYS */;
INSERT INTO `contract_costs_type` VALUES (6,2),(6,3),(7,2),(8,2),(9,3),(9,2),(5,2),(5,3);
/*!40000 ALTER TABLE `contract_costs_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_fm_positions`
--

DROP TABLE IF EXISTS `contract_fm_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_fm_positions` (
  `contract_id` bigint NOT NULL,
  `fm_position` bigint NOT NULL,
  KEY `FK9yti9sto6fsnf34m0aa2n57x9` (`fm_position`),
  KEY `FK1jtkuuvno96e779qv5x2s284c` (`contract_id`),
  CONSTRAINT `FK1jtkuuvno96e779qv5x2s284c` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`),
  CONSTRAINT `FK9yti9sto6fsnf34m0aa2n57x9` FOREIGN KEY (`fm_position`) REFERENCES `fm_position` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_fm_positions`
--

LOCK TABLES `contract_fm_positions` WRITE;
/*!40000 ALTER TABLE `contract_fm_positions` DISABLE KEYS */;
INSERT INTO `contract_fm_positions` VALUES (6,1),(6,2),(7,2),(7,3),(8,2),(8,3),(9,2),(9,4),(5,1),(5,2);
/*!40000 ALTER TABLE `contract_fm_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_pay_rules`
--

DROP TABLE IF EXISTS `contract_pay_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_pay_rules` (
  `contract_id` bigint NOT NULL,
  `pay_rule_id` bigint NOT NULL,
  KEY `FKug57kisuonow0pg2nnukywao` (`pay_rule_id`),
  KEY `FK7xrmg0mfp01g3iwlt6raimjcy` (`contract_id`),
  CONSTRAINT `FK7xrmg0mfp01g3iwlt6raimjcy` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`),
  CONSTRAINT `FKug57kisuonow0pg2nnukywao` FOREIGN KEY (`pay_rule_id`) REFERENCES `pay_rule` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_pay_rules`
--

LOCK TABLES `contract_pay_rules` WRITE;
/*!40000 ALTER TABLE `contract_pay_rules` DISABLE KEYS */;
INSERT INTO `contract_pay_rules` VALUES (6,1),(6,2),(7,2),(8,2),(9,2),(9,3),(5,1),(5,2),(5,3);
/*!40000 ALTER TABLE `contract_pay_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_status`
--

DROP TABLE IF EXISTS `contract_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_status` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_status`
--

LOCK TABLES `contract_status` WRITE;
/*!40000 ALTER TABLE `contract_status` DISABLE KEYS */;
INSERT INTO `contract_status` VALUES (1,'Дополнен'),(2,'Исполнен'),(3,'К исполнению'),(4,'Начало работы'),(5,'Отклонено'),(6,'Отменен'),(7,'Ошибочно'),(8,'Подготовлен'),(9,'Подписан'),(10,'Расторгнут');
/*!40000 ALTER TABLE `contract_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_task`
--

DROP TABLE IF EXISTS `contract_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `about` varchar(255) DEFAULT NULL,
  `contract_id` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `task_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_task`
--

LOCK TABLES `contract_task` WRITE;
/*!40000 ALTER TABLE `contract_task` DISABLE KEYS */;
INSERT INTO `contract_task` VALUES (1,'Отправить счета и акты','2122','2020-05-15','Отправка документов','Не выполнено'),(2,'Получить счета и акты','2122','2022-05-27','Получение документов','Не выполнено'),(3,'Оплатить всю сумму договора','2122','2021-10-27','Оплата','Не выполнено'),(4,'Оформить акт приемки товаров','2122','2021-03-11','Акт приемки','Не выполнено'),(6,'21V0121','2122','2021-05-05','21V0121','Выполнено'),(7,' test','2122','2021-05-29',' test','Не выполнено'),(8,'Предварительное совещание','ghbfhbhdtnhntngthth2_1','2021-05-25','Работа 1','Не выполнено'),(9,'Решение вопросов','ghbfhbhdtnhntngthth2_1','2021-05-31','Работа 2','Не выполнено'),(10,'Совещние','ghbfhbhdtnhntngthth2_1','2021-06-09','Работа 1','Не выполнено'),(11,'нова задача','2122','2021-06-05',' test','Выполнено'),(12,'Необходимо сдать Акты','1223','2021-06-03','Сдача документов','Выполнено');
/*!40000 ALTER TABLE `contract_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `about_contract` varchar(255) DEFAULT NULL,
  `about_contract_short` varchar(255) DEFAULT NULL,
  `begin_contract_date` varchar(255) DEFAULT NULL,
  `contract_date` varchar(255) DEFAULT NULL,
  `contract_id` varchar(255) DEFAULT NULL,
  `contract_price` bigint DEFAULT NULL,
  `ds_id` bit(1) DEFAULT NULL,
  `end_contract_date` varchar(255) DEFAULT NULL,
  `invest_project` varchar(255) DEFAULT NULL,
  `rks` varchar(255) DEFAULT NULL,
  `ur_id` varchar(255) DEFAULT NULL,
  `contract_status` bigint DEFAULT NULL,
  `contragent` bigint DEFAULT NULL,
  `currency` bigint DEFAULT NULL,
  `direction_id` bigint DEFAULT NULL,
  `dis_protocol` bigint DEFAULT NULL,
  `executor` bigint DEFAULT NULL,
  `kreditor` bigint DEFAULT NULL,
  `pay_skip` bigint DEFAULT NULL,
  `tender` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhgu218oer5be53wwkeao39l3t` (`contract_status`),
  KEY `FKrfbdweoklrl12jk0uagcypmen` (`contragent`),
  KEY `FK2pvtgusyy3vt5sqc659v0j9b6` (`currency`),
  KEY `FK3va4yk34w1y3234cy639ovqeh` (`direction_id`),
  KEY `FKixlriwqfgufg0kdu8w6lkniic` (`dis_protocol`),
  KEY `FKaiws7f9nukomrh0xy65knwbhn` (`kreditor`),
  KEY `FKiy9v86biu983c4xg6gatbpqrj` (`pay_skip`),
  KEY `FKntvgdpwsvqi81ubdh1dso60w0` (`tender`),
  KEY `FKtfu8k5d0ogqhj5bpm181dqd9k` (`executor`),
  CONSTRAINT `FK2pvtgusyy3vt5sqc659v0j9b6` FOREIGN KEY (`currency`) REFERENCES `currency` (`id`),
  CONSTRAINT `FK3va4yk34w1y3234cy639ovqeh` FOREIGN KEY (`direction_id`) REFERENCES `activity_direction` (`id`),
  CONSTRAINT `FKaiws7f9nukomrh0xy65knwbhn` FOREIGN KEY (`kreditor`) REFERENCES `kreditor` (`id`),
  CONSTRAINT `FKhgu218oer5be53wwkeao39l3t` FOREIGN KEY (`contract_status`) REFERENCES `contract_status` (`id`),
  CONSTRAINT `FKixlriwqfgufg0kdu8w6lkniic` FOREIGN KEY (`dis_protocol`) REFERENCES `disagree_protocol` (`id`),
  CONSTRAINT `FKiy9v86biu983c4xg6gatbpqrj` FOREIGN KEY (`pay_skip`) REFERENCES `post_pay_rule` (`id`),
  CONSTRAINT `FKntvgdpwsvqi81ubdh1dso60w0` FOREIGN KEY (`tender`) REFERENCES `tender` (`id`),
  CONSTRAINT `FKrfbdweoklrl12jk0uagcypmen` FOREIGN KEY (`contragent`) REFERENCES `contragent` (`id`),
  CONSTRAINT `FKtfu8k5d0ogqhj5bpm181dqd9k` FOREIGN KEY (`executor`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (5,' test','Предоставление неисключительных прав','2021-05-04','2021-05-04',' 2121',100000,NULL,'2021-05-28',' 123','1',' 12',1,1,1,2,1,1,1,1,2),(6,' test',NULL,'2021-05-04','2021-05-04',' 2122',100000,NULL,'2021-05-28',' 123','1',' 12',1,1,1,2,1,1,1,1,2),(7,' описание',' краткое описание','2021-05-04','2021-05-10','1223',15000,NULL,'2021-05-31',' 123454565','1',' 1234567',3,2,3,3,1,1,1,2,3),(8,' описание',' краткое описание','2021-05-04','2021-05-10','1544',15000,NULL,'2021-05-31',' 123454565','1',' 1234567',3,2,3,3,1,2,1,2,3),(9,' Описание','Договор на оказание услуг','2021-04-27','2021-05-04',' 5485',123654,NULL,'2021-06-05',' 123','1',' 12345',3,2,2,2,2,1,1,1,1);
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contragent`
--

DROP TABLE IF EXISTS `contragent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contragent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `contragent_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contragent`
--

LOCK TABLES `contragent` WRITE;
/*!40000 ALTER TABLE `contragent` DISABLE KEYS */;
INSERT INTO `contragent` VALUES (1,'0001040795','ООО \"Актион-диджитал продажи\"','Общество с ограниченной ответственностью находится в городе Москва'),(2,'0001036008','ООО \"ИТ-ПроСистем\"','Общество с огранисенной ответственностью Информационные технологии обработки данных'),(3,'1234567','ООО \"КапСтрой\"','Новая строительная компания');
/*!40000 ALTER TABLE `contragent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost_type`
--

DROP TABLE IF EXISTS `cost_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost_type`
--

LOCK TABLES `cost_type` WRITE;
/*!40000 ALTER TABLE `cost_type` DISABLE KEYS */;
INSERT INTO `cost_type` VALUES (1,'РОДП'),(2,'ССР'),(3,'ФНК'),(4,'ДР'),(5,'ПРН');
/*!40000 ALTER TABLE `cost_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (1,'RUB'),(2,'EURUR'),(3,'USD');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disagree_protocol`
--

DROP TABLE IF EXISTS `disagree_protocol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disagree_protocol` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disagree_protocol`
--

LOCK TABLES `disagree_protocol` WRITE;
/*!40000 ALTER TABLE `disagree_protocol` DISABLE KEYS */;
INSERT INTO `disagree_protocol` VALUES (1,'Нет'),(2,'Протокол разногласий'),(3,'Протокол урегулирования разногласий');
/*!40000 ALTER TABLE `disagree_protocol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fm_position`
--

DROP TABLE IF EXISTS `fm_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fm_position` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fm_position`
--

LOCK TABLES `fm_position` WRITE;
/*!40000 ALTER TABLE `fm_position` DISABLE KEYS */;
INSERT INTO `fm_position` VALUES (1,'122900000'),(2,'121090001'),(3,'Z22990001'),(4,'Z22100070');
/*!40000 ALTER TABLE `fm_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kreditor`
--

DROP TABLE IF EXISTS `kreditor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kreditor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kreditor`
--

LOCK TABLES `kreditor` WRITE;
/*!40000 ALTER TABLE `kreditor` DISABLE KEYS */;
INSERT INTO `kreditor` VALUES (1,'0001040794'),(2,'0001036007'),(3,'0001017803'),(4,'0000002259');
/*!40000 ALTER TABLE `kreditor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_rule`
--

DROP TABLE IF EXISTS `pay_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_rule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_rule`
--

LOCK TABLES `pay_rule` WRITE;
/*!40000 ALTER TABLE `pay_rule` DISABLE KEYS */;
INSERT INTO `pay_rule` VALUES (1,'1600','оплата через 60 дней'),(2,'1475','Оплата 40 календарных денй'),(3,'1121',NULL),(4,'1650',NULL);
/*!40000 ALTER TABLE `pay_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_pay_rule`
--

DROP TABLE IF EXISTS `post_pay_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_pay_rule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_pay_rule`
--

LOCK TABLES `post_pay_rule` WRITE;
/*!40000 ALTER TABLE `post_pay_rule` DISABLE KEYS */;
INSERT INTO `post_pay_rule` VALUES (1,'НПД'),(2,'НСД');
/*!40000 ALTER TABLE `post_pay_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_comment`
--

DROP TABLE IF EXISTS `task_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `comment_date` varchar(255) DEFAULT NULL,
  `task_id` bigint DEFAULT NULL,
  `autor` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbyrgshq525x7m5iotq35tgbxj` (`autor`),
  CONSTRAINT `FKbyrgshq525x7m5iotq35tgbxj` FOREIGN KEY (`autor`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_comment`
--

LOCK TABLES `task_comment` WRITE;
/*!40000 ALTER TABLE `task_comment` DISABLE KEYS */;
INSERT INTO `task_comment` VALUES (1,'Привет','2021-05-14',1,1),(2,'123','2021-05-14',1,1),(12,'sdf','2021-05-14',1,1),(13,'sdfsdfsdfsdfsdfsdeasdfgfgsadfgsdfgsdfgsdfgsdfgsdfg','2021-05-14',1,1),(14,'Закрыта','2021-05-16',6,1),(15,'Открыта повторно, сдать акты','2021-05-16',6,1),(16,'Акты сданы!','2021-05-16',6,1),(18,'выполено','2021-05-16',1,1),(19,'21V0121','2021-05-16',1,1),(21,'123','2021-05-22',1,1),(22,'Сдано','2021-05-31',12,1),(23,'Сдано','2021-05-31',12,1),(24,'Наконец выполнено','2021-05-31',1,1),(25,'не готов','2021-05-31',1,1),(26,'Пришли документы 01.06','2021-05-31',11,1);
/*!40000 ALTER TABLE `task_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tender`
--

DROP TABLE IF EXISTS `tender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tender` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tender`
--

LOCK TABLES `tender` WRITE;
/*!40000 ALTER TABLE `tender` DISABLE KEYS */;
INSERT INTO `tender` VALUES (1,'Упрощенный'),(2,'Открытый'),(3,'Не проводился'),(4,'Закрытый');
/*!40000 ALTER TABLE `tender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ex_name` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Петров Максим','petrovmf','1234','Инженер','USER'),(2,'Иванов Иван Иванович','ivanovii','123','Специалист','USER'),(3,'Администратор','admin','admin','Админимтратор','ADMIN'),(6,'Петров Максим ','petrovm',NULL,'Специалист 1 категории','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-28 22:09:02
