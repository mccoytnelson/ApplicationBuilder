insert into listing
(
     company_id,company_name,company_summary,company_address,company_phone,position,location,salary,description
)
values
(
    $1,$2,$3,$4,$5,$6,$7,$8,$9
)
returning *;

