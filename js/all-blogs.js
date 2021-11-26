_s=new URLSearchParams(location.search).get("s");

blogs=[];

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        JSON.parse(xhttp.responseText).forEach(element => {blogs.push(element["name"])});
        blogs=blogs.sort().reverse();
        if(_s==undefined){
            blogs.forEach(blog => {
                document.getElementById("blog-list").insertAdjacentHTML("beforeend","<a href=\"reader.html?blog="+blog+"\"><div class='blog'>"+blog.replace(/[0-9]*\_/i,"").replace(/\.[a-zA-Z]*$/i,"")+"</div></a>") 
            });
        }else{
            updateSearch(_s);
        }
    }
}

xhttp.open("GET", "https://api.github.com/repos/ngfl-bftk/ngfl-bftk.github.io/contents/blogs", true);
xhttp.send();

function updateSearch(s){
    document.getElementById("blog-list").innerHTML=""
    var _temp_list=blogs.filter(word => word.replace(/[0-9]*\_/i,"").replace(/\.[a-zA-Z]*$/i,"").match(s));
    _temp_list.forEach(blog => {
        document.getElementById("blog-list").insertAdjacentHTML("beforeend","<a href=\"reader.html?blog="+blog+"\"><div class='blog'>"+blog.replace(/[0-9]*\_/i,"").replace(/\.[a-zA-Z]*$/i,"")+"</div></a>") 
    });
}