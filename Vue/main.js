var app = new Vue({
    el: '#root',
    data: {
        // base dati estrapolata dalla chiamata ajax
        discs: [],
        // array formato dai soli generi dei dischi
        genres: [],
        // istanzache va a leggere il genere musicale selezionato nell'input di selezione attraverso la funzione genSelection()
        genreType: 'All genres',
        // istanza di scelta del metodo di ordinamento
        sortType: 'Sort by',
        // istanza di scelta del metodo di ordinamento
        filters: {
            year: 'Year',
            title: 'Title',
            genre: 'Genre',
            author: 'Author'
        },
        array: [],
        sortContainer: []
    },
    mounted: function(){
        // posiziono la funzione che interroga il server in mounted cos' che questa verrà eseguito soltanto quando la struttura HTML è stata creata
        this.ajax()
    },
    methods: {
        // defiisco la funzione ajax che andrà ad interrogare il server
        ajax: function(){
            let self = this;
            axios.get('https://flynn.boolean.careers/exercises/api/array/music').then(function(answer){

                // vado a salvare i dati della chiamata all'interno dell'istanza discs
                self.discs = answer.data.response;
                self.sortContainer = answer.data.response;

                // estrapolo tutti i generi contenuti nella base dati della chiamata e creo un array dedicato con solo i generi dei dichi chiamato 'genres'
                self.discs.forEach((disc) => {
                    let genre = disc.genre;

                    if (!self.genres.includes(genre)) {
                        self.genres.push(genre)
                    }
                });

                // creo un array copia della base dati dei dischi usando la dots notation
                self.array = [...self.discs];

                // vado ad ordinare l'array copia in base all'anno di uscita confrontando l'anno del disco i esimo con quello i + 1
                var done = false;
                while (!done) {
                  done = true;
                  for (var i = 1; i < self.array.length; i += 1) {
                    if (self.array[i - 1].year > self.array[i].year) {
                      done = false;
                      var tmp = self.array[i - 1];
                      self.array[i - 1] = self.array[i];
                      self.array[i] = tmp;
                    }
                  }
                }
            })
        },

        // funzione che va a leggere il genere (come value della option nell'HTML)
        genSelection: function(event){
            this.genreType = event.target.value;
        },

        // funzione che va a leggere il tipo di ordinamento scelto dall'utente (come value della option nell'HTML)
        sortSelection: function(event){
            this.sortBy = event.target.value;

            if (this.sortBy == 'Year') {
                this.sortContainer = this.array;
            } else {
                this.sortContainer = this.discs;
            }
        },
    }
});
