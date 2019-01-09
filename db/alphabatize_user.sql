SELECT *
FROM completed
INNER JOIN listing ON completed.listing_id = listing.listing_id
where completed.account_id = $1
order by position ASC