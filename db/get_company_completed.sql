select completed_id,account_id,SUM(cast(not_choice_points as int)) from completed inner join question on (completed.listing_id = question.listing_id)
where completed.listing_id =$1
group by completed_id