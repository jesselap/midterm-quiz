SELECT *
FROM attempts
JOIN quizes ON attempts.quiz_id = quizes.id
JOIN categories ON quizes.category_id = categories.id
WHERE attempts.user_id = 1
