
<script>
 
    export default {
        name: 'common_tips',
        data () {
            return {
                mixinData: 'mixin中的变量'
            }
        },
        methods: {
            open2(message_data) {
                this.$message({
                showClose: true,
                message: message_data,
                type: 'success',
                duration:1000
                });
            },
            open4(message_content) {
                this.$message({
                showClose: true,
                message: message_content,
                type: 'error',
                });
            },
        },
    }
</script>
 