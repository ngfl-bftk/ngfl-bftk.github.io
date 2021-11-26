blog_name=new URLSearchParams(location.search).get("blog");
blog_data={};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        blog_data=JSON.parse(xhttp.responseText);
        document.title="BFTK - "+blog_data["head"]["title"];
        document.getElementById("blog").insertAdjacentHTML("beforeend","<h1>"+blog_data["head"]["title"]+"</h1><br>");
        blog_data["body"].forEach(element => {
            if(element["type"]=="text"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<p>"+element["text"]+"</p><br>");
            } else if(element["type"]=="link"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<a href=\""+element["link"]+"\" target=\"_blank\" title=\""+element["link"]+"\">"+element["text"]+"</a><br>");
            } else if(element["type"]=="youtube"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<iframe src=\"https://www.youtube.com/embed/"+element["video"]+"\"></iframe><br>");
            } else if(element["type"]=="table"){
                var _temp_table="<table>";
                element["table"].forEach(tr => {
                    _temp_table+="<tr>";
                    tr.forEach(td => {
                        _temp_table+="<td>"+td+"</td>";
                    });
                    _temp_table+="</tr>";
                });
                _temp_table+="</table><br>"
                document.getElementById("blog").insertAdjacentHTML("beforeend",_temp_table);
            } else if(element["type"]=="list"){
                var _temp_list="<ul>";
                element["list"].forEach(li => {
                    _temp_list+="<li>"+li+"</li>"
                })
                _temp_list+="</ul><br>";
                document.getElementById("blog").insertAdjacentHTML("beforeend",_temp_list);
            } else if(element["type"]=="comment"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<!--"+element["comment"]+"-->");
            } else if(element["type"]=="unsplash"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<img src=\"https://source.unsplash.com/"+element["image"]+"\"><br>");
            } else if(element["type"]=="image"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<img src=\""+element["image"]+"\"><br>");
            } else if(element["type"]=="sound"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<audio src=\""+element["sound"]+"\" controls></audio><br>");
            } else if(element["type"]=="video"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<video src=\""+element["video"]+"\" controls></video><br>");
            } else if(element["type"]=="website"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<iframe src=\""+element["url"]+"\"></iframe><br>");
            } else if(element["type"]=="code"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<code><div>"+element["code"]+"</div></code><br>");
            } else if(element["type"]=="h1"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<h1>"+element["title"]+"</h1><br>");
            } else if(element["type"]=="h2"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<h2>"+element["title"]+"</h2><br>");
            } else if(element["type"]=="h3"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<h3>"+element["title"]+"</h3><br>");
            } else if(element["type"]=="h4"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<h4>"+element["title"]+"</h4><br>");
            } else if(element["type"]=="h5"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<h5>"+element["title"]+"</h5><br>");
            } else if(element["type"]=="h6"){
                document.getElementById("blog").insertAdjacentHTML("beforeend","<h6>"+element["title"]+"</h6><br>");
            }
        });
    }
};
xhttp.open("GET", "blogs/"+blog_name, true);
xhttp.send();