-- Arquivo de manipulação de dados

-- Mostra a quantidade de usuários cadastrados
select count(*) as QTD_USUARIOS from USUARIOS;

-- Uma procedure que executa o código acima
create procedure Quantidade_Usuarios
AS
BEGIN
	select count(*) as QTD_USUARIOS from USUARIOS;
END;

exec Quantidade_Usuarios;

-- Retorna a quantidade de médicos especializados
create procedure Medicos_Especializados
as
begin
	select count(*) as QTD_MEDICOS from MEDICOS inner join ESPECIALIDADES
	on MEDICOS.ID = ESPECIALIDADES.ID;
end;

exec Medicos_Especializados;

-- Procura médicos especializados em uma especialidade qualquer
create procedure Especialidade_Medicos
	@NOME varchar(100)
as
begin 
	select count(*) as Quatidade_Medicos_Especializados from MEDICOS
	inner join ESPECIALIDADES on MEDICOS.ID_ESPECIALIDADE = ESPECIALIDADES.ID
	and ESPECIALIDADES.NOME = @NOME
end;

exec Especialidade_Medicos 'Pediatria'

-- Converte as datas do sistema para o padrão desejado
select convert(varchar(10), DATA_CONSULTA, 110) as [MM-DD-YYYY] from CONSULTAS

-- Calcula a idade dos usuários
create procedure Idade_Pacientes
as
begin
	select floor(DATEDIFF(day, DATA_NASCIMENTO, getdate()) / 365.25) from PACIENTES;
end;

exec Idade_Pacientes;

-- Insere novos usuario
create procedure Insere_Usuarios
	@EMAIL varchar(250)
   ,@SENHA varchar(250)
   ,@ID_TIPO_USUARIO varchar(100)
as
begin
	insert into USUARIOS(EMAIL, SENHA, ID_TIPO_USUARIO)
	values (@EMAIL, @SENHA, @ID_TIPO_USUARIO)
end

-- Usuario teste
exec Insere_Usuarios 'matheus.custodio@spmedicalgroup.com', '123890', '2'

-- Mostra quanto usuarios tem depois de cada insert
-- Já foi executado
create trigger Soma_Usuarios
on USUARIOS
after insert
as
begin
	select count(*) as QTD_USUARIOS from USUARIOS
end

-- Cria um indice clusterizado pelo rg
create clustered index index_paciente_rg
on PACIENTES(RG)