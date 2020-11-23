var app = new Vue({
    el: '#root',
    data: {
        discs: [],
        genres: [],
        genreType: 'All genres'
    },
    mounted: function(){
        this.ajax()
    },
    methods: {
        ajax: function(){
            let self = this;
            axios.get('https://flynn.boolean.careers/exercises/api/array/music').then(function(answer){

                // console.log(answer.data.response);
                self.discs = answer.data.response;
                // console.log(self.discs);

                self.discs.forEach((disc, i) => {
                    let genre = disc.genre;
                    // console.log(genre);

                    if (!self.genres.includes(genre)) {
                        self.genres.push(genre)
                    }
                });
                // console.log(self.genres);
            })
        },
        onChange: function(event){
            this.genreType = event.target.value;
        }

    }
});
