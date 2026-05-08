bump:
	@echo "🔖 Bumping version..."
	@bun run bump

deploy:
ifdef prod
	@$(MAKE) bump
	@echo "🚀 Deploying to Production..."
	@bun run deploy
else
	@echo "🚀 Deploying..."
	@bun run deploy
endif