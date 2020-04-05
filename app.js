new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true,
            this.saludJugador = 100,
            this.saludMonstruo = 100;
            this.turnos = []
        },
        atacar: function () {
            var damage = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -=damage;
            this.turnos.unshift({
                esJugador: true,
                text: 'el jugador golpea al monsstruo por ' + damage
            });
            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
            var damage = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= damage;
            this.turnos.unshift({
                esJugador: true,
                text: 'el jugador realiza ataque especial al monstruo por ' + damage
            });
            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo()
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador += 10;
            }else{
                this.saludJugador=100;
            }
            this.turnos.unshift({
                esJugador: true,
                text: 'el jugador sana, salud: ' + this.saludJugador
            });
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            this.turnos.push();
            this.turnos.unshift();

        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            var damage = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= damage;
            this.turnos.unshift({
                esJugador: false,
                text: 'el monstruo lastima al jugador en ' + damage
            });
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random()*(rango[1]))+1, (rango[0]))

        },
        verificarGanador: function () {
            if (this.saludMonstruo<=0) {
                if (confirm('Ganaste! ¿Jugar denuevo?')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludJugador <= 0) {
                if (confirm('Perdiste! ¿Jugar denuevo?')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } 
            return false; 
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});