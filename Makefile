MODULE_BINS = ${CURDIR}/node_modules/.bin

PARSER_OUT = lib/parser.js

parser:
	$(MODULE_BINS)/pegjs --output $(PARSER_OUT) src/parser.pegjs

clean:
	rm -f $(PARSER_OUT)

.PHONY:  parser clean
.SILENT: parser clean
