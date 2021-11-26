_b=new URLSearchParams(location.search).get("b");

function search(){
    if (window.event.keyCode == '13'){
        if(_b){
            window.top.updateSearch(document.querySelector("input").value);
        } else {
            window.top.location.href="all-blogs.html?s="+document.querySelector("input").value;
        }
    }
}