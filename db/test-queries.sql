SELECT quizes.id, title, created_at, public, categories.type as category
FROM quizes
JOIN categories ON quizes.category_id = categories.id;
