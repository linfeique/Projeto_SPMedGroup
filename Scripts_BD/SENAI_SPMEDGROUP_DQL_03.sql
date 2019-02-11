-- Arquivo de manipula��o de dados

-- Mostra a quantidade de usu�rios cadastrados
select count(*) as QTD_USUARIOS from USUARIOS;

-- Uma procedure que executa o c�digo acima
create procedure Quantidade_Usuarios
AS
BEGIN
	select count(*) as QTD_USUARIOS from USUARIOS;
END;

exec Quantidade_Usuarios;

-- Retorna a quantidade de m�dicos especializados
create procedure Medicos_Especializados
as
begin
	select count(*) as QTD_MEDICOS from MEDICOS inner join ESPECIALIDADES
	on MEDICOS.ID = ESPECIALIDADES.ID;
end;

exec Medicos_Especializados;

-- Procura m�dicos especializados em uma especialidade qualquer
create procedure Especialidade_Medicos
	@NOME varchar(100)
as
begin 
	select count(*) as Quatidade_Medicos_Especializados from MEDICOS
	inner join ESPECIALIDADES on MEDICOS.ID_ESPECIALIDADE = ESPECIALIDADES.ID
	and ESPECIALIDADES.NOME = @NOME
end;

exec Especialidade_Medicos 'Pediatria'

-- Converte as datas do sistema para o padr�o desejado
select convert(varchar(10), DATA_CONSULTA, 110) as [MM-DD-YYYY] from CONSULTAS

-- Calcula a idade dos usu�rios
create procedure Idade_Pacientes
as
begin
	select floor(DATEDIFF(day, DATA_NASCIMENTO, getdate()) / 365.25) from PACIENTES;
end;

exec Idade_Pacientes;