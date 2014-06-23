start:
	@python -m SimpleHTTPServer > server.log 2>&1 & echo "$$!" > server.pid 
	@echo "Server started on localhost:8000"

stop:
	@kill -9 `cat server.pid`
	@echo "Server stopped"
