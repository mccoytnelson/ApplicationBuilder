select * 
from account
inner join company on company.company_id = account.company_id
where email = $1;