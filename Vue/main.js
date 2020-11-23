var app = new Vue({
    el: '#root',
    data: {
        discs: [],
        genre: []
    },
    mounted: function(){
        this.ajax(),
        Vue.nextTick(function(){
            app.test()
        })
    },
    methods: {
        ajax: function(){
            let self = this;
            axios.get('https://flynn.boolean.careers/exercises/api/array/music').then(function(answer){

                // console.log(answer.data.response);
                self.discs = answer.data.response;
                // console.log(self.discs);
            })
        },
        test: function(){
            console.log(this.discs);
        }
    }
});
