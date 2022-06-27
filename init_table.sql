use tutorDB;
CREATE TABLE users (
	id serial not null primary key,
	email varchar not null,
	name varchar not null,
	password varchar not null,
	address varchar not null,
	province int not null,
	district int not null,
	ward int not null,
	citizenId varchar not null,
	phoneNumber varchar not null,
	rating int not null,
	description varchar not null,
	gender boolean not null,
	confirmed boolean not null default false,
	openToWork boolean not null default true,
	blocked boolean not null default false,
	newEmail varchar,
	confirmToken varchar,
	resetPasswordToken varchar,
	deleted boolean default false
);
CREATE TABLE students (
	id serial not null primary key,
	name varchar not null,
	gender boolean not null,
	grade int not null,
	userId int not null,
	deleted boolean default false,
    createdAt date,
    updatedAt date
);

CREATE TABLE classes (
	id serial not null primary key,
	grade int not null,
    code varchar not null,
	subject varchar not null,
	salary int not null,
	province int not null,
	district int not null,
	ward int not null,
	userId int not null,
	studentId int not null,
    isPublish boolean default false,
	deleted boolean default false,
    createdAt date,
    updatedAt date
);




CREATE TABLE requiredClasses (
	id serial not null primary key,
	grade int not null,
    code varchar not null,
	subject varchar not null,
	minSalary int not null,
	maxSalary int not null,
	province int not null,
	district int not null,
	ward int not null,
	userId int,
	studentId int,
    isPublish boolean default false,
	deleted boolean default false,
    createdAt date,
    updatedAt date
);

-- not use
CREATE TABLE conversation (
	id serial not null primary key,
	tutor_id int not null,
	parent_id int not null,
	deleted boolean default false,
);

-- not use
CREATE TABLE message (
	conversation_id int
	id serial not null primary key,
	is_tutor_send boolean not null,
	content varchar(255) not null,
	deleted boolean default false,
);

-- Create data table province district ward
CREATE TABLE districts (
  id int NOT NULL,
  name varchar ,
  prefix varchar,
  provinceId int DEFAULT NULL
);

CREATE TABLE provinces (
 id int NOT NULL,
 name varchar DEFAULT NULL,
 code varchar DEFAULT NULL
);

CREATE TABLE wards (
 id int NOT NULL,
 name varchar NOT NULL,
 prefix varchar DEFAULT NULL,
 provinceId int DEFAULT NULL,
 districtId int DEFAULT NULL
);