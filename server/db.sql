create database Canvas;
go;
use Canvas;
go;
create table Users
(
    id int identity(1,1) primary key,
    username varchar(30) unique not null,
    password binary(64) not null,
    email varchar(40) unique not null,
    salt uniqueidentifier not null,
    name varchar(30),
    surname varchar(30),
    phone varchar(8)
);
go;
create table System
(
    id int identity(1,1) primary key,
    title varchar(100) not null,
    value varchar(1000) null,
    description varchar(250) not null
);
go
create table Products(
    id int identity(1,1) primary key,
    name varchar(100) not null,
    price decimal not null default 0,
    quantity_left int not null default 0,
    weight decimal not null default 0,
    description varchar(4000),
    specifications varchar(1500),
);
create table Product_Variants(
    id int identity(1,1) primary key,
    product int not null,
    foreign key(product) references Products(id) on delete cascade,
    name varchar(100) not null,
    price decimal not null default 0,
    quantity_left int not null default 0,
    weight decimal not null default 0,
    description varchar(4000),
    specifications varchar(1500),
);
create table Product_Images(
    id int identity(1,1) primary key,
    url varchar(100) not null,
    product int not null,
    foreign key(product) references Products(id) on delete cascade
)
go;
create procedure sp_Register(@username varchar(30),
    @password varchar(25),
    @email varchar(40),
    @name varchar(30),
    @surname varchar(30),
    @phone varchar(8),
    @result bit = 0 output)
as
begin
    declare @salt UNIQUEIDENTIFIER = NEWID();
    IF(not exists(select 1
    from Users
    where username = @username or email = @email))
    begin
        insert into Users
            (username,password,email,salt,name,surname,phone)
        values(@username, HASHBYTES('SHA2_512', @password+CAST(@salt as varchar(36))), @email, @salt, @name, @surname, @phone);
        set @result = 1;
    end
    ELSE
    BEGIN
        set @result = 0;
    END
end;
GO
create procedure sp_Authenticate(@username varchar(30),
    @password varchar(25),
    @result bit = 0 output)
AS
BEGIN

    declare @_password binary(64) = (select HASHBYTES('SHA2_512', @password+CAST(salt AS VARCHAR(36)))
    from Users
    where username = @username or email = @username);
    IF(exists(select 1
    from Users
    where username = @username and password = @_password
        or email = @username and password = @_password))
    BEGIN
        set @result = 1;
    END
    else
    BEGIN
        set @result = 0;
    end
END
go;
create procedure sp_System_Data(@array varchar(50))
as
begin
    /* convierte string separado por comas en array*/
    SELECT id, value
    FROM System
    WHERE  id IN (SELECT convert(int, value)
    FROM string_split(@array, ','))
end
go;

--Default Values for System
insert into System
    (title,description)
--Navbar Color and Link Colors
values('Navbar Color', 'Changes the background color of the navbar'),
    ('Nabvar Links Color', 'Changes the links color of the navbar')
go;


