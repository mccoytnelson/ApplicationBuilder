select account_id,completed_id,SUM(cast(not_choice_points as int)),timestamp from completed inner join question on (completed.listing_id = question.listing_id)
where completed.listing_id =$1
group by completed_id