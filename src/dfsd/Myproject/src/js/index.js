window.onload=function () {
    document.getElementById('classifiy').onmouseover=function(){
        document.getElementById('classifiy_content').style.display='block';
        document.getElementById('icon').style.backgroundPositionX="-38px";
        document.getElementById('classifiy_text').style.border="1px solid #ff7e7e";
        document.getElementById('classifiy_text').style.color=" #ff7e7e";
        document.getElementById('classifiy_text').style.backgroundColor=" #fafafa";
    }
    document.getElementById('classifiy').onmouseout=function(){
        document.getElementById('classifiy_content').style.display='none';
        document.getElementById('icon').style.backgroundPositionX="-59px";
        document.getElementById('classifiy_text').style.border="1px solid #cdcdcd";
        document.getElementById('classifiy_text').style.color=" rgb(80, 80, 80)";
        document.getElementById('classifiy_text').style.backgroundColor="#fff";
    }
    var html1='<div class="content" onmouseover="opa_add(this)" onmouseout="opa_move(this)"><div class="image_shadow"><img class="content_image" src="../../static/image/20220416194019_6d39a.jpg" alt=""><div class="shadow" ><span class="tt1"> 点赞</span><span class="tt1"> 收藏</span></div></div><div class="txt_title">你也箱娘啊这是最平凡的一天啊</div><div class="txt_author"><img class="author_headphoto" src="../../static/image/20220416194019_6d39a.jpg" alt=""><span class="author_name">平方的人</span><img class="txt_like" src="../../static/image/like.png"><span class="click_num">5000</span></div></div>';
    var html2='<div class="content" onmouseover="opa_add(this)" onmouseout="opa_move(this)"><img class="content_image" src="../../static/image/20220416194019_6d39a.jpg" alt=""><div class="txt_title">你也箱娘啊这是最平凡的一天啊你也箱娘啊这是最平凡的一天啊你也箱娘啊这是最平凡的一天啊</div><div class="txt_author"><img class="author_headphoto" src="../../static/image/like.png" alt=""><span class="author_name">平方的人dsfsdsdsfsdfsdfsfs</span><img class="txt_like" src="../../static/image/like.png"><span class="click_num">5000</span></div></div>';
    var html3='<div class="content" onmouseover="opa_add(this)" onmouseout="opa_move(this)"><img class="content_image" src="../../static/image/20220416194019_6d39a.jpg" alt=""><div class="txt_title">箱娘啊这是最平凡的一天啊你也箱娘啊这是最平凡的一天啊</div><div class="txt_author"><img class="author_headphoto" src="../../static/image/like.png" alt=""><span class="author_name">平方的人</span><img class="txt_like" src="../../static/image/like.png"><span class="click_num">500</span></div></div>';
    var html4='<div class="content" onmouseover="opa_add(this)" onmouseout="opa_move(this)"><img class="content_image" src="../../static/image/20220416194019_6d39a.jpg" alt=""><div class="txt_title">箱娘啊这是最平凡的一天啊你也箱娘啊这是最平凡的一天啊这是最平凡这是最平凡</div><div class="txt_author"><img class="author_headphoto" src="../../static/image/like.png" alt=""><span class="author_name">平方的人</span><img class="txt_like" src="../../static/image/like.png"><span class="click_num">500</span></div></div>';
    for(var content_total=1; content_total<=7;content_total++){
        if(content_total%5==1){
            var wo=document.getElementById('content_col1').innerHTML;
            document.getElementById('content_col1').innerHTML=wo+html1;
        }else if(content_total%5==2){
            var to=document.getElementById('content_col2').innerHTML;
            document.getElementById('content_col2').innerHTML=to+html2;
        }else if(content_total%5==3){
            document.getElementById('content_col3').innerHTML=html3;
        }else if(content_total%5==4){
            document.getElementById('content_col4').innerHTML=html3;
        }else {
            document.getElementById('content_col5').innerHTML=html4;
        }
    }
}
function opa_add(data){
    data.children[0].children[1].style.display="inline-block"
}
function opa_move(data){
    data.children[0].children[1].style.display="none"
}