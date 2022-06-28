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
	citizen_id varchar not null,
	phone_number varchar not null,
	rating int not null,
	description varchar not null,
	gender boolean not null,
	confirmed boolean not null default false,
	open_to_work boolean not null default true,
	blocked boolean not null default false,
	new_email varchar,
	confirm_token varchar,
	reset_password_token varchar,
	deleted boolean default false,
	created_at date,
	updated_at date,
);
CREATE TABLE students (
	id serial not null primary key,
	name varchar not null,
	gender boolean not null,
	grade int not null,
	user_id int not null,
	deleted boolean default false,
    created_at date,
    updated_at date
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
	user_id int not null,
	student_id int not null,
    is_publish boolean default false,
	deleted boolean default false,
    created_at date,
    updated_at date
);

CREATE TABLE required_classes (
	id serial not null primary key,
	grade int not null,
    code varchar not null,
	subject varchar not null,
	min_salary int not null,
	max_salary int not null,
	province int not null,
	district int not null,
	ward int not null,
	user_id int,
	student_id int,
    is_publish boolean default false,
	deleted boolean default false,
    created_at date,
    updated_at date
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
  province_id int DEFAULT NULL
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
 province_id int DEFAULT NULL,
 district_id int DEFAULT NULL
);