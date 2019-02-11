-- Arquivo de inserção de dados

insert into CLINICA(NOME, CNPJ, RAZAO_SOCIAL, ENDERECO)
values ('SpMedGroup', '86400902000130', 'SP Medical Group', 'Av. Barão Limeira, 532, São Paulo, SP')

select * from CLINICA;

insert into SITUACAO(SITUACAO)
values ('Realizada'), ('Cancelada'), ('Agendada')

select * from SITUACAO;

insert into TIPO_USUARIO(TIPO)
values ('Médico'), ('Paciente'), ('Administrador')

select * from TIPO_USUARIO;

insert into USUARIOS(EMAIL, SENHA, ID_TIPO_USUARIO)
values ('ricardo.lemos@spmedicalgroup.com.br', '123456', '2'),
	   ('roberto.possarle@spmedicalgroup.com.br', '654321', '1'),
	   ('helena.souza@spmedicalgroup.com.br', '987650', '3')

select * from USUARIOS;

insert into ESPECIALIDADES(NOME)
values ('Acupuntura'),('Anestesiologia'), ('Angiologia'), ('Cardiologia')
	  ,('Cirurgia Cardiovascular'),('Cirurgia da Mão'), ('Cirurgia do Aparelho Digestivo'), ('Cirurgia Geral')
	  ,('Cirurgia Pediátrica'),('Cirurgia Plástica'), ('Cirurgia Torácica'), ('Cirurgia Vascular')
	  ,('Dermatologia'), ('Radioterapia'), ('Urologia'), ('Pediatria'), ('Psiquiatria')

select * from ESPECIALIDADES;

insert into MEDICOS(NOME, ID_ESPECIALIDADE, ID_CLINICA, ID_USUARIO, CRM)
values ('Ricardo Lemos', 2, 1, 1, '54356-SP')
	  ,('Roberto Possarle', 17, 1, 2, '53452-SP')
	  ,('Helena Strada', 16, 1, 3, '65463-SP')

select * from MEDICOS;

insert into PACIENTES(NOME, DATA_NASCIMENTO, TELEFONE, RG, CPF, ID_USUARIO, ENDERECO)
values ('Mariana', '05/03/2018', '11 96584-5231', '54566266-8', '13771913039', 2, 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140')
	  ,('Alexandre', '23/07/2001', '11 98765-6543', '32654345-7', '73556944057', 2, 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200')
	  ,('Fernando', '10/10/1978', '11 97208-4453', '54636525-3', '16839338002', 2, 'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200')
	  ,('Henrique', '13/10/1985', '11 3456-6543', '54366362-5', '54366362-5', 2, 'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030')
	  ,('João', '27/08/1975', '11 7656-6377', '32544444-1', '91305348010', 2, 'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380')
	  ,('Bruno', '21/03/1972', '11 95436-8769', '54566266-7', '79799299004', 2, 'Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001')
	  ,('Lidia', '21/11/2011', '11 3456-7654', '43522543-5', '94839859000', 2, 'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000')

select * from PACIENTES;

insert into CONSULTAS(ID_PACIENTE, ID_MEDICO, DATA_CONSULTA, ID_SITUACAO, DESCRICAO)
values (1, 2, '20/01/2019  15:00:00', 1, 'blabla')
	  ,(2, 3, '06/01/2018  10:00:00', 2, 'bloblo')
	  ,(3, 1, '07/02/2019  11:00:00', 1, 'blublu')
	  ,(2, 1, '06/02/2018  10:00:00', 1, 'bleble')
	  ,(4, 1, '07/02/2019  11:00:45', 2, 'blibli')
	  ,(1, 1, '08/02/2019  15:00:00', 3, 'blable')
	  ,(4, 1, '09/02/2019  11:00:45', 3, 'bliblo')

select * from CONSULTAS;