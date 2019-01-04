select * from question inner join choice on choice.question_id = question.question_id where listing_id = $1;
