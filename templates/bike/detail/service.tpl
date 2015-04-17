<tr>
	<td>
		{{service}}
	</td>
	<td>
		<span data-toggle="tooltip" title="{{#shortDate}}{{date}}{{/shortDate}}">
			{{#relativeDate}}{{date}}{{/relativeDate}}
		</span>
	</td>
	<td>
		{{technician}}
	</td>
	<td class="actions">
		<i class="notes-toggle {{^notes}}disabled{{/notes}} glyphicon glyphicon-info-sign" data-toggle="tooltip" title="{{#notes}}notes{{/notes}}{{^notes}}no notes{{/notes}}"></i>
		<i class="edit glyphicon glyphicon-pencil" data-toggle="tooltip" title="edit"></i>
		<i class="delete glyphicon glyphicon-remove" data-toggle="tooltip" title="delete"></i>
	</td>
</tr>
<tr class="drawer">
	<td colspan="4">
		<div class="notes drawer-content">
			{{notes}}
		</div>
	</td>
</tr>