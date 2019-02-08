create database SENAI_SPMEDGROUP_TARDE;

use SENAI_SPMEDGROUP_TARDE;

create table CLINICA (
	ID int identity primary key
	,NOME varchar(250) not null
	,CNPJ char(14) not null unique
	,RAZAO_SOCIAL varchar(250) not null unique
	,ENDERECO varchar(255) not null 
);

create table SITUACAO (
	ID int identity primary key
	,SITUACAO varchar(250) not null 
);

create table TIPO_USUARIO (
	ID int identity primary key
	,TIPO varchar(250) not null unique
);

create table USUARIOS (
	ID int identity primary key
	,EMAIL varchar(250) not null unique
	,SENHA varchar(250) not null
	,ID_TIPO_USUARIO int foreign key references TIPO_USUARIO(ID)
);

create table ESPECIALIDADES (
	ID int identity primary key
	,NOME varchar(250) not null unique
);

create table MEDICOS (
	ID int identity primary key
	,NOME varchar(250) not null
	,ID_ESPECIALIDADE int foreign key references ESPECIALIDADES(ID)
	,ID_CLINICA int foreign key references CLINICA(ID)
	,ID_USUARIO int foreign key references USUARIOS(ID)
	,CRM char(8) not null unique
);

create table PACIENTES (
	ID int identity primary key
	,NOME varchar(250) not null
	,DATA_NASCIMENTO datetime not null
	,TELEFONE char(15) not null
	,RG char(10) not null unique
	,CPF char(12) not null unique
	,ID_USUARIO int foreign key references USUARIOS(ID)
	,ENDERECO varchar(255) not null
);

create table CONSULTAS (
	ID int identity primary key
	,ID_PACIENTE int foreign key references PACIENTES(ID)
 	,ID_MEDICO int foreign key references MEDICOS(ID)
	,ID_SITUACAO int foreign key references SITUACAO(ID)
	,DATA_CONSULTA datetime not null
	,DESCRICAO text
);

alter table CONSULTAS alter column DESCRICAO text