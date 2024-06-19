start:
	symfony server:start --no-tls

watch:
	npm run watch

fixture:
	php bin/console doctrine:fixtures:load