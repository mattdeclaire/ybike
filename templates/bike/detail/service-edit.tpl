<tr>
	<td>
		<input type="text" name="service" value="{{service}}">
	</td>
	<td>
		<input type="date" name="date" value="{{#dateInput}}{{#date}}{{date}}{{/date}}{{^date}}{{timestamp}}{{/date}}{{/dateInput}}">
	</td>
	<td>
		<select name="technician">
			{{#technicians}}
				<option
					value="{{name}}"
					{{#current}}
						selected
					{{/current}}
				>
					{{name}}
				</option>
			{{/technicians}}
		</select>
	</td>
	<td class="actions">
		<img src="/img/loading.gif" class="loading">
		<i class="save glyphicon glyphicon-ok" data-toggle="tooltip" title="save"></i>
		<i class="cancel glyphicon glyphicon-remove" data-toggle="tooltip" title="cancel"></i>
	</td>
</tr>
<tr class="drawer">
	<td colspan="4">
		<div class="drawer-content">
			<textarea name="notes" placeholder="notes">{{notes}}</textarea>
		</div>
	</td>
</tr>