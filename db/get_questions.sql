
select * from (
select * from listing
where listing_id =$1
)as listing,
(
select * from question where listing_id = $1
) as question
