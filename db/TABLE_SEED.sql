DROP TABLE IF EXISTS chat,account,company,message,listing,completed,choice,question,answered;
CREATE TABLE company(
    company_id serial primary key,
    company_name VARCHAR(50),
    company_summary text,
    company_address varchar(50),
    company_phone varchar(15),
    logo varchar(200)
);
CREATE TABLE account(
    account_id SERIAL PRIMARY KEY,
    company_id int REFERENCES company(company_id),
    NAME VARCHAR(40),
    hash_value text,
    email VARCHAR(40),
    phone_number VARCHAR(15),
    address VARCHAR(50),
    resume VARCHAR(100),
    portfolio VARCHAR(100),
    url VARCHAR(200),
    timestamp timestamp default  DATE_TRUNC('minute',now())
);
create table chat(
    chat_id serial primary key,
    account_id int REFERENCES account(account_id),
    company_id int REFERENCES company(company_id)
);
create table message(
message_id serial primary key,
chat_id int REFERENCES chat(chat_id),
message text,
timestamp timestamp default now()
);
create table listing(
    listing_id serial primary key,
    company_id INT REFERENCES company(company_id),
    company_name VARCHAR(50),
    company_summary text,
    company_address varchar(50),
    company_phone varchar(15),
    position varchar(45),
    location text,
    salary text,
    description text,
    total_points int,
    timestamp date default DATE_TRUNC('day',now())
);
create table question(
    question_id serial primary key,
    listing_id int REFERENCES listing(listing_id),
    question text,
    choice text,
    not_choice_points text
);
create table choice(
    choice_id serial primary key,
    question_id int REFERENCES question(question_id),
    answer text,
    points int
);
create table completed(
    completed_id serial primary key,
    listing_id INT REFERENCES listing(listing_id),
    account_id INT REFERENCES account(account_id),
timestamp timestamp default  DATE_TRUNC('minute',now())
);
create table answered(
    answered_id serial primary key,
    completed_id INT references completed(completed_id),
    question_id INT references question(question_id),
    answer text,
    points int
);
insert into company (company_name)values ('The Good Corporation R Us')
returning company_id;
insert into account
(
    email,hash_value,name,phone_number,address,resume,portfolio,url,company_id
)
values
(
    'j','$2a$10$6IqE0LmNgtrJFWTUWiolkebcxOz1qtQr/mvGSgW8RkWGbdGXINI5u	','McCoy Nelson','385-505-5766','21 ea 4 south','resumelink','portfoliolink','url',1
)
returning *;
update company
set company_address = '211 east 400 north',
company_summary = 'Several elements of the company summary are covered here, including the name (XYZ Consulting), history (new company), description of services (web promotion, SEO, advertising) and why its needed (improve positioning in search engines), and the target market (higher education).',
company_phone = '231-123-2224',
logo = 'logo'
 where company_id = 1
returning *;
