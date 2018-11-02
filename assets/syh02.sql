-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 16-10-2018 a las 14:44:00
-- Versión del servidor: 5.7.23-0ubuntu0.18.04.1-log
-- Versión de PHP: 7.2.10-0ubuntu0.18.04.1

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
  `habilitado` tinyint(1) NOT NULL DEFAULT '1',
  `categoria` varchar(100) NOT NULL DEFAULT 'Sin categoria',
  `path` varchar(150) NOT NULL,
  `titulo` varchar(100) NOT NULL DEFAULT 'Sin titulo',
  `tipo` tinyint(1) NOT NULL,
  `user_iduser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `institucional`
--

INSERT INTO `institucional` (`idinstitucional`, `habilitado`, `categoria`, `path`, `titulo`, `tipo`, `user_iduser`) VALUES
(12, 1, 'De la construcción', '2d003866d5e3cb05.pdf', 'Dec 911 96', 1, 3),
(13, 1, 'De la mineria', '276ec752c19b55e5.pdf', 'Dec 249 07', 1, 3),
(15, 1, 'De la construcción', 'ca48c85e6163e655.pdf', 'Res 231 96 SRT', 1, 3),
(16, 1, 'De la construcción', '3e154a7a06c623b2.pdf', 'Res SRT 35 98', 1, 3),
(17, 1, 'De la construcción', '10e29c464780672a.pdf', 'Res SRT 51 97', 1, 3),
(18, 1, 'De la construcción', '8545e964aea825dc.pdf', 'Res SRT 319 99', 1, 3),
(19, 1, 'De la construcción', '723dcc48f5274724.pdf', 'Res SRT 550 11', 1, 3),
(20, 1, 'Del agro', 'fa11e1bb09fc165a.pdf', 'Decreto 617 97', 1, 3),
(21, 1, 'Enfermedades profesionales', '736680bb81d68185.pdf', 'Dec 658 96', 1, 3),
(22, 1, 'Leyes generales', 'a413be3d827df118.pdf', 'Dec 351 79', 1, 3),
(23, 1, 'Leyes generales', '9538dec031bca29c.pdf', 'Dec 1338 96', 1, 3),
(24, 1, 'Leyes generales', '8669de9706735a81.pdf', 'Ley 19587 72', 1, 3),
(25, 1, 'Leyes generales', '1ba1f5d79f808efd.pdf', 'Ley 24557 95', 1, 3);

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
(3, 1, 'mrivas.jpg', 'mrivas', '$2a$10$0e8288d91b6c511aec404u1rWcKxZb93AcHlTJZDJtRbSLmAh4CDu'),
(4, 1, 'djuarez.jpeg', 'djuarez', '$2a$10$7a45e9b638707b96316b0uN9zjDJd8bqUXyjan3DH9ugKzosCr8.K'),
(6, 1, 'derrecalde.jpeg', 'derrecalde', '$2a$10$790b777e47e08a7ba1559OxLrfw49A7Gkf7X..UHGUEcWLaZDyhje');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `institucional`
--
ALTER TABLE `institucional`
  ADD PRIMARY KEY (`idinstitucional`),
  ADD KEY `fk_inst_user1_idx` (`user_iduser`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `institucional`
--
ALTER TABLE `institucional`
  MODIFY `idinstitucional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
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
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `institucional`
--
ALTER TABLE `institucional`
  ADD CONSTRAINT `fk_inst_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
