update account
set name = $1, email =$2, phone_number=$3, address=$4, resume=$5, portfolio=$6,url=$7
where account_id = $8;
update company
set company_name = $9, company_address=$10,company_summary=$11,company_phone=$12,logo=$13
where company_id = $8;
select * 
from account
inner join company on company.company_id = account.company_id
where account_id = $8;