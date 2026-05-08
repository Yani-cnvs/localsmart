USE defaultdb;

SET FOREIGN_KEY_CHECKS = 0;

SET NAMES utf8mb4;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: localsmart
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `asignacion_tarea`
--

DROP TABLE IF EXISTS `asignacion_tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacion_tarea` (
  `id_asignacion` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_tarea` int DEFAULT NULL,
  PRIMARY KEY (`id_asignacion`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tarea` (`id_tarea`),
  CONSTRAINT `asignacion_tarea_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `asignacion_tarea_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tarea` (`id_tarea`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacion_tarea`
--

LOCK TABLES `asignacion_tarea` WRITE;
/*!40000 ALTER TABLE `asignacion_tarea` DISABLE KEYS */;
INSERT INTO `asignacion_tarea` VALUES (1,1,1),(3,3,3),(4,4,4),(5,5,5),(7,4,7);
/*!40000 ALTER TABLE `asignacion_tarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Hogar y Muebles'),(2,'Jardin y Mascotas'),(3,'Outdoor'),(4,'Iluminación'),(5,'Ferretería'),(6,'Electrohogar');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_stock`
--

DROP TABLE IF EXISTS `historial_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_stock` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `tipo_movimiento` varchar(70) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `historial_stock_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_stock`
--

LOCK TABLES `historial_stock` WRITE;
/*!40000 ALTER TABLE `historial_stock` DISABLE KEYS */;
INSERT INTO `historial_stock` VALUES (31,1,'entrada',3,'2026-04-20'),(32,2,'entrada',2,'2026-04-20'),(33,3,'entrada',10,'2026-04-20'),(34,4,'entrada',7,'2026-04-20'),(35,5,'entrada',2,'2026-04-20'),(36,6,'entrada',1,'2026-04-20'),(37,7,'entrada',1,'2026-04-20'),(38,8,'entrada',2,'2026-04-20'),(39,9,'entrada',4,'2026-04-20'),(40,10,'entrada',10,'2026-04-20'),(41,11,'entrada',12,'2026-04-20'),(42,12,'entrada',1,'2026-04-20'),(43,13,'entrada',1,'2026-04-20'),(44,14,'entrada',1,'2026-04-20'),(45,15,'entrada',5,'2026-04-20'),(46,16,'entrada',5,'2026-04-20'),(47,17,'entrada',3,'2026-04-20'),(48,18,'entrada',6,'2026-04-20'),(49,19,'entrada',7,'2026-04-20'),(50,20,'entrada',7,'2026-04-20'),(51,21,'entrada',6,'2026-04-20'),(52,22,'entrada',4,'2026-04-20'),(53,23,'entrada',4,'2026-04-20'),(54,24,'entrada',8,'2026-04-20'),(55,25,'entrada',1,'2026-04-20'),(56,26,'entrada',2,'2026-04-20'),(57,27,'entrada',4,'2026-04-20'),(58,28,'entrada',2,'2026-04-20'),(59,29,'entrada',1,'2026-04-20'),(60,30,'entrada',7,'2026-04-20'),(61,1,'entrada',3,'2026-05-07'),(62,2,'entrada',3,'2026-05-07'),(63,3,'entrada',3,'2026-05-07'),(64,4,'entrada',3,'2026-05-07'),(65,5,'entrada',3,'2026-05-07'),(66,6,'entrada',3,'2026-05-07'),(67,7,'entrada',3,'2026-05-07'),(68,8,'entrada',3,'2026-05-07'),(69,9,'entrada',3,'2026-05-07'),(70,10,'entrada',3,'2026-05-07'),(71,11,'entrada',3,'2026-05-07'),(72,12,'entrada',3,'2026-05-07'),(73,13,'entrada',3,'2026-05-07'),(74,14,'entrada',3,'2026-05-07'),(75,15,'entrada',3,'2026-05-07'),(76,16,'entrada',3,'2026-05-07'),(77,17,'entrada',3,'2026-05-07'),(78,18,'entrada',3,'2026-05-07'),(79,19,'entrada',3,'2026-05-07'),(80,20,'entrada',3,'2026-05-07'),(81,21,'entrada',3,'2026-05-07'),(82,22,'entrada',3,'2026-05-07'),(83,23,'entrada',3,'2026-05-07'),(84,24,'entrada',3,'2026-05-07'),(85,25,'entrada',3,'2026-05-07'),(86,26,'entrada',3,'2026-05-07'),(87,27,'entrada',3,'2026-05-07'),(88,28,'entrada',3,'2026-05-07'),(89,29,'entrada',3,'2026-05-07'),(90,30,'entrada',3,'2026-05-07');
/*!40000 ALTER TABLE `historial_stock` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `incentivo`
--

DROP TABLE IF EXISTS `incentivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incentivo` (
  `id_incentivo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `puntos_requeridos` int DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_incentivo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incentivo`
--

LOCK TABLES `incentivo` WRITE;
/*!40000 ALTER TABLE `incentivo` DISABLE KEYS */;
INSERT INTO `incentivo` VALUES (3,'Día libre',550,'Día libre a elección del trabajador'),(9,'Salida anticipada',300,'Permiso para salir una hora antes'),(10,'Gift card',220,'Gift card de $10.000'),(11,'prueba',111,'prueba'),(12,'Regalo sorpresa',250,'Sin descripción');
/*!40000 ALTER TABLE `incentivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id_inventario` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `stock_actual` int DEFAULT NULL,
  PRIMARY KEY (`id_inventario`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,1,35),(2,2,14),(3,3,65),(4,4,5),(5,5,13),(6,6,49),(7,7,33),(8,8,22),(9,9,10),(10,10,100),(11,11,12),(12,12,21),(13,13,7),(14,14,36),(15,15,24),(16,16,8),(17,17,6),(18,18,15),(19,19,4),(20,20,16),(21,21,32),(22,21,57),(23,23,10),(24,24,129),(25,25,206),(26,26,6),(27,27,3),(28,28,16),(29,29,13),(30,30,28);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Mueble organizador',1,'Pasillo 23',69990),(2,'Librero 2 cajones',1,'Pasillo 23',39990),(3,'Repisa 4 niveles',1,'Pasillo 23',39990),(4,'Sofá 3 cuerpos',1,'Pasillo 24',339990),(5,'Sofá cama',1,'Pasillo 24',159990),(6,'Planta natural peperomia',2,'Pasillo 37',7990),(7,'Planta natural gomero',2,'Pasillo 37',11990),(8,'Quitasol playa verde',2,'Pasillo 36',3990),(9,'Casa perro grande',2,'Pasillo 38',33990),(10,'Alimento perro 25 kg',2,'Pasillo 38',20990),(11,'Carpa 6 personas',3,'Pasillo 30',129990),(12,'Carpa 2 personas',3,'Pasillo 30',31990),(13,'Parrilla a carbón',3,'Pasillo 31',39990),(14,'Colchón inflable 1 plaza',3,'Pasillo 30',9990),(15,'Mesa plegable',3,'Pasillo 31',26990),(16,'Set 2 lámparas',4,'Pasillo 25',9990),(17,'Lámpara de pie',4,'Pasillo 25',12990),(18,'Lámpara de escritorio',4,'Pasillo 25',17990),(19,'Lámpara de colgar',4,'Pasillo 25',24990),(20,'Lámpara sobremesa',4,'Pasillo 25',9990),(21,'Cerradura dormitorio',5,'Pasillo 9',12990),(22,'Casco verde',5,'Pasillo 12',3990),(23,'Calzado de seguridad',5,'Pasillo 12',59990),(24,'Set bisagras',5,'Pasillo 9',2990),(25,'Lentes de seguridad',5,'Pasillo 12',1990),(26,'Refrigerador No Frost',6,'Pasillo 42',309990),(27,'Microondas 25 lts',6,'Pasillo 43',39990),(28,'Hervidor 2 lts',6,'Pasillo 43',9990),(29,'Parrilla eléctrica',6,'Pasillo 41',19990),(30,'Plancha a vapor',6,'Pasillo 43',12990);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntos_usuario`
--

DROP TABLE IF EXISTS `puntos_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntos_usuario` (
  `id_puntos` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `puntos_acumulados` int DEFAULT NULL,
  PRIMARY KEY (`id_puntos`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `puntos_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntos_usuario`
--

LOCK TABLES `puntos_usuario` WRITE;
/*!40000 ALTER TABLE `puntos_usuario` DISABLE KEYS */;
INSERT INTO `puntos_usuario` VALUES (1,1,150),(3,3,350),(4,4,450),(5,5,150);
/*!40000 ALTER TABLE `puntos_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporte`
--

DROP TABLE IF EXISTS `reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte` (
  `id_reporte` int NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reporte`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte`
--

LOCK TABLES `reporte` WRITE;
/*!40000 ALTER TABLE `reporte` DISABLE KEYS */;
INSERT INTO `reporte` VALUES (1,'prueba','2026-05-05 18:12:21'),(2,'Solicito revisar módulo \"usuarios\" puesto que no permite agregar uno nuevo.','2026-05-05 18:22:01'),(3,'Se presentan problemas para visualizar el listado de tareas. Por favor, revisar.','2026-05-07 16:22:16');
/*!40000 ALTER TABLE `reporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Jefe'),(2,'Vendedor');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarea`
--

DROP TABLE IF EXISTS `tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarea` (
  `id_tarea` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `fecha` date DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_tarea`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarea`
--

LOCK TABLES `tarea` WRITE;
/*!40000 ALTER TABLE `tarea` DISABLE KEYS */;
INSERT INTO `tarea` VALUES (1,'Reposición','Reponer stock pasillo 9','2026-04-20','pendiente'),(2,'Reposición','Reponer stock pasillo 30','2026-04-20','pendiente'),(3,'Exhibición','Armar exhibición promocional de artículos de camping','2026-04-20','pendiente'),(4,'Bajo stock','Revisar y hacer lista de productos con bajo stock para realizar pedido','2026-04-20','pendiente'),(5,'Reposición','Reponer stock pasillo 42','2026-04-20','completada'),(6,'Promo terminada','Quitar carteles de precios rebajados en pasillo 12','2026-04-20','en proceso'),(7,'Promociones vencidas','Retirar promociones vencidas de los pasillos 20 al 25','2026-05-04','pendiente');
/*!40000 ALTER TABLE `tarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(200) DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ana Pérez','ana_p@localsmart.com','abc123',1),(3,'Miguel Álvarez','miguel_a@localsmart.com','abc345',1),(4,'Catalina López','catalina_l@localsmart.com','abc456',2),(5,'Jorge Castro','jorge_c@localsmart.com','abc567',2),(7,'Jose Soto','jose_s@localsmart.com','$2b$10$dFiZXF14ULUfb92vvJaA3e24l3rPbY8IN6l7Z69b.15gk.np5Iq4m',1),(8,'Julieta Morales','julieta_m@localsmart.com','$2b$10$dFiZXF14ULUfb92vvJaA3e24l3rPbY8IN6l7Z69b.15gk.np5Iq4m',2),(9,'Camila Valdivieso','camila_v@localsmart.com','$2b$10$j/oASrji3ITS6otauPtcT.5ddh2R0SZZia.oz58/TL8sFvC8jMcOO',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-08 11:47:26
SET FOREIGN_KEY_CHECKS = 1;
