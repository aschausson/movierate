
function Voto(pelicula, usuario, email, telefono) {
    this.pelicula = pelicula
    this.usuario = usuario
    this.email = email
    this.telefono = telefono
}

var peliculas = []
var votos = []
var peliculaSeleccionada

$(document).ready(function () {
    $('#bloqueo').hide()
    $('#panelAyuda').hide()
    $('#peliculaGrande').hide()

    leePeliculas()
})


function Pelicula(titulo, genero, anio, director, reparto, sinopsis) {
    this.titulo = titulo
    this.genero = genero
    this.anio = anio
    this.director = director
    this.reparto = reparto
    this.sinopsis = sinopsis
}


function creaPeliculasJson(titulo, genero, anio, director, reparto, sinopsis) {
    var pelicula = new Pelicula(titulo, genero, anio, director, reparto, sinopsis)
    peliculas.push(pelicula)
}


function leePeliculas() {
    $.getJSON('https://aschausson.github.io/movierate/data/pelis.json', function (data) {
        for (var key in data) {
            creaPeliculasJson(data[key].titulo, data[key].genero, data[key].anio, data[key].director, data[key].reparto, data[key].sinopsis)
        }
    })
        .done(function () {
            insertaPeliculas()
            listenerClickPeliculas()
        })
}


function listenerClickPeliculas() {
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { //escape
            $('#bloqueo').hide()
            $('#peliculaGrande').hide()
            $('#panelAyuda').hide()
            $('body').css('overflow', 'scroll')
        }
    })

    $('#ayuda').click(function () {
        $('#bloqueo').show()
        $('#panelAyuda').show()
    })
    $('#ayuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').show()
            $('#panelAyuda').show()
        }
    })

    $('.peliPequeCont').click(function () {
        peliculaGrande($(this).attr('id'))
        $('body').css('overflow', 'hidden')
        $('#peliculaGrande').scrollTop(0)
        $('#peliculaGrande').focus()
    })
    $('.peliPequeCont').keypress(function (e) {
        if (e.which == 13) {//enter
            peliculaGrande($(this).attr('id'))
            $('body').css('overflow', 'hidden')
            $('#peliculaGrande').scrollTop(0)
            $('#peliculaGrande').focus()
        }
    })

    $('#cierraAyuda').click(function () {
        $('#bloqueo').hide()
        $('#panelAyuda').hide()
    })
    $('#cierraAyuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').hide()
            $('#panelAyuda').hide()
        }
    })

    $('#pgAtras').click(function () {
        $('#bloqueo').hide()
        $('#peliculaGrande').hide()
        $('body').css('overflow', 'scroll')
    })
    $('#pgAtras').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').hide()
            $('#peliculaGrande').hide()
            $('body').css('overflow', 'scroll')
        }
    })

}


function insertaPeliculas() {
    for (var i = 0; i < peliculas.length; i++) {
        var sinopsisCorta = peliculas[i].sinopsis.substring(0, 180)
        $('#contenedor').append('<div tabindex="0" id="' + i + '" class="peliPequeCont"><img aria-hidden="true" alt="' + peliculas[i].titulo + '" src="./data/img/' + (i + 1) + 'small.jpg"><h1>' + peliculas[i].titulo + '</h1><h4>Género: ' + peliculas[i].genero + '</h4><h4>Sinopsis:</h4><p>' + sinopsisCorta + '...</p></div>')
    }
}


function leeRetretes() {
    $.getJSON('https://aschausson.github.io/toiletpicker/data/medidas.json', function (data) {
        for (var key in data) {
            var x = 3
        }
    })
        .done(function () {
            x = 3
        })
}


function peliculaGrande(id) {
    peliculaSeleccionada = id
    $('#pgImagen').attr('src', './data/img/' + (parseInt(id) + 1) + 'large.jpg')
    var tit = peliculas[id].titulo
    $('#pgTitulo').html(tit)
    $('#pgGenero').html('Género: ' + peliculas[id].genero)
    $('#pgDirector').html('Director: ' + peliculas[id].director)
    $('#pgReparto').html('Reparto: ' + peliculas[id].reparto)
    $('#pgSinopsis').html(peliculas[id].sinopsis)
    $('#bloqueo').show()
    $('#peliculaGrande').show()
}


function guardarVoto() {
    var voto = new Voto(peliculas[peliculaSeleccionada].titulo, $('#nombreUsuario').val(), $('#emailUsuario').val(), $('#telefonoUsuario').val())
    if (localStorage.getItem("votosPelis") === null) {
        votos.push(voto)
        localStorage.setItem("votosPelis", JSON.stringify(votos))
    }
    else {
        votos = JSON.parse(localStorage.getItem("votosPelis"))
        votos.push(voto)
        localStorage.setItem("votosPelis", JSON.stringify(votos))
    }
    document.formulario.submit();
}