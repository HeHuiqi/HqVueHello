
var host = "http://47.74.217.233:3000/main/api_1_0";
function createHTTP() {
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {

        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function hqGet(api,callback) {
    var url = host + api;
    console.log("url=="+url);
    var xmlhttp = createHTTP();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
        if (xmlhttp.status >= 500){
            // console.log("请求错误=="+xmlhttp.status);
            alert("请求错误");
        }
    }

    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
function hqPost(api,params,callback) {
    var url = host + api;
    console.log("url=="+url);
    var xmlhttp = createHTTP();
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
        if (xmlhttp.status >= 500){
            // console.log("请求错误=="+xmlhttp.status);
            alert("请求错误");
        }
    }

    xmlhttp.open("POST",url,true);
    xmlhttp.send(params);
}