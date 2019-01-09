SELECT *
FROM completed
INNER JOIN listing ON completed.listing_id = listing.listing_id
where 
completed.account_id = $2 and
position ILIKE concat('%',$1,'%') or
salary ILIKE concat('%',$1,'%') or
company_name ILIKE concat('%',$1,'%') or
location ILIKE concat('%',$1,'%');