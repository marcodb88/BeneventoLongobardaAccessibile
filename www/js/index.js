"use strict";

document.write("<script type='text/javascript' src='js/outputStrings.js'> <\/script>");

var current_level_app;

var counter_menu;
var counter_voci_menu = 6;
var counter_banchi;
var counter_voci_banchi = 14;
var counter_giorni;
var counter_voci_giorni = 4;
var counter_storici;
var counter_voci_storici = 5;
var counter_musica;
var counter_voci_musica = 2;

var counter_orari_giovedi;
var counter_voci_orari_giovedi = 12;
var counter_orari_venerdi;
var counter_voci_orari_venerdi = 22;
var counter_orari_sabato;
var counter_voci_orari_sabato = 22;
var counter_orari_domenica;
var counter_voci_orari_domenica = 28;


function onBodyLoad() {

    document.addEventListener("deviceready", onDeviceReady, false);

    current_level_app = 0; //prima schermata    
    counter_menu = 1;

    open_xml_strings();	//per settare il file xml adatto

    var benvenuto = get_value_from_xml('benvenuto_text');
    var xmlString = get_value_from_xml('selected_voce');
    var voce = translate_menu(counter_menu);
    var output_initialString = benvenuto + ' ' + xmlString + ' ' + voce;
    set_output(output_initialString, output_initialString);	//creazione dei vari output

}

function onDeviceReady() {

    window.plugins.insomnia.keepAwake(); //per fare restare on lo schermo

    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);

    document.addEventListener("searchbutton", onSearchKeyDown, false);
    document.addEventListener("startcallbutton", onStartCallKeyDown, false);
    document.addEventListener("endcallbutton", onEndCallKeyDown, false);

    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}


function onBackKeyDown() {
    var xmlString = get_value_from_xml('mute');
    set_output(xmlString, xmlString);
}

function onMenuKeyDown() {
    var xmlString = get_value_from_xml('mute');
    set_output(xmlString, xmlString);
}

function onPause() {
    var xmlString = get_value_from_xml('mute');
    set_output(xmlString, xmlString);
}

function onResume() {
    var xmlString = get_value_from_xml('mute');
    set_output(xmlString, xmlString);
}

function onSearchKeyDown() {
    var xmlString = get_value_from_xml('mute');
    set_output(xmlString, xmlString);
}

function onStartCallKeyDown() {
    var xmlString = get_value_from_xml('mute');
    set_output(xmlString, xmlString);
}

function onEndCallKeyDown() {
    var xmlString = get_value_from_xml('mute');
    set_output(xmlString, xmlString);
}

function menu(touch) {

    if (current_level_app == 0) {

        if (touch == 'home') {
            var xmlString = get_value_from_xml('exit');
            pushing_button('home');	//attivazione della vibrazione
            set_output(xmlString, xmlString);		//creazione dei vari output
            sleep(1000);		//per dare tempo al tts di finire la frase
            navigator.app.exitApp(); //comando per chiudere l'applicazione
        }

        else if (touch == 'enter') {
            if (counter_menu == 0) {
                var voceMenu = get_value_from_xml('bn_accessibile_text');
                pushing_button('up');	//attivazione della vibrazione
                set_output(voceMenu, voceMenu);	//creazione dei vari output
            }
            else if (counter_menu == 1) {
                var voceMenu = get_value_from_xml('descrizione_evento_text');
                pushing_button('up');	//attivazione della vibrazione
                set_output(voceMenu, voceMenu);	//creazione dei vari output
            }

            else if (counter_menu == 2) {
                current_level_app = 1;
                counter_banchi = 0;
                navigate_string_contesa();
                var xmlString = get_value_from_xml('selected_voce');
                var voceMenu = get_value_from_xml('navigate_contesa');
                var banco = translate_contesa(counter_banchi);
                var output = voceMenu + '. ' + xmlString + ' ' + banco;

                pushing_button('up');	//attivazione della vibrazione
                set_output(voceMenu, voceMenu);	//creazione dei vari output
            }
            else if (counter_menu == 3) {
                current_level_app = 2;
                counter_giorni = 0;
                navigate_string_giorni();
                var xmlString = get_value_from_xml('selected_voce');
                var voceMenu = get_value_from_xml('navigate_programma');
                var giorno = translate_giorno(counter_giorni);
                var output = voceMenu + '. ' + xmlString + ' ' + giorno;

                pushing_button('up');	//attivazione della vibrazione
                set_output(output, output);	//creazione dei vari output
            }
            else if (counter_menu == 4) {
                current_level_app = 3;
                counter_storici = 0;
                navigate_string_storici();
                var xmlString = get_value_from_xml('selected_voce');
                var voceMenu = get_value_from_xml('navigate_storici');
                var storico = translate_storico(counter_storici);
                var output = voceMenu + '. ' + xmlString + ' ' + storico;

                pushing_button('up');	//attivazione della vibrazione
                set_output(output, output);	//creazione dei vari output
            }
            else if (counter_menu == 5) {
                current_level_app = 4;
                counter_musica = 0;
                navigate_string_musica();
                var xmlString = get_value_from_xml('selected_voce');
                var voceMenu = get_value_from_xml('navigate_musica');
                var musica = translate_musica(counter_musica);
                var output = voceMenu + '. ' + xmlString + ' ' + musica;

                pushing_button('up');	//attivazione della vibrazione
                set_output(output, output);	//creazione dei vari output
            }

        }
        else if (touch == 'up') {

            if ((counter_menu + 1) < counter_voci_menu) {
                counter_menu++;
                var voce = translate_menu(counter_menu);
                navigate_initial_menu(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
            else { //non ci sono più piani sopra a quello selezionato al momento
                var voce = translate_menu(counter_menu);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

        }
        else if (touch == 'down') {

            if ((counter_menu - 1) < 0) { //controllo se non ci sono più voci al di sotto di quella attuale

                navigate_initial_menu(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else { //ci sono più voci sotto a quello selezionato al momento

                counter_menu--; //cambio piano
                var voce = translate_menu(counter_menu);

                navigate_initial_menu(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }

    else if (current_level_app == 1) {	//contesa di sant'eliano

        if (touch == 'home') {
            current_level_app = 0; // torno al menu iniziale
            navigate_initial_menu(); //settaggio delle stringhe da stampare

            var xmlString1 = get_value_from_xml('selected_voce');
            var xmlString = get_value_from_xml('menu_back');
            var voce = translate_menu(counter_menu);
            var current_state = xmlString + '. ' + xmlString1 + ' ' + voce;
            pushing_button('home');	//attivazione della vibrazione
            set_output(current_state, current_state);	//creazione dei vari output
        }

        else if (touch == 'enter') {

            var voceMenu = translate_contesa_text(counter_banchi);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu, voceMenu);	//creazione dei vari output
        }

        else if (touch == 'up') {

            if ((counter_banchi + 1) < counter_voci_banchi) {

                counter_banchi++;
                var voce = translate_contesa(counter_banchi);

                navigate_string_contesa();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output

            }
            else {
                var voce = translate_contesa(counter_banchi);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_banchi - 1) < 0) {

                navigate_string_contesa(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_banchi--; //cambio piano
                var voce = translate_contesa(counter_banchi);

                navigate_string_contesa(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }

        }
    }

    else if (current_level_app == 2) {	//programma

        if (touch == 'home') {
            current_level_app = 0; // torno al menu iniziale
            navigate_initial_menu(); //settaggio delle stringhe da stampare

            var xmlString1 = get_value_from_xml('selected_voce');
            var xmlString = get_value_from_xml('menu_back');
            var voce = translate_menu(counter_menu);
            var current_state = xmlString + '. ' + xmlString1 + ' ' + voce;
            pushing_button('home');	//attivazione della vibrazione
            set_output(current_state, current_state);	//creazione dei vari output
        }

        else if (touch == 'enter') {

            if (counter_giorni == 0) {
                current_level_app = 5;
                counter_orari_giovedi = 0;
                navigate_string_giovedi();
                var ora = translate_giovedi(counter_orari_giovedi);
            }
            else if (counter_giorni == 1) {
                current_level_app = 6;
                counter_orari_venerdi = 0;
                navigate_string_venerdi();
                var ora = translate_venerdi(counter_orari_venerdi);
            }
            else if (counter_giorni == 2) {
                current_level_app = 7;
                counter_orari_sabato = 0;
                navigate_string_sabato();
                var ora = translate_sabato(counter_orari_sabato);
            }
            else if (counter_giorni == 3) {
                current_level_app = 8;
                counter_orari_domenica = 0;
                navigate_string_domenica();
                var ora = translate_domenica(counter_orari_domenica);
            }

            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('navigate_giorno');

            var output = voceMenu + ' ' + xmlString + ' ' + ora;

            pushing_button('up');	//attivazione della vibrazione
            set_output(output, output);	//creazione dei vari output
        }

        else if (touch == 'up') {

            if ((counter_giorni + 1) < counter_voci_giorni) {

                counter_giorni++;
                var voce = translate_giorno(counter_giorni);

                navigate_string_giorni();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }

            else {
                var voce = translate_giorno(counter_giorni);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_giorni - 1) < 0) {

                navigate_string_giorni(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_giorni--; //cambio piano
                var voce = translate_giorno(counter_giorni);

                navigate_string_giorni(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }

    else if (current_level_app == 3) {	//gruppi storici

        if (touch == 'home') {
            current_level_app = 0; // torno al menu iniziale
            navigate_initial_menu(); //settaggio delle stringhe da stampare

            var xmlString1 = get_value_from_xml('selected_voce');
            var xmlString = get_value_from_xml('menu_back');
            var voce = translate_menu(counter_menu);
            var current_state = xmlString + '. ' + xmlString1 + ' ' + voce;
            pushing_button('home');	//attivazione della vibrazione
            set_output(current_state, current_state);	//creazione dei vari output
        }

        else if (touch == 'enter') {

            var voceMenu = translate_storico_text(counter_storici);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu, voceMenu);	//creazione dei vari output		
        }

        else if (touch == 'up') {

            if ((counter_storici + 1) < counter_voci_storici) {

                counter_storici++;
                var voce = translate_storico(counter_storici);

                navigate_string_storici();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }

            else {
                var voce = translate_storico(counter_storici);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_storici - 1) < 0) {

                navigate_string_storici(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_storici--; //cambio piano
                var voce = translate_storico(counter_storici);

                navigate_string_storici(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }

    else if (current_level_app == 4) {	//gruppi musicali

        if (touch == 'home') {
            current_level_app = 0; // torno al menu iniziale
            navigate_initial_menu(); //settaggio delle stringhe da stampare

            var xmlString1 = get_value_from_xml('selected_voce');
            var xmlString = get_value_from_xml('menu_back');
            var voce = translate_menu(counter_menu);
            var current_state = xmlString + '. ' + xmlString1 + ' ' + voce;
            pushing_button('home');	//attivazione della vibrazione
            set_output(current_state, current_state);	//creazione dei vari output
        }

        else if (touch == 'enter') {

            var voceMenu = translate_musica_text(counter_musica);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu, voceMenu);	//creazione dei vari output	
        }

        else if (touch == 'up') {

            if ((counter_musica + 1) < counter_voci_musica) {

                counter_musica++;
                var voce = translate_musica(counter_musica);

                navigate_string_musica();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }

            else {
                var voce = translate_musica(counter_musica);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_musica - 1) < 0) {

                navigate_string_musica(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_musica--;
                var voce = translate_musica(counter_musica);

                navigate_string_musica(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }

    else if (current_level_app == 5) {	//giovedi

        if (touch == 'home') {
            current_level_app = 2;

            navigate_string_giorni();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('navigate_programma');
            var giorno = translate_giorno(counter_giorni);
            var output = voceMenu + '. ' + xmlString + ' ' + giorno;

            pushing_button('home');	//attivazione della vibrazione
            set_output(output, output);	//creazione dei vari output
        }

        else if (touch == 'enter') {
            var voceMenu = translate_giovedi_text(counter_orari_giovedi);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu, voceMenu);	//creazione dei vari output
        }

        else if (touch == 'up') {

            if ((counter_orari_giovedi + 1) < counter_voci_orari_giovedi) {

                counter_orari_giovedi++;
                var voce = translate_giovedi(counter_orari_giovedi);

                navigate_string_giovedi();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }

            else {
                var voce = translate_giovedi(counter_orari_giovedi);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_orari_giovedi - 1) < 0) {

                navigate_string_giovedi(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_orari_giovedi--;
                var voce = translate_giovedi(counter_orari_giovedi);

                navigate_string_giovedi(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }

    else if (current_level_app == 6) {	//venerdi

        if (touch == 'home') {
            current_level_app = 2;

            navigate_string_giorni();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('navigate_programma');
            var giorno = translate_giorno(counter_giorni);
            var output = voceMenu + '. ' + xmlString + ' ' + giorno;

            pushing_button('home');	//attivazione della vibrazione
            set_output(output, output);	//creazione dei vari output
        }

        else if (touch == 'enter') {
            var voceMenu = translate_venerdi_text(counter_orari_venerdi);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu, voceMenu);	//creazione dei vari output
        }

        else if (touch == 'up') {

            if ((counter_orari_venerdi + 1) < counter_voci_orari_venerdi) {

                counter_orari_venerdi++;
                var voce = translate_venerdi(counter_orari_venerdi);

                navigate_string_venerdi();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }

            else {
                var voce = translate_venerdi(counter_orari_venerdi);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_orari_venerdi - 1) < 0) {

                navigate_string_venerdi(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_orari_venerdi--;
                var voce = translate_venerdi(counter_orari_venerdi);

                navigate_string_venerdi(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }

    else if (current_level_app == 7) {	//sabato

        if (touch == 'home') {
            current_level_app = 2;

            navigate_string_giorni();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('navigate_programma');
            var giorno = translate_giorno(counter_giorni);
            var output = voceMenu + '. ' + xmlString + ' ' + giorno;

            pushing_button('home');	//attivazione della vibrazione
            set_output(output, output);	//creazione dei vari output
        }

        else if (touch == 'enter') {
            var voceMenu = translate_sabato_text(counter_orari_sabato);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu, voceMenu);	//creazione dei vari output
        }

        else if (touch == 'up') {

            if ((counter_orari_sabato + 1) < counter_voci_orari_sabato) {

                counter_orari_sabato++;
                var voce = translate_sabato(counter_orari_sabato);

                navigate_string_sabato();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }

            else {
                var voce = translate_sabato(counter_orari_sabato);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_orari_sabato - 1) < 0) {

                navigate_string_sabato(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_orari_sabato--;
                var voce = translate_sabato(counter_orari_sabato);

                navigate_string_sabato(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }

    else if (current_level_app == 8) {	//domenica

        if (touch == 'home') {
            current_level_app = 2;

            navigate_string_giorni();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('navigate_programma');
            var giorno = translate_giorno(counter_giorni);
            var output = voceMenu + '. ' + xmlString + ' ' + giorno;

            pushing_button('home');	//attivazione della vibrazione
            set_output(output, output);	//creazione dei vari output
        }

        else if (touch == 'enter') {
            var voceMenu = translate_domenica_text(counter_orari_domenica);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu, voceMenu);	//creazione dei vari output
        }

        else if (touch == 'up') {

            if ((counter_orari_domenica + 1) < counter_voci_orari_domenica) {

                counter_orari_domenica++;
                var voce = translate_domenica(counter_orari_domenica);

                navigate_string_domenica();
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
            
            else {
                var voce = translate_domenica(counter_orari_domenica);
                var xmlString = get_value_from_xml('no_voci');

                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }
        }

        else if (touch == 'down') {

            if ((counter_orari_domenica - 1) < 0) {

                navigate_string_domenica(); //per settare le stringhe da stampare

                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString, xmlString);	//creazione dei vari output
            }

            else {
                counter_orari_domenica--;
                var voce = translate_domenica(counter_orari_domenica);

                navigate_string_domenica(); //per settare le stringhe da stampare

                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation');

                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;

                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state, current_state);	//creazione dei vari output
            }
        }
    }
}