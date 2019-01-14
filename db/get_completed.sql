SELECT completed_id, completed.listing_id, account_id, company_id, company_name, company_summary,completed.timestamp,company_address,company_phone,position,location,salary,description
    FROM completed INNER JOIN listing ON (completed.listing_id = listing.listing_id)

where completed.account_id = $1
