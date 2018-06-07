		function openModal(obj){
			id = $(obj).attr('id');
			modal = document.getElementById("modal_"+id);
			modal.style.display = "block";	
		}
		function closeModal(obj){
			id = $(obj).attr('id');
			modal = document.getElementById("modal_"+id);
			modal.style.display = "none";	
		}

		var currentCount = 0;
		var lastIndex = 0;
		var loadingSize = 20;
		document.querySelector('#loadMore').addEventListener('click', function(){
			Papa.parse("https://raw.githubusercontent.com/geonsik-yu/CDS_files/master/YonseiCDS/4Events.csv", {
				download: true, header: true, dynamicTyping: true,
				complete: function(results) {
					papadata = results.data
					lastIndex = papadata.length
					for(i=Math.max(lastIndex-currentCount*loadingSize-1, -1);
						i>=Math.max(lastIndex-(currentCount+1)*loadingSize, 0); i--){
						//papadata[i].ImageName = "https://raw.githubusercontent.com/geonsik-yu/CDS_files/master/YonseiCDS/Images/"+papadata[i].ImageName
						var obj = $("#ajaxTempl").tmpl(papadata[i]).appendTo("#listBody");
						for(j=0; j<10; j++){
							varName = "Image_" + (j+1)
							image_url = "https://raw.githubusercontent.com/geonsik-yu/CDS_files/master/YonseiCDS/Images/" + papadata[i][varName]
							if(papadata[i][varName] != null){
								document.getElementById('modal-inside_'+papadata[i].Id).innerHTML += '<img class="img-portfolio img-fluid" src=' + image_url +' style="width:100%; padding-top:16px;margin-bottom:20px;">'
							}
						}
					}
					currentCount += 1;
				}
			})
		});
		document.getElementById('loadMore').click();