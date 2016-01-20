SHELL="/bin/bash"

utils/serve:
	@cd utils && go build serve.go

start: utils/serve
	@utils/serve & echo "$$!" > server.pid
	@echo "Server started on localhost:8000"
	@open http://localhost:8000/2/
	@echo "Opening presentation..."

stop:
	@kill $$(cat server.pid | tr '\n' ' ')
	@rm server.pid
	@echo "Server stopped"
