insert into choice
(
    question_id,answer,points
)
values
(
    $1,$2,$3
)
returning *;

