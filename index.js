function init(){
	$("input select").unbind();
	$('input').keyup(function(e){
		if(e.keyCode == 13){
			if (e.ctrlKey){
				duplicate($(this));
			}else{
				reload($(this).parent());   
			}
	    }
	    if(e.keycode==27){
	    	remove($(this.parent()));
	    }
	});
	$("select").change(function(){
		reload($(this).parent())		
	})

	$("input , select").dblclick(function(e){
		if (e.ctrlKey){
			toogleInput($(this))		
		}
	})
}

function status(msg, color="#bbb"){
	var idClass = 'status-'+ new Date().getTime();
	msg= `<span class="${idClass} " style="background-color:${color}">${msg}</span>`;
	$("p.status").html( $("p.status").html() +  msg )
	setTimeout(function(){
		$(`.${idClass}` ).hide()
	},5000)
}

function reload(container){
   url = "";
   container.children("input , select").each(function(k,input){
   		url += $(input).val()
   })
	status("open "+url, '#0ff')
	container.find("iframe").attr('src',url);
}

function duplicate(input){
	container = input.parent();
	container.after(container.clone());
	init();
}

function remove(container){
	container.remove();
}

function toogleInput(input){
	status(input.type())
}