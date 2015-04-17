<td>{{name}}</td>
<td class="hidden-sm">{{make}}</td>
<td class="hidden-sm">{{model}}</td>
<td class="visible-lg">{{frame}}</td>
<td class="visible-lg">{{wheel}}</td>
<td class="visible-lg">{{serial}}</td>
<td class="hidden-sm">
	{{#start}}{{#relativeDate}}{{start}}{{/relativeDate}}{{/start}}
	{{^start}}--{{/start}}
</td>
<td class="hidden-sm">
	{{#end}}{{#relativeDate}}{{end}}{{/relativeDate}}{{/end}}
	{{^end}}--{{/end}}
</td>
<td class="visible-sm">{{status}}</td>
<td>{{location}}</td>
<td>{{#relativeDate}}{{lastServiceDate}}{{/relativeDate}}</td>
<td class="actions">
	<i class="edit glyphicon glyphicon-pencil" data-toggle="tooltip" title="edit"></i>
	<i class="move glyphicon glyphicon-circle-arrow-right" data-toggle="tooltip" title="move"></i>
	<i class="delete glyphicon glyphicon-remove-sign" data-toggle="tooltip" title="delete"></i>
</i>