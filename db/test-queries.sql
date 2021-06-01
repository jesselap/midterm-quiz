SELECT quizes.id, title, created_at, categories.type as category, score
FROM attempts
JOIN quizes ON attempts.quiz_id = quizes.id
JOIN categories ON quizes.category_id = categories.id
WHERE attempts.user_id = 1
