insert into account
(
    email,hash_value,name,phone_number,address,resume,portfolio,url,company_id
)
values
(
    $1,$2,$3,$4,$5,$6,$7,$8,$9
)
returning *;
update company
set company_address = $10,
company_summary = $11,
company_phone = $12,
logo = $13
 where company_id = $9
returning *;
