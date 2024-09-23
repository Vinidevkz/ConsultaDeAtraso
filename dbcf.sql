-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/09/2024 às 00:38
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbcf`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbatraso`
--

CREATE TABLE `tbatraso` (
  `idAtraso` int(11) NOT NULL,
  `nomeAluno` varchar(60) NOT NULL,
  `horarioAtraso` time(6) DEFAULT NULL,
  `nomeCurso` varchar(60) NOT NULL,
  `periodoCurso` varchar(60) NOT NULL,
  `moduloCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbatraso`
--

INSERT INTO `tbatraso` (`idAtraso`, `nomeAluno`, `horarioAtraso`, `nomeCurso`, `periodoCurso`, `moduloCurso`) VALUES
(1, 'Gthtbg', '19:48:00.000000', 'Desenvolvimento de Sistemas', 'manhã', 2),
(2, 'Gthtbg', '16:49:00.000000', 'Desenvolvimento de Sistemas', 'manhã', 2),
(3, 'Vinicius Eduardo', '16:51:00.000000', 'Desenvolvimento de Sistemas', 'tarde', 3),
(6, 'Vinicius', '16:10:00.000000', 'Desenvolvimento de Sistemas', 'Tarde', 3),
(14, 'Vinicius', '16:43:00.000000', 'Desenvolvimento de Sistemas', 'Tarde', 3),
(15, 'Vinicius', '16:47:00.000000', 'Desenvolvimento de Sistemas', 'Tarde', 3),
(16, 'Vinicius', '16:48:00.000000', 'Desenvolvimento de Sistemas', 'Tarde', 3),
(17, 'Gtht', '16:52:00.000000', 'Administração', 'tarde', 3),
(18, 'Vinicius', '19:14:00.000000', 'Desenvolvimento de Sistemas', 'Tarde', 3),
(19, 'Vinicius', '19:23:00.000000', 'Desenvolvimento de Sistemas', 'Tarde', 3),
(20, 'Vinicius', '19:23:00.000000', 'Desenvolvimento de Sistemas', 'Tarde', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbcurso`
--

CREATE TABLE `tbcurso` (
  `idCurso` int(11) NOT NULL,
  `nomeCurso` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbcurso`
--

INSERT INTO `tbcurso` (`idCurso`, `nomeCurso`) VALUES
(1, 'Desenvolvimento de Sistemas'),
(2, 'Nutrição'),
(3, 'Administração');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbatraso`
--
ALTER TABLE `tbatraso`
  ADD PRIMARY KEY (`idAtraso`);

--
-- Índices de tabela `tbcurso`
--
ALTER TABLE `tbcurso`
  ADD PRIMARY KEY (`idCurso`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbatraso`
--
ALTER TABLE `tbatraso`
  MODIFY `idAtraso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `tbcurso`
--
ALTER TABLE `tbcurso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
