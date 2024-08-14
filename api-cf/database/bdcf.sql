-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Ago-2024 às 19:29
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bdetec`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbatraso`
--

CREATE TABLE `tbatraso` (
  `idAtraso` int(11) NOT NULL,
  `dtAtraso` date NOT NULL,
  `horario` date NOT NULL,
  `nomeAluno` varchar(64) NOT NULL,
  `idPeriodo` int(11) NOT NULL,
  `idModulo` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbcurso`
--

CREATE TABLE `tbcurso` (
  `idCurso` int(11) NOT NULL,
  `curso` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbmodulo`
--

CREATE TABLE `tbmodulo` (
  `idModulo` int(11) NOT NULL,
  `modulo` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbperiodo`
--

CREATE TABLE `tbperiodo` (
  `idPeriodo` int(11) NOT NULL,
  `periodo` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tbatraso`
--
ALTER TABLE `tbatraso`
  ADD PRIMARY KEY (`idAtraso`),
  ADD KEY `idModulo` (`idModulo`),
  ADD KEY `idPeriodo` (`idPeriodo`),
  ADD KEY `idCurso` (`idCurso`);

--
-- Índices para tabela `tbcurso`
--
ALTER TABLE `tbcurso`
  ADD PRIMARY KEY (`idCurso`);

--
-- Índices para tabela `tbmodulo`
--
ALTER TABLE `tbmodulo`
  ADD PRIMARY KEY (`idModulo`);

--
-- Índices para tabela `tbperiodo`
--
ALTER TABLE `tbperiodo`
  ADD PRIMARY KEY (`idPeriodo`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbatraso`
--
ALTER TABLE `tbatraso`
  MODIFY `idAtraso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbcurso`
--
ALTER TABLE `tbcurso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbmodulo`
--
ALTER TABLE `tbmodulo`
  MODIFY `idModulo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbperiodo`
--
ALTER TABLE `tbperiodo`
  MODIFY `idPeriodo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tbatraso`
--
ALTER TABLE `tbatraso`
  ADD CONSTRAINT `tbatraso_ibfk_1` FOREIGN KEY (`idModulo`) REFERENCES `tbmodulo` (`idModulo`),
  ADD CONSTRAINT `tbatraso_ibfk_2` FOREIGN KEY (`idPeriodo`) REFERENCES `tbperiodo` (`idPeriodo`),
  ADD CONSTRAINT `tbatraso_ibfk_3` FOREIGN KEY (`idCurso`) REFERENCES `tbcurso` (`idCurso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
