_s=new URLSearchParams(location.search).get("s");

blogs=[];
monthShortNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function ms2time(ms) {
    seconds=ms/1000;
    d=Math.floor(seconds / (3600*24));
    if(d>0){
        return d + " gün önce";
    } else {
        h = Math.floor(seconds % (3600*24) / 3600);
        if(h>1){
            return h + " saat önce";
        } else {
            m = Math.floor(seconds % 3600 / 60);
            if(m > 1){
                return m + " dakika önce";
            } else {
                s = Math.floor(seconds % 60);
                if(s>1){
                    return s + " saniye önce";
                } else {
                    return "NaN";
                }
            }
        }
    }
}

howLongAgo=(_time)=>{
    return ms2time(
        new Date().getTime() - new Date(_time.substr(6,2)+" "+monthShortNames[_time.substr(4,2)-1]+" "+_time.substr(0,4)+" "+_time.substr(8,2)+":"+_time.substr(10,2)).getTime()
    );
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        JSON.parse(xhttp.responseText).forEach(element => {blogs.push(element["name"])});
        blogs=blogs.sort().reverse();
        if(_s==undefined){
            blogs.forEach(blog => {
                document.getElementById("blog-list").insertAdjacentHTML("beforeend","<a href=\"reader.html?blog="+blog+"\"><div class='blog'><div class='blog-name'>"+blog.replace(/[0-9]*\_/i,"").replace(/\.[a-zA-Z]*$/i,"")+"</div><div class='blog-date'>"+howLongAgo(blog.match(/[0-9]+/g)[0])+"</div></div></a>");
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