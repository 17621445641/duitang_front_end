<template>
  <div class="hello">
    <div id="all">
        <div id="user_background" v-for="i in message_list">
            <div id="background_image"><img src="./static/image/backgroud_image.jpg" alt=""></div>
            <div id="avatar_image"><img src="./static/image/下载.jpg" alt=""></div>
            <div id="user_name">什么人</div>
            <div id="follow_fans"><span>关注</span><span>0</span><span class="split_symbol">|</span><span>粉丝</span><span>0</span></div>
        </div>
        <div id="model_list">

        </div>
    </div>
  </div>
</template>