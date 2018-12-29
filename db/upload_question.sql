insert into question
(
    listing_id,question,choice,not_choice_points
)
values
(
    $1,$2,$3,$4
)
returning *;

