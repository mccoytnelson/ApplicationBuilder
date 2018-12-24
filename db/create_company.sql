insert into company (company_name)values ($1)
returning company_id;