<dl class="info">
	<dt>Name</dt>
	<dd>{{name}}</dd>

	<dt>status</dt>
	<dd>{{status}}</dd>

	<dt>location</dt>
	<dd>
		{{#location}}
			{{^name}}<img src="/img/loading.gif" alt="loading">{{/name}}
			{{#name}}{{name}}{{/name}}
		{{/location}}
		{{^location}}
			N/A
		{{/location}}
	</dd>
</dl>