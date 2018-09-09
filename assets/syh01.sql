-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 30-08-2018 a las 17:02:41
-- Versión del servidor: 5.7.23-0ubuntu0.16.04.1-log
-- Versión de PHP: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_dyd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucional`
--

CREATE TABLE `institucional` (
  `idinstitucional` int(11) NOT NULL,
  `titinst` varchar(100) NOT NULL,
  `imginst` varchar(100) DEFAULT 'null',
  `pdfinst` varchar(100) DEFAULT 'null',
  `viginst` date NOT NULL,
  `textoinst` varchar(45) DEFAULT NULL,
  `tipoinst` tinyint(1) NOT NULL,
  `user_iduser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `institucional`
--

INSERT INTO `institucional` (`idinstitucional`, `titinst`, `imginst`, `pdfinst`, `viginst`, `textoinst`, `tipoinst`, `user_iduser`) VALUES
(1, 'Decreto N° 1338/1996', NULL, '42cf62a05183e70f15f5aeeecb74d798.pdf', '2018-08-15', NULL, 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idprod` int(11) NOT NULL,
  `nombprod` varchar(45) NOT NULL,
  `cantprod` int(11) NOT NULL,
  `imgprod` varchar(100) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `iduser` int(11) NOT NULL,
  `tipouser` tinyint(1) NOT NULL,
  `path` varchar(200) DEFAULT 'nopic.png',
  `nombuser` varchar(45) NOT NULL,
  `contuser` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`iduser`, `tipouser`, `path`, `nombuser`, `contuser`) VALUES
(3, 1, 'mrivas.png', 'mrivas', '$2a$10$0e8288d91b6c511aec404u1rWcKxZb93AcHlTJZDJtRbSLmAh4CDu'),
(4, 1, 'djuarez.jpeg', 'djuarez', '$2a$10$7a45e9b638707b96316b0uN9zjDJd8bqUXyjan3DH9ugKzosCr8.K'),
(6, 1, 'derrecalde.jpeg', 'derrecalde', '$2a$10$790b777e47e08a7ba1559OxLrfw49A7Gkf7X..UHGUEcWLaZDyhje');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `video`
--

CREATE TABLE `video` (
  `idvideo` int(11) NOT NULL,
  `titvideo` varchar(100) NOT NULL,
  `urlvideo` varchar(150) NOT NULL,
  `user_iduser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `institucional`
--
ALTER TABLE `institucional`
  ADD PRIMARY KEY (`idinstitucional`),
  ADD KEY `fk_institucional_user1_idx` (`user_iduser`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idprod`),
  ADD UNIQUE KEY `idproducto_UNIQUE` (`idprod`),
  ADD KEY `fk_producto_user_idx` (`user_iduser`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`),
  ADD UNIQUE KEY `iduser_UNIQUE` (`iduser`);

--
-- Indices de la tabla `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`idvideo`),
  ADD KEY `fk_video_user1_idx` (`user_iduser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `institucional`
--
ALTER TABLE `institucional`
  MODIFY `idinstitucional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idprod` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `video`
--
ALTER TABLE `video`
  MODIFY `idvideo` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `institucional`
--
ALTER TABLE `institucional`
  ADD CONSTRAINT `fk_institucional_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `fk_video_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
